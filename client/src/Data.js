import config from './config';
import Cookies from 'js-cookie';

/**
 * Calls the API on the given path with the given method.
 * 
 * @param {string} path                     - The path to call
 * @param {string} [method = 'GET']         - The method of the HTTP request
 * @param {object} [body]                   - The body of the request
 * @param {boolean} [authRequired = false]  - Whether to provide authorization header
 * @param {object} [credentials]            - Credentials for authorization
 * @param {string} [authKey]                - Base64 encoded authorization key
 * 
 * @returns {promise} - The response from the API
 */
function api(path, method = 'GET', body = null, authRequired = false, credentials = {}, authKey = '') {
    const url = config.apiBaseUrl + path;

    // Options object to pass with the fetch request.
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If auth is required and credentials are present, create auth header.
    if(authRequired){
        if((credentials.emailAddress && credentials.password) || authKey.length){
            if(!authKey.length){
                authKey = btoa(`${credentials.emailAddress}:${credentials.password}`);
            }
            options.headers['Authorization'] = `Basic ${authKey}`;
        }
    }

    // If there is a body to the request, stringify it and add it to the options
    if(body !== null){
        options.body = JSON.stringify(body);
    }

    return fetch(url, options);
}

/**
 * Requests all courses from the API
 * 
 * @returns {object} - The response if the request was successful, an error code if not.
 */
export async function getCourses(){
    const response = await api('/courses');
    if(response.status === 200){
        return response.json().then(data => data);
    }else{
        return 500;
    }
}

/**
 * Requests a single course from the API
 * 
 * @param {number} id - The ID of the course to request
 * 
 * @returns {object} - The response if the request was successful, an error code if not.
 */
export async function getCourse(id){
    const response = await api('/courses/' + id);
    if(response.status === 200){
        return response.json().then(data => data);
    }else{
        return 500;
    }
}

/**
 * Requests the API to delete a single course
 * 
 * @param {number} id - The ID of the course to delete
 * 
 * @returns {boolean} - True if the course was deleted, false if the user didn't have permissions, or a 500 error code.
 */
export async function deleteCourse(id){
    const authKey = Cookies.get('authorization');
    const response = await api('/courses/' + id, 'DELETE', undefined, true, undefined, authKey);
    if(response.status === 204){
        return true;
    }else if(response.status === 403 || response.status === 401){
        return false;
    }else{
        return 500;
    }
}

/**
 * Requrests the API to create a course.
 * 
 * @param {object} body - The parameters to insert.
 * 
 * @returns {number/object} - A 201 code if successful, an object of the error messages if not. 
 */
export async function createCourse(body){
    const authKey = Cookies.get('authorization');
    const response = await api('/courses/', 'POST', body, true, undefined, authKey);
    if(response.status === 201){
        return 201;
    }else if(response.status === 400){
        return response.json().then(data => data);
    }else{
        return 500;
    }
}

/**
 * Requests the API to update a single course
 * 
 * @param {number} id - The ID of the course to update.
 * @param {object} body - The new parameters of the course.
 * 
 * @returns {number/object} - 204 if successful, object with errors if failed.
 */
export async function updateCourse(id, body){
    const authKey = Cookies.get('authorization');
    const response = await api('/courses/' + id, 'PUT', body, true, undefined, authKey);
    if(response.status === 204){
        return 204;
    }else if(response.status === 400){
        return response.json().then(data => data);
    }else{
        return 500;
    }
}

/**
 * Requests the API to insert a new user
 * 
 * @param {object} body - The parameters to insert
 * 
 * @returns {number/object} - 201 if successful, object with errors if failed.
 */
export async function registerUser(body){
    const response = await api('/users', 'POST', body);
    if(response.status === 201){
        return 201;
    }else if(response.status === 400){
        return response.json().then(data => data);
    }else{
        return 500;
    }
}

/**
 * Requests a user from the API
 * 
 * @param {string} emailAddress - The e-mail address of the user to request. 
 * @param {string} password     - The password of the user to request.
 * 
 * @returns {object} - The returned user if successfull, null if no user with the credentials was found.
 */
export async function getUser(emailAddress, password){
    const response = await api("/users", "GET", null, true, {emailAddress, password});
    console.log({emailAddress, password});
    if(response.status === 200){
        return response.json().then(data => data);
    }else if(response.status === 401){
        return null;
    }else{
        return 500;
    }
}