import React, { Component } from 'react';
import axios  from 'axios';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Button from '@material-ui/core/Button';

import Login 			from './components/Login';
import Register 	from './components/Register';
import Home 			from './components/Home';
import Verification	from './components/Verification';

import SubmitPost from './components/SubmitPost';
import Footer 		from './components/Footer';

import logo 		from './images/logo.png';
import './css/App.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
  		loggedIn : false,
  		mainContent: 'Home'
   	};
	}

	componentDidMount() {
		if( !this.state.loggedIn ) {
			// If JWT is in localstorage, use it to refresh token
			if( localStorage.getItem('JWT') !== null ) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT');
			  axios.get(SERVER_ADDRESS+'/refresh')
				.then((response) => {
					this.handleLoggedIn(response.data.result.token);
				})
				.catch((error) => {
					localStorage.removeItem('JWT');
				});
			}
		}
	}

	handleChangeMainContent = (key) => {
		this.setState({
			mainContent: key
		});
	}

	handleLoggedIn = (JWT) => {
		// Store JWT
		localStorage.setItem('JWT', JWT);
		this.setState({
			loggedIn: true
		})
	};

	handleLogout = () => {
		// delete JWT
		localStorage.removeItem('JWT');
		this.setState({
			loggedIn: false
		})
	};

  render() {
  	var MainContent = null;
  	var NavbarMenu = null;

  	// Navbar when no user is logged in
  	NavbarMenu = 	<Nav pullRight>
							      <NavItem eventKey={1}>
							        <Register register={this.handleRegister} />
							      </NavItem>
							      <NavItem eventKey={2}>
							        <Login loggedIn={this.handleLoggedIn} />
							      </NavItem>
							    </Nav>;

		if(this.state.loggedIn) {
			NavbarMenu = 	<Nav pullRight>
								      <NavItem eventKey={1}>
      									<Button className="navbar-btn" onClick={() => this.handleChangeMainContent('NewPost')}>Post</Button>
								      </NavItem>
								      <NavItem eventKey={2}>
      									<Button className="navbar-btn" onClick={this.handleLogout}>Logout</Button> 
								      </NavItem>
								    </Nav>;
		}
		
		if ( this.state.mainContent === 'Home') {
			MainContent = <Router>
									    <div>
									      <Route exact path="/" component={Home} />
									      <Route exact path="/verification/:id" component={Verification} />
									    </div>
									  </Router>;
		} else if ( this.state.mainContent === 'NewPost') {
			MainContent = <SubmitPost returnHome={this.handleChangeMainContent} />;
		}

    return (
    	<div>
	      <div className="App">
					<Navbar className="main-nav" inverse collapseOnSelect>
					  <Navbar.Header>
					    <Navbar.Brand>
	      				<a href="/"><img className="logo" src={logo} alt="logo" /></a>	
	      			</Navbar.Brand>
					    <Navbar.Toggle />
					  </Navbar.Header>
					  <Navbar.Collapse>
					  	{NavbarMenu}
					  </Navbar.Collapse>
					</Navbar>
					{MainContent}
	      </div>
	      <Footer />
	    </div>
    );
  }
}

export default App;