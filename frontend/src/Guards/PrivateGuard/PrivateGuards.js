import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthGuard = ({component: Component, ...rest }) => {

  var isAuthenticated = false;
  var tokens = localStorage.getItem('token');
  if (tokens !== null && tokens !== undefined) {
    isAuthenticated =true;
 
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: `/`,
                state: {
                  from: props.location
                }
              }}
            />
          )
      }
    />
  );
};



export default AuthGuard;