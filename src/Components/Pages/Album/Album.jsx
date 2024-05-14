//done
import React, { useState, useEffect } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import { fetchAlbum } from "../../FetchingApis/fetching";

function Album() {
  const [data, setData] = useState([]);
  const [renderCard, setRenderCard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumData = await fetchAlbum();
        const result = albumData.map((item) => ({
          id: item._id || "",
          imageUrl: item.image || "",
          title: item.title || "",
          description: item.description || "",
          artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
          audioUrl: (item.artist && item.artist[0] && item.artist[0].songs) || "",
        }));
        setData(result);
        setRenderCard(true);
      } catch (error) {
        console.error("Error fetching album data", error);
      }
    };
    fetchData();
  }, []);

 
  return (
    <>
      {renderCard ? (
        <div className="new-songs-section">
          <div className="new-songs-container">
            <h2>Album Songs</h2>
            <div className="song-container-level-1">
              {data.map((item) => (
                <Link key={item.id} to={`${item.title}/${item.id}`}>
                  <div className="music-card">
                    <BsPlayCircle className="play-icon" />
                    <img className="songs-image" src={item.imageUrl} alt="img" />
                    <p className="song-details">
                      <span className="song-name">{item.title}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="divide-line"></div>
          </div>
        </div>
      ) : (
        <Loader size="lg" />
      )}
    </>
  );
}

export default Album;
