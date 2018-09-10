import React, { Component } from 'react';
import axios  from 'axios';

import logo2 from '../images/logo-2.png';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Verification extends Component {
	constructor(props) {
		super(props);
    this.state = {
      message: ''
   	};
	}

  componentDidMount() {
  	axios.post(SERVER_ADDRESS+this.props.match.url)
    .then((response) => {
    	this.setState({
    		message: 'success'
    	})
    })
    .catch((error) => {
      console.log(error);
    });
  }

	render() {
		var message = "Please wait for verification.";

		if(this.state.message === 'success') {
			message = "Verification successful, enjoy DisoDat."
		}
    return (
      <div className="verification-container">
      	<img className="logo-2" alt="logo-2" src={logo2} />
      	<h4>{message}</h4>
      </div>
    );
  }
}

export default Verification;