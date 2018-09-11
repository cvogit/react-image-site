import React, { Component } from 'react';
import axios  from 'axios';

import Snackbar from '@material-ui/core/Snackbar';

import Image from './Image';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Post extends Component {
	constructor(props) {
		super(props);
    this.state = {
      image_1_votes: '',
      image_2_votes: '',
      votedFor: 0,
      snackbarOpen: false,
      snackbarMessage: ''
   	};

    this.handlePostVote = this.handlePostVote.bind(this);
	}

  componentDidMount() {
    this.setState({
      image_1_votes: this.props.post.image_1_votes,
      image_2_votes: this.props.post.image_2_votes
    });
  }

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

  handlePostVote(vote) {

    // Only cast the vote if the user is logged in
    if(localStorage.getItem('loggedIn') === 'true') {
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
      this.setState({
        votedFor: vote
      });

      if( localStorage.getItem('JWT') !== null ) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT');
        axios.put(SERVER_ADDRESS+'/posts/'+this.props.post.id+'/vote/'+vote)
        .then((response) => {
          
        })
        .catch((error) => {
          this.handleSnackbarMessage("Unable to vote, connection error");
          this.handleSnackbarOpen();
        });
      }
    } else {
      this.handleSnackbarMessage("Log in to vote on posts.");
      this.handleSnackbarOpen();
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

export default Post;