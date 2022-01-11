import {React,useState,useRef} from 'react';
import './style/app.scss';
import Player from './components/Player'
import Song from './components/Song'
import data from './data'
import Library from './components/Library'

function App() {
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false); 
  const audioRef = useRef(null);
  
  const [songInfo,setSongInfo] =useState({
    currentTime:0, 
    duration:0
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo,currentTime:current,duration});
  }





  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player setIsPlaying={setIsPlaying} setSongInfo={setSongInfo}  songInfo={songInfo} isPlaying={isPlaying} currentSong={currentSong} audioRef={audioRef} />
      <Library setSongs={setSongs} isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} />

      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
