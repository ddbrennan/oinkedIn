import React from "react";
import VideoChat from "./VideoChat"
import { API_ROOT, HEADERS } from '../constants';
import DisplayOnlyPig from './DisplayOnlyPig'



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
          let newNegX = (this.props.x - 4 > -4) ? (this.props.x - 4) : (this.props.x)
          return this.props.updatePig(this.props.id, newNegX, this.props.y, this.props.direction)
        case 40:
          e.preventDefault()
          let newPosX = (this.props.x + 4 < 80) ? (this.props.x + 4) : (this.props.x)
          return this.props.updatePig(this.props.id, newPosX, this.props.y, this.props.direction)
        case 37:
          e.preventDefault()
          let newNegY = (this.props.y - 4 > 0) ? (this.props.y - 4) : (this.props.y)
          return this.props.updatePig(this.props.id, this.props.x, newNegY, 1)
        case 39:
          e.preventDefault()
          let newPosY = (this.props.y + 4 < 80) ? (this.props.y + 4) : (this.props.y)
          return this.props.updatePig(this.props.id, this.props.x, newPosY, -1)
        case 8:
          const newMessage = this.state.message.substring(0, this.state.message.length - 1)
          this.setState({message: newMessage})
          break;
        case 13:
          this.props.sendMessage(this.state.message, this.props.pigPenPigId)
          this.setState({message: ""})
          setTimeout(() => this.props.sendMessage("", this.props.pigPenPigId), 3000)
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
    if (this.props.activePig && this.state.message) {
      return(
        <div className="piggy-thoughts" style={{"transform": `scaleX(${this.props.direction})`}}>
          <input type="text" value={this.state.message} style={{"zIndex":1000}}/>
        </div>
      )
    } else if (this.props.message) {
      return(
        <div className="piggy-thoughts" style={{"transform": `scaleX(${this.props.direction})`}}>
          <div class="chat-bubble">{this.props.message}</div>
        </div>
        )
    }
  }



  render() {
    console.log(this.props.message)
    return (
      <div className="body" style={{
          "top": `${this.props.x}%`,
          "left": `${this.props.y}%`,
          "zIndex": this.props.x,
          "transform": `scaleX(${this.props.direction})`
        }}>
        {this.renderPigMessage()}
        <DisplayOnlyPig fitness={this.props.pig.fitness}
          greased={this.props.pig.greased}
          color={this.props.pig.color} />
        <h3 className="name-display" style={{
            "transform": `scaleX(${this.props.direction})`
          }}
          >{this.props.pig.name}</h3>
      </div>
    )
  }
 }
export default Pig
