import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getDuration = (src) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const tempMin = parseInt(audio.duration / 60, 10);
      const tempSec = parseInt(audio.duration % 60);
      const minutes = tempMin > 9 ? tempMin : `0${tempMin}`;
      const seconds = tempSec > 9 ? tempSec : `0${tempSec}`;
      resolve(`${minutes}:${seconds}`);
    };
    audio.src = src;
  });
};

const PlayListItem = ({ item, index }) => {
  const [duration, setDuration] = useState("00:00");
  const currentIndex = useSelector((state) => state.currentIndex);

  useEffect(() => {
    const getTime = async () => {
      const itemDuration = await getDuration(item.src);
      setDuration(itemDuration);
    };

    getTime();
  }, [item.src]);

  return (
    <>
      <div className={classNames("row", { playing: currentIndex === index })}>
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span
        className={classNames("music-duration", {
          playing: currentIndex === index,
        })}
      >
        {duration}
      </span>
    </>
  );
};

export default PlayListItem;
