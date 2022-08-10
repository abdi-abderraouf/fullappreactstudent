import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateStudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      inscription: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8080/students/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          name: res.data.name,
          email: res.data.email,
          inscription: res.data.inscription,
        })
      })
      .catch(err => {
        console.log("Error from UpdateInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      inscription: this.state.inscription
    };

    axios
      .put('http://localhost:8080/students/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-student/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateStudentInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Student List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Student</h1>
              <p className="lead text-center">
                  Update Student's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">name</label>
              <input
                type='text'
                placeholder='name of the student'
                name='name'
                className='form-control'
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <br />
            <div className='form-group'>
            <label htmlFor="author">email</label>
              <input
                type='text'
                placeholder='email'
                name='email'
                className='form-control'
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="inscription">inscription</label>
              <input
                type='number'
                placeholder='inscription of this student'
                name='inscription'
                className='form-control'
                value={this.state.inscription}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Student</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateStudentInfo;
