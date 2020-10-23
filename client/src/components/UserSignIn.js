import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
 * Component for the sign in form.
 * 
 * @param {object} props 
 */
export default function UserSignIn(props) {
    console.log(props);
    const [errors, setErrors] = useState([]);
    const fields = {
        emailAddress: useRef(null),
        password: useRef(null)
    }

    /**
     * Calls signIn function in order to sign in a user.
     */
    async function submit(){
        const emailAddress = fields.emailAddress.current.value;
        const password = fields.password.current.value;
        const { from } = props.location.state || { from: { pathname: '/' } };

        const user = await props.context.actions.signIn(emailAddress, password);
        if(user){
            props.history.push(from);
        }else{
            setErrors(['Wrong username or password.']); 
        }
    }


    return(
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Form
                submit={submit}
                errors={errors}
                submitButtonText="Sign In"
                elements={() => (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            />
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
    );
}