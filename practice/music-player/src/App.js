import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgressArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useState, useRef } from "react";

const App = () => {
  const audioRef = useRef();
  const [showPlayList, setShowPlayList] = useState(false);

  const onPlay = () => {
    audioRef.current.play();
  };
  const onPuase = () => {
    audioRef.current.pause();
  };

  const onChangeVolume = (volume) => {
    audioRef.current.changeVolume(volume);
  };

  const resetDuration = () => {
    audioRef.current.resetDuration();
  };

  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          play={onPlay}
          pause={onPuase}
          changeVolume={onChangeVolume}
          resetDuration={resetDuration}
          setShowPlayList={setShowPlayList}
        />
        <PlayList
          showPlayList={showPlayList}
          setShowPlayList={setShowPlayList}
        />
      </div>
    </div>
  );
};

export default App;
