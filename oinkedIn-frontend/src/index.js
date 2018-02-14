import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import './stylesheets/index.css';
import './stylesheets/pig.css';
import './stylesheets/pen.css';
import './stylesheets/lobby.css';
import './stylesheets/welcome.css';
import './stylesheets/hogwash.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { API_WS_ROOT } from './constants';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Router>
      <App />
    </Router>
  </ActionCableProvider>, document.getElementById('root'));
registerServiceWorker();
