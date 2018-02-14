import React, { Component } from 'react';
import PigPen from './components/PigPen'
import Lobby from './components/Lobby'
import HogWash from './components/HogWash'
import Welcome from './components/Welcome'
import { API_ROOT, HEADERS } from './constants';

import { Route, withRouter } from 'react-router-dom'

class App extends Component {
  state = {
    userPig: undefined,
    pigPen: undefined
  }

  setUserPig = (name) => {
    fetch(`${API_ROOT}/pigs`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        name: name
      })
    })
    .then(res => res.json())
    .then(pig => {console.log(pig); return pig})
    .then(pig => this.setState({userPig: pig}))
    .then(r => this.props.history.push("/lobby"))
  }

  updateUserPig = (pig) => {
    // console.log("updating", this.state.userPig.id)
    fetch(`${API_ROOT}/pigs/${this.state.userPig.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ pig })
    }).then(res => res.json())
    .then(pig => this.setState({userPig: pig}))
  }

  handlePigPenChoice = (pigPen) => {
    this.setState({
      pigPen: pigPen
    })
    fetch(`${API_ROOT}/pig_pen_pigs`,{
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        pig_id: this.state.userPig.id, // replace this, please
        pig_pen_id: pigPen.id,
        direction: 1,
        x_coord: 36,
        y_coord: 36
      })
    }).then(r => this.props.history.push(`/pigpen/${pigPen.id}`))
  }

  render() {
    return (
        <div className="App">
          <Route path="/lobby" render={props => <Lobby routerProps={props} handlePigPenChoice={this.handlePigPenChoice} userPig={this.state.userPig}/>} />
          <Route path="/hogwash" render={props => <HogWash routerProps={props} userPig={this.state.userPig} updateUserPig={this.updateUserPig}/>} />
          <Route path="/pigpen/:id" render={props => <PigPen routerProps={props} pigPen={this.state.pigPen} userPig={this.state.userPig}/>} />
          <Route exact path="/" render={props => <Welcome setUserPig={this.setUserPig}/>} />
        </div>
    );
  }
}

export default withRouter(App);
