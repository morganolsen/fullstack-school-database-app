import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/**
 * Wrapper / higher level route for the private routes.
 */
export default function PrivateRoute({component: Component, ...rest}){
    return(
        <Consumer>
            {context => (
                <Route 
                    {...rest}
                    render={props => context.currentUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }} />
                    )}
                />
            )}
        </Consumer>
    );
}