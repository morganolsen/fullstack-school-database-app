import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {getUser} from './Data';

const Context = React.createContext();
/**
 * Global provider function 
 */
export class Provider extends Component {

    state = {
        currentUser: Cookies.getJSON('authenticated') || null
    };

    /**
     * Attempts to sign a user in with the given credentials.
     * Sets 2 cookies - one for the user information and one for the auth string.
     * 
     * @param {string} emailAddress - The submitted e-mail address
     * @param {string} password - The submitted password
     */
    signIn = async (emailAddress, password) => {
        const user = await getUser(emailAddress, password);
        if(user !== null){
            this.setState({ currentUser: user });
            Cookies.set('authenticated', JSON.stringify(user), {expires:1});
            // Instead of storing the password in plaintext, I'm storing the authorization string.
            // It's not any more secure than storing the password in plaintext but to a non-savvy user
            // It looks like gibberish instead of their password.
            Cookies.set('authorization', btoa(emailAddress + ":" + password));
        }
        return user;
    }

    /**
     * Signs a user out by resetting state and removing cookies.
     */
    signOut = () => {
        this.setState({ currentUser: null });
        Cookies.remove('authenticated');
        Cookies.remove('authorization');
    }

    render(){
        const value = {
            currentUser: this.state.currentUser,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        }
        return(
            <Context.Provider value={value}>
                {this.props.children}    
            </Context.Provider>
        );
    }

}

// Consumer to be used in PrivateRoute
export const Consumer = Context.Consumer;

/**
 * Global context handler.
 * withContext() is passed in the route to provide context to the component.
 */
export function withContext(Component) {
    return function ContextComponent(props) {
        return(
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}