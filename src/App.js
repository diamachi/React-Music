import {React,useState,useRef} from 'react';
import './style/app.scss';
import Player from './components/Player'
import Song from './components/Song'
import data from './data'
import Library from './components/Library'
import Nav from './components/Nav';

function App() {
  //states
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [libraryStatus,setLibraryStatus] = useState(false);
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

  const songEndedHandler= async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1)% songs.length]);
      if(isPlaying) audioRef.current.play();
  }





  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setIsPlaying={setIsPlaying} setSongInfo={setSongInfo}  songInfo={songInfo} isPlaying={isPlaying} currentSong={currentSong} audioRef={audioRef} />
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} />

      <audio onEnded={songEndedHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
