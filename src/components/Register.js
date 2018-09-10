import React, { Component } from 'react';
import axios  from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import '../css/Nav.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Register extends Component {
	constructor(props) {
		super(props);
    this.state = {
  		email: '',
  		password: '',
      password_confirmation: '',
    	open: false,
      snackbarOpen: false,
      snackbarMessage: ''
   	};
	}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true 
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false 
    });
  };

  handleSnackbarMessage = (message) => {
    console.log(message);
    this.setState({
      snackbarMessage: message
    });
  };

  handleRegister = () => {
    this.handleClose(); 
    
    axios.post(SERVER_ADDRESS+'/register', { 
      email:                  this.state.email,
      password:               this.state.password,
      password_confirmation:  this.state.password_confirmation,
    })
    .then((response) => {
      this.handleClose();
      this.handleSnackbarMessage(response.data.message);
      this.handleSnackbarOpen();
    })
    .catch((error) => {
      this.handleSnackbarMessage("Server unavailable or email is already signed up with.");
      this.handleSnackbarOpen();
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

  handlePasswordConfirmationChange = (event) => {
    this.setState({
      password_confirmation: event.target.value
    });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div className="login-container">
        <Button className="navbar-btn" onClick={this.handleClickOpen}>Register</Button>
        <Dialog
          className="navbar-dialog"
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Register</DialogTitle>
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
              <TextField
                id="password-confirmation"
                label="Retype password"
                className="navbar-dialog-input"
                type="password"
                fullWidth
                margin="normal"
                onChange={this.handlePasswordConfirmationChange}
              />
            </DialogContentText>
            <Button className="dialog-btn" onClick={this.handleRegister}>Submit</Button>
          </DialogContent>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          message={<h5>{this.state.snackbarMessage}</h5>}
        />
      </div>
    );
  }
}

export default Register;
