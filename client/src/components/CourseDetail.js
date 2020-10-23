import React, { useState, useEffect } from 'react';
import { getCourse, deleteCourse } from '../Data';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Loading from './Loading';

/**
 * Creates the detail view for a single course.
 * 
 * @param {object} props 
 */
export default function CourseDetail(props) {
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
     * Handles what happens when the "delete" button is pressed.
     * 
     * @param {event} e 
     */
    const handleDelete = async (e) => {
        e.preventDefault();
        const prompt = window.confirm("Are you sure you wish to delete this course?");
        if(prompt){
            await deleteCourse(data.id);
            props.history.push('/');
        }
    }

    // Shows the loading text if the content is loading.
    if(isLoading){
        return(
            <Loading />
        );
    }

    const { title, description, estimatedTime, materialsNeeded } = data;
    const author = `${data.User.firstName} ${data.User.lastName}`;

    return(
        <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{ title }</h3>
                <p>By {author}</p>
                </div>
                <div className="course--description">
                    <ReactMarkdown>
                        { description }
                    </ReactMarkdown>
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{ estimatedTime }</h3>
                        </li>
                        
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                            <ReactMarkdown>
                                {materialsNeeded}
                            </ReactMarkdown>
                        </li>
                        
                    </ul>
                    {props.context.currentUser && props.context.currentUser.id === data.User.id ? (
                    <form onSubmit={handleDelete}>
                        <Link to={"/courses/" + data.id + "/update"} className="button">Update</Link>
                        <button type="submit" className="button danger">Delete</button>
                    </form>
                    ) : (<p></p>) }
                </div>
            </div>
        </div>
    );

}