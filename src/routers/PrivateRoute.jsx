import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        React.createElement(component, props)
      ) : (
        // <Redirect to="/discover" />
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
