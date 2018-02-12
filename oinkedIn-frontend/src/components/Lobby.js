import React from "react";
import Pig from "./Pig"
import PigPenItem from "./PigPenItem"
import { API_ROOT, HEADERS } from '../constants';
import { ActionCable } from 'react-actioncable-provider';
import { withRouter } from 'react-router-dom'


class Lobby extends React.Component {
  state = {
    pigPens: []
  }

  componentDidMount = () => {
    console.log("hello!")
    fetch(`${API_ROOT}/pig_pens`)
      .then(res => res.json())
      .then(pigpens => this.setState({ pigPens: pigpens }))

  }


  headToHogwash = (e) => {
    console.log("clicked!")
  }

  handleReceivedPigPen = response => {
    const {pig_pen} = response
    const newPigPens = [...this.state.pigPens, pig_pen]
    this.setState({
      pigPens: newPigPens
    })
  };

  handlePigPenChoice = (pigPen) => {
    fetch(`${API_ROOT}/pig_pen_pigs`,{
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        pig_id: 1, // replace this, please
        pig_pen_id: pigPen.id,
        direction: 1,
        x_coord: 250,
        y_coord: 250
      })
    }).then(r => this.props.history.push(`/pigpen/${pigPen.id}`))


  }


  render() {
    return (
      <div className="lobby">
        {this.state.userPig && <Pig className="lobby-pig" pig={this.state.userPig}/>}
        <button onClick={this.headToHogwash}>Head to the Hogwash!</button>
        <div id="pig-pen-list">
          <ActionCable
           channel={{ channel: 'PigPensChannel' }}
           onReceived={this.handleReceivedPigPen}
           />
         {this.state.pigPens.map(pP => <PigPenItem key={pP.id} handlePigPenChoice={this.handlePigPenChoice} pigPen={pP}/>)}
         <button>Create PigPen</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Lobby)

// <ActionCable
// channel={{ channel: 'PigsChannel' }}
// onReceived={this.handleReceivedPig}
// />
// ?
