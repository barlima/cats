import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import Vote from '../components/Vote/Vote';
import Cats from '../components/Admin/Cats';
import Statistics from '../components/Admin/Statistics';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import Top from '../components/Top/Top';
import AdminRoute from './AdminRoute';

const history = createBrowserHistory();

const AppRouter = () => {
  return(
    <Router history={history}>
       <Switch>
         <AdminRoute path="/statistics" component={Statistics} />
         <AdminRoute path="/cats" component={Cats} />
         <PrivateRoute path="/top" component={Top} />
         <Route path="/login" component={Login} />
         <Route path="/signup" component={Signup} />
         <PrivateRoute path="/" component={Vote} />
       </Switch>
    </Router>
  )
}

export default AppRouter;
