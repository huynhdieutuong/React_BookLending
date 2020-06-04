import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';

import AuthContext from '../../contexts/auth/authContext';

const PrivateDefaultLayoutRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <Redirect to='/login' />;

  return (
    <Route
      {...rest}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  );
};

export default PrivateDefaultLayoutRoute;
