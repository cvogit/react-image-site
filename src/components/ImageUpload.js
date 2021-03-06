import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: null
    };
  }

  handleImageUpload = (accepted, rejected) => {
    var file = accepted[0]

    // Show the preview image through state
    this.setState({
      imagePreviewUrl: file.preview
    });

    // Read the image binary data and send it to parent
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.setBinary(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  render() {

    return (
      <div className="submit-post-image-container">
        <Dropzone
        accept="image/jpeg, image/png"
        onDrop={this.handleImageUpload.bind(this)}
        >
        <img alt="upload" className="image-preview" src={this.state.imagePreviewUrl} />
        </Dropzone>
      </div>
    );
  }
}

export default ImageUpload;
