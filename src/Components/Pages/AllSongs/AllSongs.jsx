// import { useEffect, useState, useRef } from "react";
// import "react-multi-carousel/lib/styles.css";
// import { BsPlayCircle} from "react-icons/bs";
// import { useDispatch } from "react-redux";
// import actions from "../../../action";
// import Loader from "react-js-loader";
// import { fetchAllSongs } from '../../FetchingApis/fetching';
// import action from "../../../action";

// function AllSongs() {
//   const dispatch = useDispatch();
//   const [data, setData] = useState([]);
//   const [renderCard, setRenderCard] = useState(false);
//   useEffect(() => {
//     const fetching = async () => {
//     try {      
//         const fetchAllSongData = await fetchAllSongs();
        
//         const result = fetchAllSongData.map((item) => ({
//           key: item._id,
//           url: item.thumbnail || "",
//           name: item.title || "",
//           audio: item.audio_url || "",
//           description:
//             (item.artist && item.artist[0] && item.artist[0].description) || "",
//           artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
//           mood: item.mood || "",
//           songId: item._id || "",
//           album:"no",
//         }));
//         // setCurrentSong(result2);
//         // setShowContent(true);
//         dispatch(action.setAllSongsData(fetchAllSongData));
//         setData(result);
//         setRenderCard(true);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetching();

//   }, []);

//   const handleSongClicker = (data) => {
//     dispatch(actions.setActiveSong(data));
//   };


//   return (
//     <>
//       {renderCard ? (
//         <div className="new-songs-section">
//           <div className="new-songs-container">
//             <h2>All Songs</h2>
//             <div className="song-container-level-1">
//               {data.map((item, index) => (
//                 <div
//                   key={item._id || index}
//                   className="music-card"
//                   onClick={() => handleSongClicker(item)}
//                 >
//                   <BsPlayCircle className="play-icon" />
//                   <img className="songs-image" src={item.url} alt="img" />
//                   <p className="song-details">
//                     <span className="song-name">{item.name}</span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <div className="divide-line"></div>
//           </div>
//         </div>
//       ) : (
//         <Loader size="lg" />
//       )}
//     </>
//   );


// }

// export default AllSongs;



import React, { useEffect, useState, useRef, useCallback } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import actions from "../../../action";
import Loader from "react-js-loader";
import { fetchAllSongs } from '../../FetchingApis/fetching';
import action from "../../../action";

function AllSongs() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {      
        const fetchAllSongData = await fetchAllSongs(page);
        
        if (fetchAllSongData.length === 0) {
          setHasMore(false);
          return;
        }

        const result = fetchAllSongData.map((item) => ({
          key: item._id,
          url: item.thumbnail || "",
          name: item.title || "",
          audio: item.audio_url || "",
          description:
            (item.artist && item.artist[0] && item.artist[0].description) || "",
          artist: (item.artist && item.artist[0] && item.artist[0].name) || "",
          mood: item.mood || "",
          songId: item._id || "",
          album:"no",
        }));
        
        dispatch(action.setAllSongsData(fetchAllSongData));
        setData((prevData) => [...prevData, ...result]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [page]);

  const handleSongClicker = (data) => {
    dispatch(actions.setActiveSong(data));
  };

  const observer = useRef();
  const lastSongRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <>
      <div className="new-songs-section">
        <div className="new-songs-container">
          <h2>All Songs</h2>
          <div className="song-container-level-1">
            {data.map((item, index) => (
              <div
                key={item._id || index}
                className="music-card"
                onClick={() => handleSongClicker(item)}
                ref={data.length === index + 1 ? lastSongRef : null}
              >
                <BsPlayCircle className="play-icon" />
                <img className="songs-image" src={item.url} alt="img" />
                <p className="song-details">
                  <span className="song-name">{item.name}</span>
                </p>
              </div>
            ))}
          </div>
          {loading && <Loader size="lg" />}
        </div>
      </div>
    </>
  );
}

export default AllSongs;
