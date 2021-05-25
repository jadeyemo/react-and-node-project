import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from './components/Button';
import Persons from './components/Persons';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      first_name: '',
      last_name: '',
    };
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { id, first_name, last_name } = this.state;

    const person = {
      id,
      first_name,
      last_name,
    };

    axios
      .post('http://192.168.31.1:5000/create', person)
      .then(() => console.log('Person Added!'))
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return(
      <Router>
        <div>
        <br />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="id"
                placeholder="ID"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="First Name"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Last Name"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
          <Link to={'/persons'} className="nav-link"> <Button color='blue' text='View persons' /> </Link>
          <Switch>
              <Route path='/persons' component={Persons} />
          </Switch>
        </div>
        </Router>
    );
  }
}

export default App;
