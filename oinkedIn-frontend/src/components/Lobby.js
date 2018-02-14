import React from "react";
import Pig from "./Pig"
import PigPenItem from "./PigPenItem"
import { API_ROOT, HEADERS } from '../constants';
import { ActionCable } from 'react-actioncable-provider';
import { withRouter } from 'react-router-dom'
import LoggedIn from "../hoc/LoggedIn"
import DisplayOnlyPig from "./DisplayOnlyPig"


class Lobby extends React.Component {
  constructor(props){
    super(props)
    if (!this.props.userPig){
      props.history.push("/")
    }
    this.state = {
      pigPens: []
    }
  }

  componentDidMount = () => {
    console.log("hello!")
    fetch(`${API_ROOT}/pig_pens`)
      .then(res => res.json())
      .then(pigpens => this.setState({ pigPens: pigpens }))

  }


  headToHogwash = (e) => {
    this.props.routerProps.history.push("/hogwash")
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
        pig_id: this.props.userPig.id, // replace this, please
        pig_pen_id: pigPen.id,
        direction: 1,
        x_coord: 250,
        y_coord: 250
      })
    }).then(console.log).then(r => this.props.history.push(`/pigpen/${pigPen.id}`))
  }

  moveThatPiggy = () => {
    console.log('wuttup')
  }


  render() {
    return (
      <div className="lobby">
        {this.props.userPig && <DisplayOnlyPig className="lobby-pig"
          color={this.props.userPig.color}
          greased={this.props.userPig.greased}
          fitness={this.props.userPig.fitness}
          />}
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

export default LoggedIn(withRouter(Lobby))

// <ActionCable
// channel={{ channel: 'PigsChannel' }}
// onReceived={this.handleReceivedPig}
// />
// ?
