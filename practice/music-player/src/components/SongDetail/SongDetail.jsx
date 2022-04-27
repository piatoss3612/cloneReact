import "./SongDetail.scss";
import img1 from "../../images/music-1.jpg";
import { useSelector } from "react-redux";

const SongDetail = () => {
  const playList = useSelector((state) => state.playList);
  const playing = useSelector((state) => state.playing);
  const currentIndex = useSelector((state) => state.currentIndex);
  return (
    <>
      <div className="header">
        <span>{playing ? "Now Playing" : "Not Playing"}</span>
      </div>
      <div className="img-area">
        <img src={playList[currentIndex].img} alt="" />
      </div>
      <div className="music-info">
        <p className="song">{playList[currentIndex].name}</p>
        <p className="artist">{playList[currentIndex].artist}</p>
      </div>
    </>
  );
};

export default SongDetail;
