import React from "react";
import LoggedIn from "../hoc/LoggedIn"
import DisplayOnlyPig from "./DisplayOnlyPig"
import ColorPicker from "./ColorPicker"
import FitnessPicker from "./FitnessPicker"


class HogWash extends React.Component {
  state = {
    color: this.props.userPig.color,
    greased: this.props.userPig.greased,
    fitness: this.props.userPig.fitness
  }

  returnToLobby = (e) => {
    this.props.routerProps.history.push("/lobby")
  }

  handleColorChoice = (colorHash) => {
    this.setState({color: Object.values(colorHash)[0]})
  }

  handleFitnessChoice = (e) => {
    this.setState({fitness: parseInt(e.target.value)})
  }

  handleGreasedChoice = (e) => {
    const greased = !this.state.greased
    this.setState({greased: greased})
  }

  revertPig = () => {
    this.setState({
      color: this.props.userPig.color,
      greased: this.props.userPig.greased,
      fitness: this.props.userPig.fitness
    })
  }


  render() {
    return (
      <div id="hog-wash">
        <div id="exit-pig-pen" onClick={this.returnToLobby}>
          Return to Lobby
        </div>
        <DisplayOnlyPig color={this.state.color} greased={this.state.greased} fitness={this.state.fitness} />
        <ColorPicker color={this.state.color} handleColorChoice={this.handleColorChoice}/>
        <FitnessPicker fitness={this.state.fitness} handleFitnessChoice={this.handleFitnessChoice}/>
        <label>Greased?
        <input id="greased" type="checkbox" checked={this.state.greased} onChange={this.handleGreasedChoice}/></label>
        <div className="update-pig-button" onClick={()=> this.props.updateUserPig(this.state) }>
          Save Pig
        </div>
        <div className="update-pig-button" onClick={this.revertPig}>
          Revert Pig
        </div>
      </div>
    )
  }
}
export default LoggedIn(HogWash)
