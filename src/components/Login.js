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

class Login extends Component {
	constructor(props) {
		super(props);
    this.state = {
  		email: '',
  		password: '',
    	open: false,
      snackbarOpen: false,
      snackbarMessage: ''
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
    this.setState({
      snackbarMessage: message
    });
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
      this.handleSnackbarMessage("Logged in.");
      this.handleSnackbarOpen();
    })
    .catch((error) => {
      this.handleSnackbarMessage("Cannot log in. If the email is signed up with check your email for verification.");
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

export default Login;
