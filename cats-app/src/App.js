import React, { Component } from 'react';
import './App.css';
import CatContainer from './CatContainer/catContainer.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CatContainer />
      </div>
    );
  }
}

export default App;
