import "./styles/style.css";

import Player from "./components/Player";
import SongCard from "./components/SongCard";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [percentProgress, setPercentProgress] = useState(0);
  const [information, setInformation] = useState("Loading...");
  useEffect(() => {
    fetch("http://localhost:2000/get-song-list")
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setInformation(
            "Loaded 0 songs. Please put files into public/songs directory."
          );
        } else {
          setInformation(`Loaded ${res.length} songs`);
          setSongs(res);
          setCurrentSongIndex(0);
        }
      });
  }, []);

  return (
    <div className="app">
      <div className="songlist">
        <h1>{information}</h1>
        {songs?.map((song, index) => (
          <SongCard
            key={index}
            index={index}
            song={song}
            setCurrentSongIndex={setCurrentSongIndex}
            currentSongIndex={currentSongIndex}
            percentProgress={percentProgress}
          />
        ))}
      </div>
      <Player
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isLoading={isLoading}
        setPercentProgress={setPercentProgress}
      />
    </div>
  );
}

export default App;
