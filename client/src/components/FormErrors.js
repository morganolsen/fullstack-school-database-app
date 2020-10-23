import React from 'react';

/**
 * Component to display validation errors from forms.
 * 
 * @param {object} props 
 */
export default function FormErrors(props) {
    const displayErrors = props.data.map((error, index) => <li key={index}>{error}</li>);
    return(
        <div>
            {props.data.length ?
                <div className="validation-errors">
                    <h3 className="validation--errors--label">Error:</h3>
                    <ul>
                        {displayErrors}
                    </ul>
                </div>
            :
                <p></p>
            }
        </div>
    );
}