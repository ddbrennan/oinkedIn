import React from "react";
import VideoChat from "./VideoChat"
import { API_ROOT, HEADERS } from '../constants';
import Post from '../images/Post'
import JackedPigGreased from '../images/Piggies/JackedPigGreased'
import JackedPigUngreased from '../images/Piggies/JackedPigUngreased'
import FatPigGreased from '../images/Piggies/FatPigGreased'
import FatPigUngreased from '../images/Piggies/FatPigUngreased'
import RegularPigGreased from '../images/Piggies/RegularPigGreased'
import RegularPigUngreased from '../images/Piggies/RegularPigUngreased'
import PigHead from '../images/Piggies/PigHead'
import Snoot from '../images/Piggies/Snoot'


class DisplayOnlyPig extends React.Component {

  findDisplay = () => {
    if (this.props.greased) {
    switch(this.props.fitness) {
      case 0:
        return <FatPigGreased color={this.props.color}/>
      case 1:
        return <RegularPigGreased color={this.props.color}/>
      case 2:
        return <JackedPigGreased color={this.props.color}/>
    }
  } else {
    switch(this.props.fitness) {
      case 0:
        return <FatPigUngreased color={this.props.color}/>
      case 1:
        return <RegularPigUngreased color={this.props.color}/>
      case 2:
        return <JackedPigUngreased color={this.props.color}/>
      }
    }
  }


  render() {
    return (
      <div className="body-display">
        <div className="pig-body">
          { this.findDisplay() }
        </div>
        <div className="pig-head">
          <PigHead color={ this.props.color }/>
        </div>
        <div className="snoot">
          <Snoot />
        </div>
      </div>
    )
  }
}
export default DisplayOnlyPig
