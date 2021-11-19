import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    // const logged = sessionStorage.getItem('logged')
    return (
        <Route {...rest} render={props => (
            // logged === 'true' ?
                <Component {...props} />
            // : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;