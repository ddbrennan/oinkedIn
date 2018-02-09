import React from "react";

class VideoChat extends React.Component {

  state = { stream: ""}

  componentDidMount = () => {
    console.log(this.props)

    if (this.props.activeShape){
      // console.log('success')
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(this.props.updateShapeStream)
        .catch(this.handleMediaError)
    }
  }



  handleMediaError = (err) => {
    console.log(err)
    alert("bummer!")
  }

  render() {
    return (
      <video className="video-chat" src={this.props.source} autoPlay="true">
      </video>
    )
  }
  }
export default VideoChat
