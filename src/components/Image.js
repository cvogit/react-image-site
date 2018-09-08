import React, { Component } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';

const SERVER_ADDRESS = process.env.REACT_APP_TEST_VAR;

class Image extends Component {

  childPostVote = (vote) => {
    this.props.handleVote(vote);
  };

  render() {

    return (
      <div className="post-content-sub">
        <ButtonBase className="post-vote-button" onClick={() => this.childPostVote(this.props.voteId)} >
          <img className="post-image" src={SERVER_ADDRESS+'/images/'+this.props.source} />
        </ButtonBase>
      </div>
    );
  }
}

export default Image;