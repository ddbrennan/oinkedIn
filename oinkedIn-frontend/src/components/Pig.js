import React from "react";
import VideoChat from "./VideoChat"
import { API_ROOT, HEADERS } from '../constants';



class Pig extends React.Component {

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
  }



  render() {
    // console.log(this.props)
    return (

      <div className="body"style={{
          "top": this.props.x,
          "left": this.props.y,
          "zIndex": this.props.x,
          "transform": `scaleX(${this.props.direction})`
        }}>
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

    )
  }
 }
export default Pig
