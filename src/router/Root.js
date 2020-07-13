import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Context from '../context/Context';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../css/theme/theme';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Dashboard from '../components/layout/Dashboard';
import Profile from '../components/auth/Profile';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

const Root = () => {
  const [ userData, setUserData] = useState({
     token: undefined,
     user: undefined,
  });
  
  useEffect(( ) => {
     const isAuthenticated = async () => {
       let token = localStorage.getItem('auth-token');
       if(token === null){
          localStorage.setItem('auth-token', '');
          token = '';
       }

       const tokenRes = await axios.post('http://localhost:5000/users/auth', null, {headers: { 'x-auth-token': token } } );
        if(tokenRes.data){
           const userRes = await axios.get('http://localhost:5000/users/', null, {headers: { 'x-auth-token': token } } );
           setUserData({token, user: userRes.data});
        }
     };

     isAuthenticated();
  }, []);

  return (
    <Router>
      <Context.Provider value={{userData, setUserData}}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>                      
            <Route path="/profile">
              <Profile />
            </Route>  
            <Route path="/">
              <Dashboard />
            </Route>  
          </Switch>
          <Footer />
        </ThemeProvider>
      </Context.Provider>  
    </Router>
  )
}

export default Root;
