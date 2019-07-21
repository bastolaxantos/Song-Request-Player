import React from 'react';
import logo from './logo.svg';
import './App.css';
import SongRequest from './components/SongRequest'
import Player from './components/Player'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/song-request" component={SongRequest} />
        <Route path="/player" component={Player} />
      </Router>
    </div>
  );
}

export default App;
