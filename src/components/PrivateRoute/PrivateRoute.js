import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    // const logged = sessionStorage.getItem('logged')
    return (
        <Route {...rest} render={props => (
            // logged === 'true' ?
            <div className='adminWrapper'>
                <div className='adminContainer'>
                    <Component {...props} />
                </div>
            </div>
            // : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;