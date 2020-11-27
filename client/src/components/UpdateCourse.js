import React, {useRef, useState, useEffect} from 'react';
import Form from './Form';
import { getCourse, updateCourse } from '../Data';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

/**
 * The component to update courses.
 * Redirects to the forbidden page if the user doesn't own the course.
 * @param {object} props 
 */
export default function UpdateCourse(props) {

    const [errors, setErrors] = useState([]);
    const fields = {
        title: useRef(null),
        description: useRef(null),
        estimatedTime: useRef(null),
        materialsNeeded: useRef(null)
    }

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const id = props.match.params.id;
        getCourse(id)
            .then(result => setData(result))
            .catch(err => {
                props.history.push('/not-found');
            })
            .finally(result => {
                setIsLoading(false);
            });
    }, [props.match.params.id, props.history]);

    /**
     * Calls updateCourse to send the request to the API.
     */
    async function submit(){
        console.log("hello");
        const body = {
            title: fields.title.current.value,
            description: fields.description.current.value,
            estimatedTime: fields.estimatedTime.current.value,
            materialsNeeded: fields.materialsNeeded.current.value,
            userId: props.context.currentUser.id
        }
        const response = await updateCourse(data.id, body);
        if(response === 204){
            props.history.push('/');
        }else if(response === 500){
            props.history.push('/error');
        }else{
            setErrors(response.errors);
        }
    }

    function cancel(){
        props.history.push('/courses/' + props.match.params.id);
    }

    if(isLoading){
        return(<Loading />);
    }

    if(props.context.currentUser.id !== data.User.id){
        return(<Redirect to="/forbidden" />);
    }

    const { title, description, estimatedTime, materialsNeeded } = data;
    const author = `${data.User.firstName} ${data.User.lastName}`;

    return(
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
                <Form
                    submit={submit}
                    errors={errors}
                    submitButtonText="Update Course"
                    cancel={cancel}
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
                                            defaultValue={title}
                                            placeholder="Course title..."
                                        />
                                    </div>
                                    <p>By {author}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            placeholder="Course description..."
                                            defaultValue={description}
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
                                                    defaultValue={estimatedTime}
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
                                                    defaultValue={materialsNeeded}
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