import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { withContext } from './Context';
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

const HeaderWithContext = withContext(Header);

function App() {

  return (
    <BrowserRouter>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={withContext(Courses)} />
        <Redirect exact path="/courses" to="/" />
        <Route path="/not-found" component={NotFound} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <PrivateRoute path="/courses/create" component={withContext(CreateCourse)} />
        <PrivateRoute path="/courses/:id/update" component={withContext(UpdateCourse)} />
        <Route exact path="/courses/:id" component={withContext(CourseDetail)} />
        <Route path="/signin" component={withContext(UserSignIn)} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={withContext(UserSignOut)} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
