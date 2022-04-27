import { useRef, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { playMusic, stopMusic } from "../../store/musicPlayerReducer";
import "./ProgressArea.scss";

import music1 from "../../music/music-1.mp3";

const ProgressArea = forwardRef((props, ref) => {
  const audio = useRef();
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
  }));

  const onPlay = () => {
    dispatch(playMusic());
  };

  const onPause = () => {
    dispatch(stopMusic());
  };

  return (
    <div className="progress-area">
      <div className="progress-bar">
        <audio
          autoPlay
          ref={audio}
          onPlay={onPlay}
          onPause={onPause}
          src={music1}
        ></audio>
      </div>
      <div className="music-timer">
        <span>00:00</span>
        <span>00:00</span>
      </div>
    </div>
  );
});

export default ProgressArea;
