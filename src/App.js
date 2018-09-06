import React, { Component } from 'react';
import axios  from 'axios';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

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
  		mainContent: 'home'
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
		
		if ( this.state.mainContent === 'home') {
			MainContent = <div />;
		} else if ( this.state.mainContent === 'NewPost') {
			MainContent = <SubmitPost />;
		}

    return (
      <div className="App">
				<Navbar className="main-nav" absolute inverse collapseOnSelect>
				  <Navbar.Header>
				    <Navbar.Brand>
				      <a href="#brand">React-Bootstrap</a>
				    </Navbar.Brand>
				    <Navbar.Toggle />
				  </Navbar.Header>
				  <Navbar.Collapse>
				  	{NavbarMenu}
				  </Navbar.Collapse>
				</Navbar>
				{MainContent}
      </div>
    );
  }
}

export default App;