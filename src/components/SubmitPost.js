import React, { Component } from 'react';
import axios  from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import ImageUpload from './ImageUpload';

import '../css/Nav.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class SubmitPost extends Component {
	constructor(props) {
		super(props);
    this.state = {
      image_1: '',
  		image_2: '',
      title: '',
      drawer: false,
      snackbarOpen: false,
      snackbarMessage: ''
   	};
	}

  handleSetFirstImage = (imageBinary) => {
    this.setState({ image_1: imageBinary });
  };

  handleSetSecondImage = (imageBinary) => {
    this.setState({ image_2: imageBinary });
  };

  handlePostTitleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  };

  childAppChangeHome = (vote) => {
    this.props.returnHome('Home');
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

  handlePostSubmit = () => {
    if( localStorage.getItem('JWT') !== null ) {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT');
      axios.post(SERVER_ADDRESS+'/posts', {
        image_1:  this.state.image_1,
        image_2:  this.state.image_2,
        title:    this.state.title
      })
      .then((response) => {
        this.handleSnackbarMessage("Post submitted.");
        this.handleSnackbarOpen();
        this.childAppChangeHome();
      })
      .catch((error) => {
        this.handleSnackbarMessage("Unable to submit post.");
        this.handleSnackbarOpen();
      });
    }
  };

  render() {

    return (
      <div className="submit-post-container">
        <div className="submit-post-sub">
          <TextField
            className="submit-post-text"
            label="Title"
            fullWidth
            onChange={this.handlePostTitleChange}
            inputProps={{ maxLength: 128 }}
          />
        </div>
        <div className="submit-post-main">
          <ImageUpload className="submit-post-image-container" setBinary={this.handleSetFirstImage} />
          <ImageUpload className="submit-post-image-container" setBinary={this.handleSetSecondImage} />
        </div>
        <div className="submit-post-sub">
          <Button className="submit-post-btn" onClick={this.handlePostSubmit}>Submit</Button>
        </div>
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

export default SubmitPost;