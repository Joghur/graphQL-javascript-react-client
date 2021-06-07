import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Snackbar from '../../components/Snackbar';
import { dateEpochToDateString, dateStringToEpoch } from '../../utils/dates';
import {
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BackButton } from '../../components/BackButton';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';
import validate from '../../utils/validate';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  errorColor: {
    color: 'red',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  textFieldLarger: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '52ch',
  },
  rolesRoot: {
    marginLeft: 8,
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

// slid in effect on dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      errors {
        field
        message
      }
      user {
        id
        active
        name
        username
        address
        birthday
        email
        phone
        roles {
          id
          role
        }
      }
    }
  }
`;

const ROLES = gql`
  query allRoles {
    allRoles {
      roles {
        id
        role
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $active: Boolean!
    $name: String!
    $username: String!
    $birthday: String!
    $address: String!
    $email: String!
    $phone: String!
    $roles: [Int!]!
  ) {
    updateUser(
      id: $id
      active: $active
      name: $name
      username: $username
      birthday: $birthday
      address: $address
      email: $email
      phone: $phone
      roles: $roles
    ) {
      user {
        id
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser(
    $active: Boolean!
    $name: String!
    $username: String!
    $birthday: String!
    $address: String!
    $email: String!
    $phone: String!
    $roles: [Int!]!
  ) {
    createUser(
      active: $active
      name: $name
      username: $username
      birthday: $birthday
      address: $address
      email: $email
      phone: $phone
      roles: $roles
    ) {
      user {
        id
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const User = () => {
  // material-ui
  const classes = useStyles();

  // react-router
  let { id } = useParams();
  const history = useHistory();

  // apollo
  const userQuery = useQuery(USER, {
    skip: id === '-1',
    variables: { id: parseInt(id) },
    fetchPolicy: 'cache-first',
  });
  const rolesQuery = useQuery(ROLES, {
    fetchPolicy: 'cache-first',
  });
  const [updateUser, { data }] = useMutation(UPDATE_USER);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  // react
  const emptyUser = {
    active: true,
    name: '',
    phone: '',
    address: '',
    username: '',
    email: '',
    birthday: '0',
    roles: [],
  };
  const [user, setUser] = useState(emptyUser);
  const [didChange, setDidChange] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id !== '-1') setUser(userQuery.data?.user?.user);
  }, [userQuery]);

  useEffect(() => {
    userQuery.refetch();
  }, []);

  if (userQuery.loading) return <div>Henter Medlem...</div>;

  if (userQuery.error)
    return <div>Kunne ikke hente Medlem. Netværksproblem?</div>;

  if (userQuery.data?.user?.errors) return <div>Kunne ikke finde Medlem</div>;

  /**
   * Handles all form changes including validation
   *
   * @param {*} event
   * @param {*} secondParam
   */
  const handleChange = (event, secondParam) => {
    let isError = false;
    let id = event?.target?.id;
    let value = event?.target?.value;
    let name = event?.target?.name;
    let checked = event?.target?.checked;

    // From select titles comes an array (roles) and id is something like
    // roles-option-1. We only need roles text for the key in "user".
    // From t-shirt size comes an object with key "value"
    if (secondParam && typeof secondParam === 'object') {
      if (name) {
        id = name; // this input control uses name instead of id
        value = secondParam.props?.value;
      } else {
        id = 'roles';
        value = secondParam;
      }
    }

    // birthday needs converting from date to epoch milliseconds
    // event is a Date object and secondParam is date in string format chosen by Datepicker
    if (event?.constructor?.name === 'Date') {
      id = 'birthday';
      value = dateStringToEpoch(secondParam);
    }

    const validated = validate(id, value);

    // if something is not validated set error states
    if (validated.errorMessage) {
      setErrorMessage({ [id]: validated.errorMessage });
      setError(true);
    } else {
      // if everything is validated correctly continue with setting user states
      setErrorMessage({});
      setError(false);
    }

    if (validated.ok) {
      setDidChange(true);
    } else {
      setDidChange(false);
    }

    // insert new values in user object
    setUser(user => {
      return { ...user, [id]: validated.value };
    });
  };

  console.log('user, user.roles', user, user?.roles);

  return (
    <div>
      <div>
        <BackButton />
        {didChange && (
          <Tooltip title="Gem rettelser">
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 10 }}
              onClick={e => {
                e.preventDefault();
                id !== '-1'
                  ? updateUser({
                      variables: {
                        id: user.id,
                        active: user.active,
                        name: user.name,
                        username: user.username,
                        birthday: dateEpochToDateString(
                          user.birthday,
                          'yyyy-MM-DD',
                        ),
                        address: user.address,
                        email: user.email,
                        phone: user.phone,
                        roles: user.roles.map(role => role.id),
                      },
                    })
                  : createUser({
                      variables: {
                        active: user.active,
                        name: user.name,
                        username: user.username,
                        birthday: dateEpochToDateString(
                          user.birthday,
                          'yyyy-MM-DD',
                        ),
                        address: user.address,
                        email: user.email,
                        phone: user.phone,
                        roles: user.roles.map(role => role.id),
                      },
                    });
                setErrorMessage({});
                history.goBack();
              }}
            >
              {id === '-1' ? 'Opret' : 'Opdatér'}
            </Button>
          </Tooltip>
        )}
        {id !== '-1' && (
          <>
            <Tooltip title="Tryk kun på denne knap hvis du vil slette en bruger der er oprettet ved en fejl eller under test. Du får een mulighed mere for at fortryde hvis du trykker">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={e => {
                  e.preventDefault();
                  setOpenDialog(true);
                }}
              >
                Fjern
              </Button>
            </Tooltip>
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setOpenDialog(false)}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle
                id="alert-dialog-slide-title"
                className={classes.errorColor}
              >
                {'ADVARSEL!! Slet Medlem?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Du er ved at slette et Medlem!!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                  Det var en fejl jeg trykkede på Fjern knappen
                </Button>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    deleteUser({
                      variables: {
                        id: user.id,
                      },
                    });
                    history.goBack();
                  }}
                  className={classes.errorColor}
                >
                  Slet Medlemmet
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
      {user && (
        <div className={classes.root}>
          <div>
            <h1>Her kan et medlems data ændres</h1>
            <div>
              <ul>
                <li>
                  Database <b>Many-to-Many relation</b> mellem de to tabeller -
                  bruger og roller.
                  <ul>
                    <li>
                      En bruger kan have flere roller, og en rolle kan have
                      flere brugere
                    </li>
                  </ul>
                </li>
                <li>
                  Hold mus over <b>Roller</b>-feltet for mere info
                </li>
                <li>
                  Når der er ændret noget, tryk på OPDATÈR knappen for at gemme
                  ny data{' '}
                </li>
                <li>Tryk på FJERN knappen for at slette et medlem</li>
              </ul>
            </div>
            <br />
            <TextField
              id="name"
              label="Navn"
              error={!!errorMessage.name}
              value={user.name}
              className={classes.textFieldLarger}
              margin="dense"
              onChange={handleChange}
              variant="outlined"
              helperText={errorMessage.name && errorMessage.name}
            />
            <TextField
              id="username"
              label="IQ navn"
              error={!!errorMessage.username}
              value={user.username}
              className={classes.textField}
              margin="dense"
              onChange={handleChange}
              variant="outlined"
              helperText={errorMessage.username && errorMessage.username}
            />
            <TextField
              id="address"
              label="Adresse"
              error={!!errorMessage.address}
              value={user.address}
              className={classes.textFieldLarger}
              margin="dense"
              onChange={handleChange}
              variant="outlined"
              helperText={errorMessage.address && errorMessage.address}
            />
            <TextField
              id="email"
              label="Email"
              error={!!errorMessage.email}
              value={user.email}
              margin="dense"
              className={classes.textFieldLarger}
              onChange={handleChange}
              variant="outlined"
              helperText={errorMessage.email && errorMessage.email}
            />
            <TextField
              id="phone"
              label="Hjemmetelefon"
              value={user.phone}
              error={!!errorMessage.phone}
              className={classes.textField}
              margin="dense"
              onChange={handleChange}
              variant="outlined"
              helperText={errorMessage.phone && errorMessage.phone}
            />
            <FormControl
              name="size"
              variant="outlined"
              className={classes.textField}
              style={{ marginTop: 8 }}
              margin="dense"
            ></FormControl>
            {rolesQuery?.data?.allRoles?.roles && (
              <Tooltip title="Tryk på tekst for at vælge ny rolle. Slet gammel ved at trykke på kryds">
                <Autocomplete
                  multiple
                  id="roles"
                  name="roles"
                  options={rolesQuery?.data?.allRoles?.roles}
                  getOptionLabel={option => {
                    return option.role;
                  }}
                  defaultValue={[...user.roles]}
                  className={classes.textFieldLarger}
                  style={{ marginTop: 8 }}
                  onChange={handleChange}
                  renderInput={params => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Roller"
                        placeholder="Vælg ny titel"
                      />
                    );
                  }}
                />
              </Tooltip>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
