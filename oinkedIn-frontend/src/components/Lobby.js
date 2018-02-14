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
      pigPens: [],
      newPen: {name: "", description: ""}
    }
  }

  componentDidMount = () => {
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

  moveThatPiggy = () => {
    console.log('wuttup')
  }

  handleInputChange = (e) => {
    const newPen = this.state.newPen
    this.setState({
      newPen: {...newPen, [e.target.name]: e.target.value}
    })
  }

  createNewPigPen = (e) => {
    e.preventDefault()
    const newPen = {id: Date.now(), name: this.state.newPen.name, description: this.state.newPen.description}
    fetch(`${API_ROOT}/pig_pens`,{
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newPen)
    }).then(r => this.handlePigPenChoice(newPen))
  }


  render() {
    return (
      <div className="lobby">
        <div className="lobby-pig-info">
          <div className="display-pig-wrapper">
        {this.props.userPig && <DisplayOnlyPig className="lobby-pig"
          color={this.props.userPig.color}
          greased={this.props.userPig.greased}
          fitness={this.props.userPig.fitness}
          />}
          </div>
        <button className="hogwash-button" onClick={this.headToHogwash}>Head to the Hogwash!</button>
        </div>
        <div id="pig-pen-list">
          <ActionCable
           channel={{ channel: 'PigPensChannel' }}
           onReceived={this.handleReceivedPigPen}
           />
         <form id="new-pig-pen-form" onSubmit={this.createNewPigPen}>
             <input type="text" value={this.state.newPen.name} name="name" placeholder="Name" onChange={this.handleInputChange}/>
             <input type="text" value={this.state.newPen.description} name="description" placeholder="Description" onChange={this.handleInputChange}/>
             <input className="submit" type="submit" value="Create Pig Pen"/>
           </form>
         {this.state.pigPens.map(pP => <PigPenItem key={pP.id} handlePigPenChoice={this.props.handlePigPenChoice} pigPen={pP}/>)}

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
