import React from "react";
import VideoChat from "./VideoChat"
import { API_ROOT, HEADERS } from '../constants';



class Pig extends React.Component {

  state = {
    message: ""
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.movePig)
    window.addEventListener("beforeunload", this.clearPig)
  }

  clearPig = () => {
    if (this.props.activePig){
      fetch(`${API_ROOT}/pig_pen_pigs/${this.props.pigPenPigId}`, {
        method: "DELETE",
        headers: HEADERS,
      })
    }
  }

  componentWillUnmount(){
    this.clearPig()
  }



  // updatePigStream = (stream) => {
  //   console.log("wuttup")
  //   const mediastream = window.URL.createObjectURL(stream)
  //   console.log(stream)
  //   console.log(mediastream)
  //
  //
  //   fetch(`${API_ROOT}/pigs/${this.props.id}`, {
  //     method: "PATCH",
  //     headers: HEADERS,
  //     body: JSON.stringify({
  //       "mediastream": mediastream
  //     })
  //   })
  //
  // }

  movePig = (e) => {
    if (this.props.activePig) {
      console.log(e.which)
      switch(e.which) {

        case 38:
          e.preventDefault()
          return this.props.updatePig(this.props.id, this.props.x - 10, this.props.y, this.props.direction)
          // this.setState({x: this.state.x - 10})
        case 40:
          e.preventDefault()
          return this.props.updatePig(this.props.id, this.props.x + 10, this.props.y, this.props.direction)
          // this.setState({x: this.state.x + 10})
        case 37:
          e.preventDefault()
          return this.props.updatePig(this.props.id, this.props.x, this.props.y - 10, 1)
          // this.setState({y: this.state.y - 10})
        case 39:
          e.preventDefault()
          return this.props.updatePig(this.props.id, this.props.x, this.props.y + 10, -1)
          // this.setState({y: this.state.y + 10})
        case 8:
          const newMessage = this.state.message.substring(0, this.state.message.length - 1)
          this.setState({message: newMessage})
          break;
        case 13:
          this.props.sendMessage(this.state.message, this.props.pigPenPigId)
          break;
        default:
          if (e.key.length === 1) {
            const newMessage = this.state.message + e.key.toUpperCase()
            this.setState({message: newMessage})
          }
      }
    }
  }


  renderPigMessage = () => {
    if (this.props.activePig){
      if (this.state.message) {
        return <textarea type="text" value={this.state.message} style={{"zIndex":1000}}/>
      }
    } else {
      return <div>{this.props.message}</div>
    }
  }



  render() {
    console.log(this.props.message)
    return (
      <div>
        <div className="body"style={{
            "top": this.props.x,
            "left": this.props.y,
            "zIndex": this.props.x,
            "transform": `scaleX(${this.props.direction})`
          }}>
          <div className="piggy-thoughts" style={{"transform": `scaleX(${this.props.direction})`}}>
            {this.renderPigMessage()}
          </div>
        	<div className="face">
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
      </div>
    )
  }
 }
export default Pig
