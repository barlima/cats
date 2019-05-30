import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import UserContext from '../context/user';
import { setUser } from '../reducers/user';
import axios from 'axios';

const PrivateRoute = ({ 
  component: Component, 
  ...rest
}) => {

  const token = localStorage.getItem('token');
  const [ user, dispatch ] = useContext(UserContext);

  const fetchUser = async token => {
    const config = {
      headers: {'Authorization': "bearer " + token}
    };
    const res = await axios.get('http://localhost:3001/api/v1/users/current', config);
    dispatch(setUser(res.data));
  }

  useEffect(() => {
    if(Object.keys(user).length === 0 && token) {
      fetchUser(token); 
    }
  }, [user, token])

  return(
    <Route {...rest} component={(props) => (
      token ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/login" />
      )
    )} />
  );
}

export default PrivateRoute;