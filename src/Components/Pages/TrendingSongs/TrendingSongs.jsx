import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import useFetchData from "../../hooks/useFetchData";

function TrendingSongs() {
  const dispatch = useDispatch();
  const { data, loading } = useFetchData("Trending songs");

  const handleSongClick = (item) => {
    dispatch(actions.setActiveSong(item));
  };
//rendering
  return (
    <>
      {loading ? (
        <Loader size="lg" />
      ) : (
        <div className="new-songs-section">
          <div className="new-songs-container">
            <h2>Trending Songs</h2>
            <div className="song-container-level-1">
              {data.map((item, index) => (
                <div
                  key={item.key || index}
                  className="music-card"
                  onClick={() => handleSongClick(item)}
                >
                  <BsPlayCircle className="play-icon" />
                  <img className="songs-image" src={item.url} alt="img" />
                  <p className="song-details">
                    <span className="song-name">{item.name}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="divide-line"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrendingSongs;
