import React from "react";
import VideoChat from "./VideoChat"
import { API_ROOT, HEADERS } from '../constants';



class Pig extends React.Component {


  componentDidMount = () => {
    this.connectToRTC()
    window.addEventListener("keydown", this.moveSquare)
  }

  connectToRTC = () => {
    this.props.peerConnection.createOffer().then(function(offer) {
      return this.props.peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    }).then(this.props.sendLocalDescription)
  }



  updatePigStream = (stream) => {
    console.log("wuttup")
    const mediastream = window.URL.createObjectURL(stream)
    console.log(stream)
    console.log(mediastream)


    fetch(`${API_ROOT}/pigs/${this.props.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        "mediastream": mediastream
      })
    })

  }

  moveSquare = (e) => {
    if (this.props.activePig) {
      switch(e.which) {
        case 87:

          return this.props.updatePig(this.props.id, this.props.x - 10, this.props.y, this.props.direction)

          // this.setState({x: this.state.x - 10})
        case 83:
          return this.props.updatePig(this.props.id, this.props.x + 10, this.props.y, this.props.direction)
          // this.setState({x: this.state.x + 10})
        case 65:
          return this.props.updatePig(this.props.id, this.props.x, this.props.y - 10, 1)
          // this.setState({y: this.state.y - 10})
        case 68:
          return this.props.updatePig(this.props.id, this.props.x, this.props.y + 10, -1)
          // this.setState({y: this.state.y + 10})
      }
    }
    // this.props.updatePig(this.props.id, this.state.x, this.state.y)
  }

  componentWillUnmount(){
    fetch(`${API_ROOT}/pigs/${this.props.id}`, {
      method: "DELETE",
      headers: HEADERS
    })
  }

  renderEyes(){
    if (this.props.mediastream) {
      return null
    } else {
      return <div className="eyes"></div>
    }
  }

  render() {
    // console.log(this.props)
    return (

      <div className="body"style={{
          "top": this.props.x,
          "left": this.props.y,
          "transform": `scaleX(${this.props.direction})`
        }}>
      	<div className="face">
          <div className="video-chat-container">
            <VideoChat activePig={this.props.activePig} source={this.props.source} updatePigStream={this.updatePigStream}/>
          </div>
      		<div className="left_ear"></div>
      		<div className="right_ear"></div>
      		<div className="eyes"></div>
      		<div className="nose"></div>
      	</div>
      	<div className="stomach">
      		<div className="left_leg"></div>
      		<div className="right_leg"></div>
      	</div>
      	<div className="tail"></div>
      </div>

    )
  }
 }
export default Pig
