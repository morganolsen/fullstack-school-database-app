import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Creates a course "box" to show in the courses list.
 * 
 * @param {object} props 
 */
export default function Course(props) {
    const {id,title} = props; 
    return(
        <div className="grid-33">
            <Link className="course--module course--link" to={`/courses/${id}`}>
                <h4 className="course--label">
                    Course
                </h4>
                <h3 className="course--title">
                    {title}
                </h3>
            </Link>
        </div>
    );
}