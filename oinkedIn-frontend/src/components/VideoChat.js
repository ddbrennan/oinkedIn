import React from "react";

class VideoChat extends React.Component {

  state = { stream: ""}

  componentDidMount = () => {
    console.log("mounted", this.props)

    if (this.props.activePig){
      // console.log('success')
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(this.props.updatePigStream)
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
