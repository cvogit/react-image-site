import React, { Component } from 'react';
import axios  from 'axios';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Verification extends Component {

	handleVerification = () => {
    axios.post(SERVER_ADDRESS+this.props.match.url)
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
  };

	render() {
    return (
      <div className="verification-container">
      	
      </div>
    );
  }
}

export default Verification;