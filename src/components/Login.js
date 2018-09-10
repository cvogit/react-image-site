import React, { Component } from 'react';
import axios  from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import '../css/Nav.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Login extends Component {
	constructor(props) {
		super(props);
    this.state = {
  		email: '',
  		password: '',
    	open: false
   	};
	}

  componentWillUnmount() {
    this.setState({
      open: false
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin  = () => {
    axios.get(SERVER_ADDRESS+'/login', {
      params: {
        email:                  this.state.email,
        password:               this.state.password,
      }
    })
    .then((response) => {
      this.props.loggedIn(response.data.result.token);
      this.handleClose(); 
    })
    .catch((error) => {
      console.log(error.response);
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div className="login-container">
        <Button className="navbar-btn" onClick={this.handleClickOpen}>Login</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                id="email-input"
                label="Email"
                className="navbar-dialog-input"
                type="email"
                margin="normal"
                fullWidth
                onChange={this.handleEmailChange}
              />
              <TextField
                id="password-input"
                label="Password"
                className="navbar-dialog-input"
                type="password"
                fullWidth
                margin="normal"
                onChange={this.handlePasswordChange} 
              />
            </DialogContentText>
            <Button className="dialog-btn" onClick={this.handleLogin}>Submit</Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Login;
