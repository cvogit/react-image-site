import React, { Component } from 'react';
import axios  from 'axios';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Post     from './Post';

import '../css/Nav.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Home extends Component {
	constructor(props) {
		super(props);
    this.state = {
      posts:    [],
      finsihed: false
   	};
	}

  componentDidMount() {

    // Fetch most recent posts
    axios.get(SERVER_ADDRESS+'/posts')
    .then((response) => {
      this.handlePostLoading(response.data.result.posts, response.data.result.end);
    })
    .catch((error) => {
      // TODO display error
    });
  }

  handlePostLoading = (posts, isLast) => {
    console.log(posts);
    this.setState({
      posts:    posts,
      finished: isLast
    });
  };

  render() {

    var Posts = this.state.posts.map(function(post, i){
                  return <Post post={post} key={i} />
                });

    return (
      <div className="posts-container">
        {Posts}
      </div>
    );
  }
}

export default Home;