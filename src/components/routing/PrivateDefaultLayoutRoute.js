import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import Spinner from '../layouts/Spinner';

import AuthContext from '../../contexts/auth/authContext';

const PrivateDefaultLayoutRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  return (
    <Route
      {...rest}
      render={(props) => (
        <DefaultLayout>
          {!isAuthenticated ? (
            <Redirect to='/login' />
          ) : (
            <Component {...props} />
          )}
        </DefaultLayout>
      )}
    />
  );
};

export default PrivateDefaultLayoutRoute;
