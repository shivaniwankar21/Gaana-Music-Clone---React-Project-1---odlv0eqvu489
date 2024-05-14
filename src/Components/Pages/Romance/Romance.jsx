
import React, { useState, useEffect, useRef } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import useFetchData from "../../hooks/useFetchData";

function Romance() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // const limit=10
  const { data, loading } = useFetchData("romantic", page);
  const loaderRef = useRef(null);

  const handleSongClick = (item) => {
    dispatch(actions.setActiveSong(item));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef.current]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div className="new-songs-section" style={{ backgroundColor: "violet" }}>
        <div className="new-songs-container">
          <h2>Romantic Songs</h2>
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
            <div ref={loaderRef}>
              {loading && <Loader size="lg" />}
            </div>
          </div>
          <div className="divide-line"></div>
        </div>
      </div>
    </>
  );
}

export default Romance;
