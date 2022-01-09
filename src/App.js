import {React,useState} from 'react';
import './style/app.scss';
import Player from './components/Player'
import Song from './components/Song'
import data from './data'

function App() {
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong}/>
    </div>
  );
}

export default App;
