import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import find from 'lodash/find';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import wildcard from 'wildcard';
import { pagesHasPermission, navigationMenu } from '../../configs/pages';
import { useStyles } from './header.styles';
import { authService } from '../../services/auth.service';
import { user } from '../../util/user';

function Header({ history }) {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenName, setScreenName] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // listen route change
    history.listen(() => {
      const path = window.location.pathname;
      const routeName = find(pagesHasPermission, page =>
        wildcard(page.path?.replace(':id', '*'), path)
      )?.name;
      setScreenName(routeName);
    });

    const path = window.location.pathname;
    const routeName = find(pagesHasPermission, page =>
      wildcard(page.path?.replace(':id', '*'), path)
    )?.name;
    setScreenName(routeName);

    setUserInfo(user.getUserInfo());
  }, []);

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderMenuList = () => (
    <List>
      {map(navigationMenu[userInfo.role], nav => (
        <ListItem
          button
          key={nav.path}
          onClick={() => {
            toggleMenu();
            history.push(nav.path);
          }}
        >
          {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
          <ListItemText primary={nav.name} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar className={classes.header}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {screenName}
          </Typography>
          <div className={classes.grow} />
          <div>
            <span className={classes.iconHome}>
              <IconButton
                aria-label="home"
                color="inherit"
                onClick={() => history.push('/')}
              >
                <HomeIcon />
              </IconButton>
            </span>

            <IconButton
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              className={classes.iconUserName}
            >
              <AccountCircle />
              <span className={classes.userName}>
                {`ID: ${userInfo.username}`}
              </span>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={toggleMenu}
        className={classes.drawer}
      >
        {renderMenuList()}
      </Drawer>
    </div>
  );
}
Header.propTypes = {
  history: PropTypes.instanceOf(Object),
};

Header.defaultProps = {
  history: {},
};

export { Header };
