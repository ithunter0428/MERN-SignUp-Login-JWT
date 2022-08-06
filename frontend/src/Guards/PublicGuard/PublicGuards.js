import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicGuard = ({ component: Component, ...rest }) => {
  var isAuthenticated = false;
  var tokens = localStorage.getItem('token');
  if (tokens === null || tokens === undefined) {
    isAuthenticated =true;
 
  }

  return (
    <Route
      {...rest}
      render={props => 
        isAuthenticated ? (
          <Component {...props}/>
        ) : (
            <Redirect
              to={{
                pathname: `/auth/dashboard`,
                state: {
                  from: props.location
                }
              }}
            />
          )
      }
    />
  );
  // return(
  //   <>
  //   {
  //   isAuthenticated ? (
  //         <Component/>
  //       ) : (
  //           <Redirect
  //             to={{
  //               pathname: `/auth/dashboard`,
  //               // state: {
  //               //   from: props.location
  //               // }
  //             }}
  //           />
  //         )
  //   }
  //   </>
  // )
};



export default PublicGuard;