import React, { useState, useEffect } from 'react';
import { getCourses } from '../Data';
import { Link } from 'react-router-dom';
import Course from './Course';
import Loading from './Loading';

/**
 * Creates the courses list to show on the main page.
 * 
 * @param {object} props 
 */
export default function Courses(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCourses()
            .then(data => setData(data))
            .catch(err => props.history.push('/error'))
            .finally(setIsLoading(false));
    }, [props.history]);

    const courses = data.map(course => <Course key={course.id} id={course.id} title={course.title} />);
    return(
        <div className="bounds">
            {isLoading ?
                <Loading />
            :
                courses
            }
            {props.context.currentUser ?
            <div className="grid-100">
                <Link to={"/courses/create"} className="button">Create Course</Link>
            </div>
        : <p></p> }
        </div>
    );
}