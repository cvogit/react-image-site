import React, { Component } from 'react';
import axios  from 'axios';

import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import Login 			from './components/Login';
import Register 	from './components/Register';
import SubmitPost from './components/SubmitPost';

import './css/App.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;
const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
  		loggedIn : false,
   	};
   	this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		if( !this.state.loggedIn ) {
			// If JWT is in localstorage, use it to refresh token
			if( localStorage.getItem('JWT') !== null ) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT');
			  axios.get(SERVER_ADDRESS+'/refresh')
				.then(function (response) {
					console.log(response.data);
					//localStorage.setItem('JWT', response.data);
				})
				.catch(function (error) {
					localStorage.removeItem('JWT');
				});
			} else {
				
			}
		}
	}

	handleLogin(JWT) {
		// Store JWT
		localStorage.setItem('JWT', JWT);
		this.setState({
			loggedIn: true
		})
	}

  render() {
  	var LoginRender = null;
  	

    return (
      <div className="App">
				<Navbar inverse collapseOnSelect>
				  <Navbar.Header>
				    <Navbar.Brand>
				      <a href="#brand">React-Bootstrap</a>
				    </Navbar.Brand>
				    <Navbar.Toggle />
				  </Navbar.Header>
				  <Navbar.Collapse>
				    <Nav pullRight>
				      <NavItem eventKey={1}>
				        <Login login={this.handleLogin} />
				      </NavItem>
				      <NavItem eventKey={2}>
				        <Register register={this.handleRegister} />
				      </NavItem>
				      <NavItem eventKey={3}>
				        <SubmitPost register={this.handleRegister} />
				      </NavItem>
				    </Nav>
				  </Navbar.Collapse>
				</Navbar>
      </div>
    );
  }
}

export default App;