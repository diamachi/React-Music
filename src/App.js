import React from 'react'
import './style/app.scss';
import Player from './components/Player'
import Song from './components/Song'

function App() {
  return (
    <div className="App">
      <Song />
      <Player/>
    </div>
  );
}

export default App;
