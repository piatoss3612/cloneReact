import classNames from "classnames";
import { useSelector } from "react-redux";

const PlayListItem = ({ item, index }) => {
  const currentIndex = useSelector((state) => state.currentIndex);
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
        00:00
      </span>
    </>
  );
};

export default PlayListItem;
