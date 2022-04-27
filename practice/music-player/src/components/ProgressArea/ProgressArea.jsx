import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { playMusic, stopMusic } from "../../store/musicPlayerReducer";
import "./ProgressArea.scss";

import music1 from "../../music/music-1.mp3";

const ProgressArea = forwardRef((props, ref) => {
  const audio = useRef();
  const progressBar = useRef();
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
  }));

  const onPlay = () => {
    dispatch(playMusic());
  };

  const onPause = () => {
    dispatch(stopMusic());
  };

  const getTime = (time) => {
    const currentMin = parseInt(time / 60, 10);
    const currentSec = parseInt(time % 60);
    const minutes = currentMin > 9 ? currentMin : `0${currentMin}`;
    const seconds = currentSec > 9 ? currentSec : `0${currentSec}`;
    return `${minutes}:${seconds}`;
  };

  const onTimeUpdate = (event) => {
    if (event.target.readyState === 0) return;
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressBarWidth}%`;
    setCurrentTime(getTime(currentTime));
    setDuration(getTime(duration));
  };

  const onClickProgress = (event) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;
    const duration = audio.current.duration;

    console.log(progressBarWidth, offsetX, duration);
    audio.current.currentTime = (offsetX / progressBarWidth) * duration;
  };

  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          ref={audio}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          src={music1}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
});

export default ProgressArea;
