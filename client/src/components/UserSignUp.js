import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import { registerUser } from '../Data';

/**
 * Sign up form and handler.
 * @param {object} props 
 */
export default function UserSignUp(props) {

    const [errors, setErrors] = useState([]);
    const fields = {
        firstName: useRef(null), 
        lastName: useRef(null),
        emailAddress: useRef(null),
        password: useRef(null),
        confirmPassword: useRef(null)
    };

    /**
     * Validates that the fields aren't empty before
     * sending a request to the API that handles more
     * in-depth validation.
     */
    async function submit(){
        let errorArray = [];
        const firstName = fields.firstName.current.value;
        const lastName = fields.lastName.current.value;
        const emailAddress = fields.emailAddress.current.value;
        const password = fields.password.current.value;
        const confirmPassword = fields.confirmPassword.current.value;

        if(!firstName.length){
            errorArray.push('You need to enter a first name.');
        }
        if(!lastName.length){
            errorArray.push('You need to enter a last name.');
        }
        if(!emailAddress.length){
            errorArray.push('You need to enter an e-mail address.');
        }
        if(!password.length){
            errorArray.push('You need to enter a password.');
        }
        if(password !== confirmPassword){
            errorArray.push('Your passwords did not match.');
        }

        if(!errorArray.length){
            const body = {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: password
            }
            const user = await registerUser(body);
            if(user === 201){
                props.history.push('/');
            }else if(user === 500){
                props.history.push('/error');
            }else{
                errorArray = user.errors;
            }
        }

        setErrors(errorArray);
    }

    return(
        <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
                <Form
                    submit={submit}
                    errors={errors}
                    submitButtonText="Sign Up"
                    elements={() => (
                        <React.Fragment>
                            <div>
                                <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    ref={fields.firstName}
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <input 
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    ref={fields.lastName}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <input 
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    ref={fields.emailAddress}
                                    placeholder="Email Address"
                                />
                            </div>
                            <div>
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    ref={fields.password}
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <input 
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    ref={fields.confirmPassword}
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </React.Fragment>
                    )}
                />
            </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
    );
}