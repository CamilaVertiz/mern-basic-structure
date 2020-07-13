import React, {useState, useContext} from 'react';
import Context from '../../context/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));

const initialState = {
  username: '',
  email: '',
  password: '',
};

const SignUp = () => {  
  const { setUserData } = useContext(Context);
  const classes = useStyles();
  const history = useHistory();
  const [{ username, email, password }, setState] = useState(initialState);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users/register', { username, email, password });
    const loginRes = await axios.post('http://localhost:5000/users/login', { email, password });
    setUserData({
       token: loginRes.data.token,
       user: loginRes.data.user,
    });
    localStorage.setItem('auth-token', loginRes.data.token);    
    history.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Username" value={username} name="username" onChange={onChange} autoFocus/>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Email Address" value={email} name="email" onChange={onChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Password"  value={password} name="password" onChange={onChange} type="password"/>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp
