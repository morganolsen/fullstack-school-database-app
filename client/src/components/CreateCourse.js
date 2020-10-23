import React, {useRef, useState} from 'react';
import Form from './Form';
import { createCourse } from '../Data';

/**
 * Creates the create course view.
 * Allows the user to create a new course.
 * 
 * @param {object} props 
 */
export default function UserSignIn(props) {

    const [errors, setErrors] = useState([]);
    const fields = {
        title: useRef(null),
        description: useRef(null),
        estimatedTime: useRef(null),
        materialsNeeded: useRef(null)
    }

    /**
     * Submit handler
     * Calls createCourse to send a request to the API
     */
    async function submit(){
        const body = {
            title: fields.title.current.value,
            description: fields.description.current.value,
            estimatedTime: fields.estimatedTime.current.value,
            materialsNeeded: fields.materialsNeeded.current.value,
            userId: props.context.currentUser.id
        }
        const response = await createCourse(body);
        if(response === 201){
            props.history.push('/');
        }else if(response === 500){
            props.history.push('/error');
        }else{
            setErrors(response.errors);
        }
    }


    return(
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
                <Form
                    submit={submit}
                    errors={errors}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="input-title course--title--input"
                                            ref={fields.title}
                                            placeholder="Course title..."
                                        />
                                    </div>
                                    <p>By Joe Smith</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            placeholder="Course description..."
                                            ref={fields.description}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    className="course--time--input"
                                                    placeholder="Hours"
                                                    ref={fields.estimatedTime}
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    placeholder="List materials..."
                                                    ref={fields.materialsNeeded}
                                                ></textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                />
            </div>
        </div>
    );
}