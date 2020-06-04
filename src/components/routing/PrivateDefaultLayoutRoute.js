import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';

import AuthContext from '../../contexts/auth/authContext';

const PrivateDefaultLayoutRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

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
