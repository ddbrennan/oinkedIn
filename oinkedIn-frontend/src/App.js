import React, { Component } from 'react';
import PigPen from './components/PigPen'
import Welcome from './components/Welcome'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/pen" component={PigPen} />
          <Route exact path="/" component={Welcome} />
        </div>
      </Router>
    );
  }
}

export default App;
