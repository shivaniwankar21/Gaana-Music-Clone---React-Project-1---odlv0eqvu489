import { useState, useEffect } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import { useDispatch, useSelector } from "react-redux";
import action from "../../../action";
import {getSongsByArtist} from '../../../GetSongsByArtist.jsx'
import {fetchArtists } from "../../FetchingApis/fetching.jsx";

function Artist() {
  const [renderCard, setRenderCard] = useState(false);
  // const [artistPage1, setArtistPage1] =useState();
  const dispatch = useDispatch();
  const fetchData = async () =>{
  const artist = await fetchArtists();
  const newSongData = getSongsByArtist(artist);
  const newFilteredArray = [...new Set(newSongData.map((item)=>item))];
  // setArtistPage1(newFilteredArray);
  // dispatch(action.setArtistPage1(newFilteredArray));
  dispatch(action.setArtistCardsRender(newFilteredArray));
  }
  const artistDataFromStore = useSelector((state) => state.users.artistPageCardRender);
  // console.log(artistDataFromStore)
  useEffect(()=>{
    fetchData();
  },[]);
  
  useEffect(() => {
    setTimeout(()=> {
      setRenderCard(true)
    }, 1000);
  }, []);

  const handleSongSelector = (data) => {
    dispatch(action.setArtistPage1(data));
  }
  return (
    <>
      {renderCard ? (
        <div className="new-songs-section">
          <div className="new-songs-container">
            <h2>Artist Songs</h2>
            <div className="song-container-level-1">
              {artistDataFromStore.map((item) => (
                <Link onClick={()=>handleSongSelector(item)} key={item._id} to={`/artist/${item.name}`}>
                  <div className="music-card">
                    <BsPlayCircle className="play-icon" />
                    <img
                      className="songs-image"
                      src={item.image}
                      alt="img"
                      style={{borderRadius:"100%"}}
                    />
                    <p className="song-details">
                      <span className="song-name">{item.name}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="divide-line"></div>
          </div>
        </div>
      ) : (
        <Loader size="lg"/>
      )}
    </>
  );
}

export default Artist;

