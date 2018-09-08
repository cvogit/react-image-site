import React, { Component } from 'react';
import axios  from 'axios';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ImageUpload from './ImageUpload';

import PostIcon from '../images/icon.png';
import '../css/Nav.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class SubmitPost extends Component {
	constructor(props) {
		super(props);
    this.state = {
      image_1: '',
  		image_2: '',
      title: '',
      drawer: false
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

  handlePostSubmit = () => {
    if( localStorage.getItem('JWT') !== null ) {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT');
      axios.post(SERVER_ADDRESS+'/posts', {
        image_1:  this.state.image_1,
        image_2:  this.state.image_2,
        title:    this.state.title
      })
      .then((response) => {
        this.childAppChangeHome();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  render() {
    const { fullScreen } = this.props;

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
      </div>
    );
  }
}

export default SubmitPost;