import React from "react";

class Shape extends React.Component {

  componentDidMount = () => {
    window.addEventListener("keydown", this.moveSquare)
  }

  moveSquare = (e) => {
    if (this.props.activeShape) {
      switch(e.which) {
        case 87:

          this.props.updateShape(this.props.id, this.props.x - 10, this.props.y, this.props.direction)

          // this.setState({x: this.state.x - 10})
          break;
        case 83:
          this.props.updateShape(this.props.id, this.props.x + 10, this.props.y, this.props.direction)
          // this.setState({x: this.state.x + 10})
          break;
        case 65:
          this.props.updateShape(this.props.id, this.props.x, this.props.y - 10, 1)
          // this.setState({y: this.state.y - 10})
          break;
        case 68:
          this.props.updateShape(this.props.id, this.props.x, this.props.y + 10, -1)
          // this.setState({y: this.state.y + 10})
          break;
      }
    }
    // this.props.updateShape(this.props.id, this.state.x, this.state.y)
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
export default Shape
