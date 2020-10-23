import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Header component that displays the main header and navbar.
 * 
 * @param {object} props 
 */
export default function Header(props) {
    const user = props.context.currentUser;
    return(
        <header>
            <div>
                <div className="header">
                    <div className="bounds">
                    <NavLink to="/"><h1 className="header--logo">Courses</h1></NavLink>
                    {user ? (
                        <nav>
                            <span>Welcome, {user.firstName} {user.lastName}</span>
                            <NavLink className="signin" to="/signout">Sign Out</NavLink>
                        </nav>
                    ) : (
                        <nav>
                            <NavLink className="signup" to="/signup">Sign Up</NavLink>
                            <NavLink className="signin" to="/signin">Sign In</NavLink>
                        </nav>
                    )}
                    </div>
                </div>
            </div>
            <hr />
        </header>
    );
}