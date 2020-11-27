import React from 'react';
import {withRouter} from 'react-router-dom';
import FormErrors from './FormErrors';

/**
 * Wrapper / higher-level component for forms
 * 
 * @param {object} props 
 */
function Form(props) {
    const{
        errors,
        submit,
        cancel,
        submitButtonText,
        elements
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        if(!cancel){
            props.history.push('/');
        }else{
            cancel();
        }
        
    }

    return(
        <div>
            <FormErrors data={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Form);