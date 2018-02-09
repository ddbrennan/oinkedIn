import React from "react";

class Shape extends React.Component {
  state = {
    x: this.props.x,
    y: this.props.y
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.moveSquare)
  }

  moveSquare = (e) => {
    if (this.props.activeShape) {
      console.log("props: ", this.props)
      switch(e.which) {
        case 87:

          this.props.updateShape(this.props.id, this.props.x - 10, this.props.y)

          // this.setState({x: this.state.x - 10})
          break;
        case 83:
          this.props.updateShape(this.props.id, this.props.x + 10, this.props.y)
          // this.setState({x: this.state.x + 10})
          break;
        case 65:
          this.props.updateShape(this.props.id, this.props.x, this.props.y - 10)
          // this.setState({y: this.state.y - 10})
          break;
        case 68:
          this.props.updateShape(this.props.id, this.props.x, this.props.y + 10)
          // this.setState({y: this.state.y + 10})
          break;
      }
    }
    // this.props.updateShape(this.props.id, this.state.x, this.state.y)
  }

  render() {
    // console.log(this.props)
    return (
      <div className="square" style={{
          "top": this.props.x,
          "left": this.props.y,
          "backgroundColor": this.props.color
        }}>
      </div>
    )
  }
 }
export default Shape
