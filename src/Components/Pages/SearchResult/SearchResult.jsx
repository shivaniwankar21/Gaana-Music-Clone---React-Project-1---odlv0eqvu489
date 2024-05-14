import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import "react-multi-carousel/lib/styles.css";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsPlayCircle} from "react-icons/bs";

function SearchResult() {
  const [showContent, setShowContent] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth < 960);
  const [scrolling, setScrolling] = useState(false);
  const [currentSong, setCurrentSong] = useState([]);
  const [songIndex, setIndex] = useState(0);

  const selectedSong = useSelector((state) => state.users.resultSongs);
  const selectedSongAll = useSelector((state) => state.users.resultData);
  
  const dispatch = useDispatch();

  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth < 960);
    };
    const handleScrolling = () => {
      setScrolling(window.scrollY >= 440);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  useEffect(() => {
    function dataGetting() {
      if (selectedSong && selectedSong.fromSearch === 'yes') {
        let updatedData = [];

        if (selectedSong.category === 'search-top50') {
          updatedData = selectedSongAll?.map((item, index) => ({
            key: `${item._id}&${index}`,
            url: item.thumbnail,
            name: item.title || "",
            title: item.title,
            audio_url: item.audio_url || "",
            description: item.artist && item.artist[0] && item.artist[0].description ? item.artist[0].description : "",
            artist: item.artist && item.artist[0] && item.artist[0].name ? item.artist[0].name : "",
            id: item._id,
            fromSearch: selectedSong.fromSearch,
            category: selectedSong.category,
          }));
        } else if (selectedSong.category === 'search-top20' || selectedSong.category === 'search-allSongs') {
          updatedData = selectedSongAll?.map((item, index) => ({
            key: `${item._id}&${index}`,
            url: item.thumbnail,
            name: item.title || "",
            title: item.title,
            audio_url: item.audio_url || "",
            description: item.artist && item.artist[0] && item.artist[0].description ? item.artist[0].description : "",
            artist: item.artist && item.artist[0] && item.artist[0].name ? item.artist[0].name : "",
            id: item._id,
            fromSearch: selectedSong.fromSearch,
            category: selectedSong.category,
          }));
        } else if (selectedSong.category === 'search-artistSong') {
          updatedData = selectedSongAll && selectedSongAll[0]?.songs?.map((item, index) => ({
            key: `${item}&${index}`,
            url: selectedSongAll[0].image,
            name: selectedSongAll[0].name || "",
            title: selectedSongAll[0].name,
            audio_url: `https://newton-project-resume-backend.s3.amazonaws.com/audio/${item}.mp3` || "",
            description: selectedSongAll[0].description,
            artist: selectedSongAll[0].name,
            id: item,
            fromSearch: selectedSong.fromSearch,
            category: selectedSong.category,
          }));
        }

        setCurrentSong(updatedData);
        setShowContent(true);
      }
    }
    dataGetting();
  }, [selectedSongAll, selectedSong]);
  const handleSongClicker = (data, index) => {
    dispatch(actions.setActiveSong(data));
    dispatch(actions.setAlbumData(currentSong));
    setIndex(index);
  };

  const currentSongArray = Object.values(currentSong);
  return (
    <>
      {showContent ? (
        <div>
          <audio
            ref={audioRef}
            src={currentSongArray.length > 0 ? currentSongArray[0].audio : ""}
            controls
            autoPlay
            muted
            className="audio-hide"
          />
          <div>
            <div className="musicCollections">
              <div className="traction-splitter">
                <div className="track-section">
                  <AiOutlinePlayCircle
                    onClick={() => handleSongClicker(currentSong[songIndex])}
                    className="prime-poster-play poster-play-option"
                  />
                  <img
                    className="posterPrime"
                    src={currentSong && currentSong[songIndex] && currentSong[songIndex].url ? currentSong[songIndex].url : ""}
                    alt="img"
                  />
                </div>
                <div className="button-details-splitter">
                 
                  <div className="songs-side-details">
                    <div className="song-line1">
                      <div className="song-name1">{currentSong && currentSong[songIndex] && currentSong[songIndex].title ?  currentSong[songIndex].title : ""}</div>
                      <div className="song-movie-name">
                        {currentSong && currentSong[songIndex] && currentSong[songIndex].title ?  currentSong[songIndex].artist : ""}
                      </div>
                    </div>
                    <p className="song-line2">{currentSong && currentSong[songIndex] && currentSong[songIndex].description ?  currentSong[songIndex].description : ""}</p>
                    <div className="track-details-warp">
                      <div className="track-duration">

                        0 min 20 sec
                        <div className="song-button">
                    {/* {!screenSize&&<button
                      onClick={() => handleSongClicker(currentSong[songIndex])}
                      className="song-play-btn"
                      style={{ fontSize: "0.9em", padding: "5px 10px" }}
                    >
                      Play Song
                    </button>} */}
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!screenSize && scrolling ? (
              <div className="track-list-header">
                <img
                  className="track-list-header-img"
                  src={currentSong && currentSong[songIndex] && currentSong[songIndex].url ?  currentSong[songIndex].url : ""}
                  alt="img"
                />
                <div className="song-genere">
                  <p className="song-name">{currentSong && currentSong[songIndex] && currentSong[songIndex].title ?  currentSong[songIndex].title : ""} </p>
                </div>
                {/* <button
                  onClick={() => handleSongClicker(currentTrack[songIndex])}
                  className="track-list-playing-option"
                >
                  Play All
                </button> */}
              </div>
            ) : (
              <div></div>
            )}
            <div className="trackList">
              {!screenSize && (
                <div className="trackList-container">
                  <table className="table-container">
                    <thead className="table-header">
                      <tr>
                        <th className="table-s-no"></th>
                        <th className="track-header">Track</th>
                        <th>Artists</th>
                        <th>Album</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody className="table-body-container">
                      {currentSongArray.map((tracks, index) => (
                        <tr
                          key={tracks.id || index}
                          onClick={() => {handleSongClicker(currentSong[index]), setIndex(index)}}
                        >
                          <td className="table-col-1">{index + 1}</td>
                          <td className="table-col-2">
                            <div className="track-img-play">
                              <BsPlayCircle className="play-track-icon" />
                              <img
                                src={tracks.url}
                                alt="tracker-img"
                                className="tracker-image"
                              />
                            </div>
                            <div className="track-name-premium">
                              <p className="song-name"> {tracks.name} </p>
                            </div>
                          </td>
                          <td className="table-col-3">
                            <p className="singer-name"> {tracks.artist} </p>
                          </td>
                          <td className="table-col-4">
                            <p className="track-movie-name">
                              {tracks.name}
                            </p>
                          </td>
                          <td className="table-col-5">
                            <p className="track-duration">
                              00:20
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {screenSize && (
                <div className="table-mobile-container">
                  <table>
                    <tbody>
                      {currentSong.map((item, index) => (
                        <tr
                          key={item.id || index}
                          className="table-tr-mob"
                          onClick={() => {handleSongClicker(currentSong[index]), setIndex(index)}}
                        >
                          <td className="table-td-1">{index + 1}</td>
                          <td className="table-td-2">
                            <div className="table-td-2-img">
                              <img
                                src={item.url}
                                alt="img"
                                className="table-mob-view-poster"
                              />
                              <div className="table-button-artist">
                                <p className="table-mob-artist">
                                  {item.artist}
                                </p>
                              </div>
                              <p className="table-song-name">{item.name}</p>
                            </div>
                          </td>
                          <td className="table-td-3">
                          </td>
                        </tr>
                      ))}                      
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
              <Loader size="lg"/>
        </div>
      )}
    </>
  );
}

export default SearchResult;
//fixed
