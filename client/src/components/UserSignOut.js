import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Component for signing out. Calls signout function and redirects to home screen.
 * @param {object} props 
 */
export default function UserSignOut(props) {
    props.context.actions.signOut();
    return(<Redirect to="/" />);
}