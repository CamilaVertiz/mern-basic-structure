import React, {useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),        
      color: 'white',
    },
    title: {
      flexGrow: 1,
    },    
    topNav: {
        backgroundColor: theme.palette.primary.light,
    },
    white: {
        color: 'white',
    },
  }));

const NavBar = () => {
  const {userData, setUserData } = useContext(Context);  
  const history = useHistory();
  const logout = () =>{ setUserData({
       token: undefined,
       user: undefined,
    });
    localStorage.setItem('auth-token', '');  
    history.push('/login')
  };
  const classes = useStyles();

  return (
    <AppBar position="static">
    <Toolbar className={classes.topNav} >
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>          
             <Link className={classes.white} to="/" >Basic Login Structure </Link>
        </Typography>
        { userData.user ? (
            <div>
              <Link to="/profile" >
                  <Button className={classes.menuButton} >Profile</Button>
              </Link>    
              <Button className={classes.menuButton} onClick={logout}>Log Out</Button>
            </div>  
          ) : (   
            <div>                            
              <Link to="/signup" >
                  <Button className={classes.menuButton} >Register</Button>
              </Link>   
              <Link to="/login" >
                  <Button className={classes.menuButton} >Login</Button>
              </Link>
            </div>   
          )
        }
    </Toolbar>
    </AppBar>
  );
};

export default NavBar