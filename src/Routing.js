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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import ListSubheader from '@material-ui/core/ListSubheader';
import GavelIcon from '@material-ui/icons/Gavel';
import Header from './components/Header';
import { Users } from './screens/users/Users';
import { User } from './screens/users/User';
// import Snackbar from './components/Snackbar';

const drawerWidth = 240;
const usersMenuItems = [
  { name: 'Medlemmer', to: '/users', icon: <PeopleIcon /> },
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
    </div>
  );

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
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/user/:id">
                <User />
              </Route>
            </main>
          </div>
        </main>
      </Router>
    </div>
  );
}
