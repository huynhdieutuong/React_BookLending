import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { message } from 'antd';

// Routes
import DefaultLayoutRoute from './DefaultLayoutRoute';
import PrivateDefaultLayoutRoute from './PrivateDefaultLayoutRoute';
import PublicDefaultLayoutRoute from './PublicDefaultLayoutRoute';

// Components
import Books from '../books/Books';
import SingleBook from '../books/SingleBook';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../profile/Profile';
import Transactions from '../transaction/Transactions';
import SingleTransaction from '../transaction/SingleTransaction';
import AdminBooks from '../books/AdminBooks';
import Users from '../user/Users';
import SingleUser from '../user/SingleUser';
import Cart from '../cart/Cart';

import Spinner from '../layouts/Spinner';
import NotFound from '../layouts/NotFound';

import AuthContext from '../../contexts/auth/authContext';
import AlertContext from '../../contexts/alert/alertContext';

const Routes = () => {
  const { loadUser, user, loading } = useContext(AuthContext);
  const { alerts, type, setAlert } = useContext(AlertContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    alerts.length > 0 && alerts.map((alert) => message[type](alert));
    // eslint-disable-next-line
  }, [setAlert]);

  if (token) {
    if (loading || !user) return <Spinner />;
  }

  return (
    <Switch>
      <DefaultLayoutRoute exact path='/' component={Books} />
      <DefaultLayoutRoute exact path='/search' component={Books} />
      <DefaultLayoutRoute exact path='/books/:id' component={SingleBook} />
      <PublicDefaultLayoutRoute exact path='/login' component={Login} />
      <PublicDefaultLayoutRoute exact path='/register' component={Register} />
      <PrivateDefaultLayoutRoute exact path='/profile' component={Profile} />
      <PrivateDefaultLayoutRoute
        exact
        path='/transactions'
        component={Transactions}
      />
      <PrivateDefaultLayoutRoute
        exact
        path='/transactions/:id'
        component={SingleTransaction}
      />
      <PrivateDefaultLayoutRoute exact path='/users' component={Users} />
      <PrivateDefaultLayoutRoute
        exact
        path='/users/:id'
        component={SingleUser}
      />
      <PrivateDefaultLayoutRoute exact path='/books' component={AdminBooks} />
      <PrivateDefaultLayoutRoute exact path='/cart' component={Cart} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
