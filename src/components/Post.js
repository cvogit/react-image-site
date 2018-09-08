import React, { Component } from 'react';
import axios  from 'axios';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Image from './Image';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Post extends Component {
	constructor(props) {
		super(props);
    this.state = {
      image_1_votes: '',
      image_2_votes: '',
      votedFor: 0
   	};

    this.handlePostVote = this.handlePostVote.bind(this);
	}

  componentDidMount() {
    this.setState({
      image_1_votes: this.props.post.image_1_votes,
      image_2_votes: this.props.post.image_2_votes
    });
  }

  handlePostVote(vote) {
    if(localStorage.getItem('loggedIn')) {
      if(this.state.votedFor === 0) {
        if(vote === 1) {
          this.setState({
            image_1_votes: this.state.image_1_votes + 1
          });
        } else {
          this.setState({
            image_2_votes: this.state.image_2_votes + 1
          });
        }
      } else {
        if( this.state.votedFor !== vote) {
          if(vote === 1) {
            this.setState({
              image_1_votes: this.state.image_1_votes + 1,
              image_2_votes: this.state.image_2_votes - 1
            });
          } else {
            this.setState({
              image_1_votes: this.state.image_1_votes - 1,
              image_2_votes: this.state.image_2_votes + 1
            });
          }
        }
      }
    }
    
    this.setState({
      votedFor: vote
    });

    if( localStorage.getItem('JWT') !== null ) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT');
      axios.put(SERVER_ADDRESS+'/posts/'+this.props.post.id+'/vote/'+vote)
      .then((response) => {
      })
      .catch((error) => {
      });
    }
  }

  render() {
    
    var renderVotes = <div className="post-vote-container">
                        <div className="post-votes">
                          {this.state.image_1_votes}
                        </div>
                        <div className="post-votes">
                          {this.state.image_2_votes}
                        </div>
                      </div>;
    // Change the vote text color depending on which image is voted higher
    if(this.state.image_1_votes > this.state.image_2_votes) {
      console.log("ok");
      renderVotes =   <div className="post-vote-container">
                        <div className="post-votes green-font">
                          {this.state.image_1_votes}
                        </div>
                        <div className="post-votes red-font">
                          {this.state.image_2_votes}
                        </div>
                      </div>;
    } else if(this.state.image_1_votes < this.state.image_2_votes) {
      renderVotes =   <div className="post-vote-container">
                        <div className="post-votes red-font">
                          {this.state.image_1_votes}
                        </div>
                        <div className="post-votes green-font">
                          {this.state.image_2_votes}
                        </div>
                      </div>;
    }

    return (
      <div className="post">
        <h2 className="post-title">{this.props.post.title}</h2>
        <div className="post-image-container">
          <Image voteId={1} source={this.props.post.image_1_id} handleVote={this.handlePostVote} />
          <Image voteId={2} source={this.props.post.image_2_id} handleVote={this.handlePostVote} />
        </div>
        {renderVotes}
      </div>
    );
  }
}

export default Post;