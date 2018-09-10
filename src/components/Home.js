import React, { Component } from 'react';
import axios  from 'axios';

import Pagination from "react-js-pagination";

import Post       from './Post';

import '../css/Nav.css';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Home extends Component {
	constructor(props) {
		super(props);
    this.state = {
      posts:    [],
      finished: false,
      currentPage: 1,
      perPageItem: 0,
      totalItem:   0,
   	};
	}

  componentDidMount() {
    // Fetch most recent posts
    axios.get(SERVER_ADDRESS+'/posts')
    .then((response) => {
      this.handlePostLoading(response.data.result.posts);
    })
    .catch((error) => {
      // TODO display error
    });
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber
    });

    axios.get(SERVER_ADDRESS+'/posts?page='+pageNumber)
    .then((response) => {
      this.handlePostLoading(response.data.result.posts);
    })
    .catch((error) => {
      // TODO display error
    });
  };

  handlePostLoading = (posts) => {
    this.setState({
      posts:        posts.data,
      currentPage:  posts.current_page,
      totalItem:    posts.total
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  render() {
    var Posts = this.state.posts.map(function(post, i){
                  return <Post post={post} key={i} />
                });

    return (
      <div className="posts-container">
        <div className="posts">
          {Posts}
        </div>
        <Pagination
          activePage={this.state.currentPage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.totalItem}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Home;