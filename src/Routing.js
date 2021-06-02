/* eslint-disable react/no-array-index-key */
/* eslint-disable import/named */

import { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ListSubheader from '@material-ui/core/ListSubheader';
import SubjectIcon from '@material-ui/icons/Subject';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Header from './components/Header';
// import Facebook from './components/Facebook';
import { Users } from './screens/users/Users';
import { User } from './screens/users/User';
import { Logout } from './screens/Logout';
import { Board } from './screens/users/Board';
import { Titles } from './screens/users/Titles';
import { SignIn } from './screens/SignIn';
import { Halls } from './screens/library/Halls';
import { Summary } from './screens/library/Summary';
import { Song } from './screens/library/Song';
import { Laws } from './screens/library/Laws';
import { PreviousTours } from './screens/library/PreviousTours';
import { Letters } from './screens/library/Letters';
// import { IFRAME_URL, IFRAME_COUNTDOWN } from './constants';
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/Login';
import LoginValidation from './screens/LoginValidation';
import Snackbar from './components/Snackbar';
import { auth } from './utils/firebase';
import { userState, tokenState } from './Recoil';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

const drawerWidth = 240;
const usersMenuItems = [
  { name: 'Medlemmer', to: '/users', icon: <PeopleIcon /> },
  { name: 'Bestyrelsen', to: '/board', icon: <SportsKabaddiIcon /> },
  { name: 'Titler', to: '/titles', icon: <EmojiEventsIcon /> },
];
const mediaMenuItems = [{ name: '---', to: '/letters', icon: <EmailIcon /> }];
const libMenuItems = [
  { name: 'De hellige Haller', to: '/halls', icon: <MenuBookIcon /> },
  { name: 'GF Referat', to: '/summary', icon: <SubjectIcon /> },
  { name: 'Breve', to: '/letters', icon: <EmailIcon /> },
  { name: 'Sangen', to: '/song', icon: <LibraryMusicIcon /> },
  { name: 'Love og Vedtægter', to: '/laws', icon: <GavelIcon /> },
  {
    name: 'Tidligere Ture',
    to: '/previous-tours',
    icon: <AirplanemodeActiveIcon />,
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  links: {
    color: 'white',
    textDecoration: 'none',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  noAppBar: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  iframes: {
    display: 'flex',
    paddingRight: 600,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function Routing({ buildDate }) {
  // material-ui
  const classes = useStyles();
  const theme = useTheme();

  // react
  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // recoil
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

  // react-cookie
  const [cookies, setCookie] = useCookies(['user']);

  /**
   * starts auth listener
   *
   * When another function changed the auth object this listener notice and
   * the user is changed in redux
   */
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // const onAuthStateChanged = async userStateHandler => {
  //   console.log('userStateHandler 98', userStateHandler);
  //   if (userStateHandler?.email) {
  //     setAuthenticated(true);

  //     console.log(
  //       'email 98',
  //       userStateHandler.email
  //         ? userStateHandler.email
  //         : userStateHandler?.user.email,
  //     );
  //     console.log(
  //       'uid 98',
  //       userStateHandler.uid
  //         ? userStateHandler.uid
  //         : userStateHandler?.user?.uid,
  //     );
  //     const userData = {
  //       email: userStateHandler.email
  //         ? userStateHandler.email
  //         : userStateHandler?.user?.email,
  //       firebaseUid: userStateHandler.uid
  //         ? userStateHandler.uid
  //         : userStateHandler?.user?.uid,
  //     };
  //     console.log('userData 98', userData);
  //     setUser(userData);

  //     // refresh firebase token and update recoil value so apolloclient will use updated token
  //     // when fetching from graphQL server
  //     const token = await auth().currentUser.getIdToken();
  //     setToken({ token });
  //   } else {
  //     setAuthenticated(false);
  //   }
  //   if (initializing) setInitializing(false);
  // };

  // console.log('initializing 32', initializing);
  // console.log('user - 1 33', user);

  // useEffect(() => {
  //   let savedUser = {};
  //   if (cookies) {
  //     savedUser = cookies.user;
  //   }
  //   if (typeof savedUser !== 'object') {
  //     savedUser = {};
  //   }
  //   console.log('user - 2 33', user);

  //   setUser(oldUser => {
  //     const sum = { ...savedUser, ...oldUser };
  //     return sum;
  //   });
  // }, [initializing]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <ListSubheader>Medlemmer</ListSubheader>
      <List>
        {usersMenuItems.map((listObj, index) => (
          <ListItem button key={index} component={NavLink} to={listObj.to}>
            <ListItemIcon>{listObj.icon}</ListItemIcon>
            <ListItemText primary={listObj.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListSubheader>Bibliotek</ListSubheader>
      <List>
        {libMenuItems.map((listObj, index) => (
          <ListItem button key={index} component={NavLink} to={listObj.to}>
            <ListItemIcon>{listObj.icon}</ListItemIcon>
            <ListItemText primary={listObj.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListSubheader>Media</ListSubheader>
      <List>
        {mediaMenuItems.map((listObj, index) => (
          <ListItem button key={index} component={NavLink} to={listObj.to}>
            <ListItemIcon>{listObj.icon}</ListItemIcon>
            <ListItemText primary={listObj.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListSubheader>Bruger</ListSubheader>
      {authenticated ? (
        <List>
          <ListItem button key={'logout'} component={NavLink} to="/logout">
            <ListItemIcon>
              {' '}
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Log ud" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button key={'login'} component={NavLink} to="/login">
            <ListItemIcon>
              {' '}
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Log ind" />
          </ListItem>
        </List>
      )}
    </div>
  );

  const OldSite = () => {
    return (
      <>
        {/* <div className={classes.iframes}>
          <iframe
            width="100%"
            height="100%"
            title="iframe"
            src={IFRAME_COUNTDOWN}
          />
        </div>
        <a onClick={() => (window.location.href = 'https://iq96.dk/IQ3')}>
          Hvis den gamle IQ96 side ikke kommer hernedenunder, så tryk her for at
          logge ind dér, og kom tilbage hertil og genopfrisk siden
        </a>
        <div className={classes.iframes}>
          <iframe width="1165" height="1165" title="iframe" src={IFRAME_URL} />
        </div> */}
        {buildDate && <p>Siden opdateret: {buildDate}</p>}
      </>
    );
  };

  // if (initializing) {
  //   return <Snackbar severity="info">Henter....</Snackbar>;
  // }

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={!mobileOpen ? classes.noAppBar : classes.appBar}
        >
          <Header
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />
        </AppBar>
        <>
          {mobileOpen && (
            <nav className={classes.drawer} aria-label="mailbox folders">
              <Hidden smUp implementation="css">
                <Drawer
                  // container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
          )}
        </>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <main>
              <Route exact path="/" component={OldSite} />
              {/* <Route path="/login" component={Login} /> */}
              {/* <Route path="/logout" authenticated={authenticated}>
                <Logout />
              </Route> */}
              {/* {authenticated && <Facebook />} */}
              {/* <Route
                path="/loginvalidation"
                authenticated={authenticated}
              >
                <LoginValidation />
              </Route> */}
              <Route path="/users" authenticated={authenticated}>
                <Users />
              </Route>
              <Route path="/user/:id" authenticated={authenticated}>
                <User />
              </Route>
              <Route path="/board" authenticated={authenticated}>
                <Board />
              </Route>
              <Route path="/titles" authenticated={authenticated}>
                <Titles />
              </Route>
              <Route path="/signin" authenticated={authenticated}>
                <SignIn />
              </Route>
              <Route path="/halls" authenticated={authenticated}>
                <Halls />
              </Route>
              <Route path="/summary" authenticated={authenticated}>
                <Summary />
              </Route>
              <Route path="/letters" authenticated={authenticated}>
                <Letters />
              </Route>
              <Route path="/song" authenticated={authenticated}>
                <Song />
              </Route>
              <Route path="/laws" authenticated={authenticated}>
                <Laws />
              </Route>
              {/* <Route
                path="/previous-tours"
                authenticated={authenticated}
              >
                <PreviousTours />
              </Route> */}
            </main>
          </div>
        </main>
      </Router>
    </div>
  );
}
