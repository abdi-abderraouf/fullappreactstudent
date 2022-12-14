import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import CreateStudent from './components/CreateStudent';
import ShowStudentList from './components/ShowStudentList';
import ShowStudentDetails from './components/ShowStudentDetails';
import UpdateStudentInfo from './components/UpdateStudentInfo';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowStudentList/>} />
          <Route path='/create-student' element={<CreateStudent/>} />
          <Route path='/edit-student/:id' element={<UpdateStudentInfo/>} />
          <Route path='/show-student/:id' element={<ShowStudentDetails/>} />

        </Routes>
      </div>
    </Router>
      
    );
     }
}

export default App;
