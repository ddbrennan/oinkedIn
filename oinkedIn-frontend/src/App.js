import React, { Component } from 'react';
import PigPen from './components/PigPen'
import Lobby from './components/Lobby'
import Welcome from './components/Welcome'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  state = {
    userPig: {id: 1, name: "david"}
  }

  setUserPig = (e) => {
    console.log("boi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoi-yoing")
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/lobby" render={props => <Lobby userPig={this.state.userPig}/>} />
          <Route path="/pigpen/:id" render={props => <PigPen routerProps={props} userPig={this.state.userPig}/>} />
          <Route exact path="/" render={props => <Welcome setUserPig={this.setUserPig}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
