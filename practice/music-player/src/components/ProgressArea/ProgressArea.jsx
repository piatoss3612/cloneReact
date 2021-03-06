import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  memo,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";
import "./ProgressArea.scss";

const ProgressArea = forwardRef((props, ref) => {
  const audio = useRef();
  const progressBar = useRef();
  const { playList, currentIndex, repeat } = useSelector(
    (state) => ({
      playList: state.playList,
      currentIndex: state.currentIndex,
      repeat: state.repeat,
    }),
    shallowEqual
  );
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
    resetDuration: () => {
      audio.current.currentTime = 0;
    },
  }));

  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);

  const onPause = useCallback(() => {
    dispatch(stopMusic());
  }, [dispatch]);

  const getTime = useCallback((time) => {
    const currentMin = parseInt(time / 60, 10);
    const currentSec = parseInt(time % 60);
    const minutes = currentMin > 9 ? currentMin : `0${currentMin}`;
    const seconds = currentSec > 9 ? currentSec : `0${currentSec}`;
    return `${minutes}:${seconds}`;
  }, []);

  const onTimeUpdate = useCallback(
    (event) => {
      if (event.target.readyState === 0) return;
      const currentTime = event.target.currentTime;
      const duration = event.target.duration;
      const progressBarWidth = (currentTime / duration) * 100;
      progressBar.current.style.width = `${progressBarWidth}%`;
      setCurrentTime(getTime(currentTime));
      setDuration(getTime(duration));
    },
    [getTime]
  );

  const onClickProgress = useCallback((event) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;
    const duration = audio.current.duration;
    audio.current.currentTime = (offsetX / progressBarWidth) * duration;
  }, []);

  const onMusicEnd = useCallback(() => {
    if (repeat === "ONE") {
      audio.current.currentTime = 0;
      audio.current.play();
      return;
    }
    dispatch(nextMusic());
  }, [repeat, dispatch]);

  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          ref={audio}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onMusicEnd}
          onTimeUpdate={onTimeUpdate}
          src={playList[currentIndex].src}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
});

export default memo(ProgressArea);
