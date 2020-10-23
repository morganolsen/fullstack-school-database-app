import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.log('Error fetching and parsing data'));
  });

  const courses = data.map(course => (
    <li>{course.title}</li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {courses}
        </ul>
      </header>
    </div>
  );
}

export default App;
