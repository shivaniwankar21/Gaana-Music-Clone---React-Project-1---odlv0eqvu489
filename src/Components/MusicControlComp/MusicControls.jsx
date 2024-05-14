import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import image1 from "../../assets/1.jpg";
import song1 from "../../assets/audio/song-1.mp3";
import { BsFillPlayCircleFill, BsFillVolumeUpFill, BsFillPauseCircleFill,} from "react-icons/bs";
import { IoIosArrowUp, IoMdRepeat, IoMdShuffle, } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiSolidVolumeMute, BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import actions from "../../action";

function MusicControls(props) {

  const location = useLocation();
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [playing, setPlaying] = useState(false);
  const [songChanging, setSongChanging] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentSong, setCurrentSong] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const activeSong = useSelector((state) => state.users.activeSong);
  const topTrendingSongList = useSelector((state) => state.users.trendingSong);
  const soulSongList = useSelector((state) => state.users.soulSongs);
  const evergreenList = useSelector((state) => state.users.evergreen);
  const top20songs = useSelector((state) => state.users.top20);
  const top50songs = useSelector((state) => state.users.top50);
  const happySongList = useSelector((state) => state.users.happySong);
  const romanticSongList = useSelector((state) => state.users.romanticSong);
  const sadSongList = useSelector((state) => state.users.sadSong);
  const excitedSongList = useSelector((state) => state.users.excitedSong);
  const allSongsList = useSelector((state) => state.users.allSongs);
  const albumSongsList = useSelector((state) => state.users.albumSongs);
  const resultSongsDataList = useSelector((state) => state.users.albumSongs);
  const favSongAllList = useSelector((state) => state.users.allfavSongData);
  const artistSong = useSelector((state) => state.users.artistPage2);
  let songList = [];

  let songDetails = [];

const albumFlag = activeSong.album === "yes";
const searchResultFlag = activeSong.fromSearch === "yes";
const favSongCheck = activeSong.myFav === "yes";
const artistFlag = activeSong.artistFiltered === "yes";



  if (location.pathname === `/allsongs` && !playing) {
    songList = allSongsList;
  } else if (albumFlag) {
    songList = albumSongsList;
  } else if (activeSong.fromSearch === "yes") {
    songList = resultSongsDataList;
  } else if (favSongCheck) {
    songList = favSongAllList;
  } else if (artistFlag) {
    songList = artistSong;
  } else if (!albumFlag) {
    if (activeSong.featured === "Trending songs") {
      songList = topTrendingSongList;
    } else if (activeSong.featured === "Soul soother") {
      songList = soulSongList;
    } else if (activeSong.featured === "Evergreen melodies") {
      songList = evergreenList;
    } else if (activeSong.featured === "Top 20 of this week") {
      songList = top20songs;
    } else if (activeSong.featured === "Top 50 of this month") {
      songList = top50songs;
    } else if (activeSong.mood === "happy") {
      songList = happySongList;
    } else if (activeSong.mood === "romantic") {
      songList = romanticSongList;
    } else if (activeSong.mood === "sad") {
      songList = sadSongList;
    } else if (activeSong.mood === "excited") {
      songList = excitedSongList;
    } else {
      songList = allSongsList;
    }
  }


  let songListIndex = [];
  const songTrackList = [];

  if (Array.isArray(songList)) {
    songList.forEach((item) => {
      if (isValidSong(item, albumFlag, artistFlag, searchResultFlag, favSongCheck)) {
        songTrackList.push(item.audio_url || item.audio);
        songListIndex.push(item._id || item.id);
      }
    });
  }
  
  const songs = songTrackList.length !== 0 ? songTrackList : song1;
  
  if (Array.isArray(songList)) {
    songDetails = songList.map((item) => {
      if (albumFlag && albumSongsList) {
        return {
          key: item.id,
          id: item.id,
          thumbnail: item.image,
          title: item.songName,
          artist: "",
          audio_url: item.audio,
          album: "yes",
        };
      } else if (searchResultFlag) {
        return {
          id: item.id,
          key: item.id,
          thumbnail: item.url,
          title: item.title,
          artist: item.artist,
          audio_url: item.audio_url,
          name: item.name,
          album: "no",
          fromSearch: "yes",
        };
      } else if (favSongCheck) {
        return {
          id: item.id,
          key: item.id,
          thumbnail: item.thumbnail,
          title: item.title,
          artist: item.artist,
          audio_url: item.audio_url,
          name: item.title,
          myFav: "yes",
        };
      } else if (artistFlag) {
        return {
          id: item.songId,
          key: item.songId,
          thumbnail: item.url,
          title: item.name,
          artist: item.artist,
          audio_url: item.audio,
          name: item.name,
          artistFiltered: "yes",
        };
      } else {
        return {
          key: item._id,
          id: item._id,
          mood: item.mood,
          featured: item.featured,
          thumbnail: item.thumbnail,
          title: item.title,
          artist: item.artist[0]?.name || "",
          audio_url: item.audio_url,
          album: "no",
        };
      }
    });
  }
  
  // Function to check if the item is valid
  function isValidSong(item, albumFlag, artistFlag, searchResultFlag, favSongCheck) {
    return (
      (item.audio_url && item._id && !albumFlag && !artistFlag && !searchResultFlag && !favSongCheck) ||
      (item.audio && item.id && albumFlag && !artistFlag && !searchResultFlag && !favSongCheck) ||
      (item.audio && item.songId && !albumFlag && artistFlag && !searchResultFlag && !favSongCheck) ||
      (item.audio_url && item.id && searchResultFlag && !artistFlag && !albumFlag && !favSongCheck) ||
      (item.audio_url && item.id && !albumFlag && !artistFlag && !searchResultFlag && favSongCheck)
    );
  }
  


  //size-resposive

  const isMobile = windowWidth < 1000;
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  //control section

  const handlePlay =useCallback(() => {
    audioRef.current.play();
    setPlaying(true);
  },[location.pathname,playing])

  useEffect(() => {
    if (location.pathname === "/" && playing) {
      handlePlay();
    }
  }, []);

  useEffect(() => {
    if (songTrackList.length !== 0) {
      if (!playing) {
        handlePlay();
      }
    }
  }, [activeSong]);

  useEffect(() => {
    audioRef.current.src = songs[currentSong];
    if (playing) {
      handlePlay();
    }
  }, [currentSong]);

  const handlePause =useCallback( () => {
    audioRef.current.pause();
    setPlaying(false);
  },[setPlaying]
)
  useEffect(() => {
    const currentId = activeSong.songId ? activeSong.songId : activeSong.id;
    if (songListIndex.length > 0 && currentId !== "") {
      const index = songDetails.findIndex((index) => index.id === currentId);
      setCurrentSong(index);
    }
  }, [activeSong]);

  const handleNext = useCallback(() => {
     if (currentSong < songs.length - 1) {
      setCurrentSong((prev) => prev + 1);
    } else if (isLoop) {
      setCurrentSong(0);
    }
    setPlaying(true);
    setSongChanging(prev => prev + 1);
  },[currentSong,setPlaying,setSongChanging])

  const handlePrev = useCallback(() => {
    if (currentSong > 0) {
      setCurrentSong((prev) => prev - 1);
    }
    setPlaying(true);
    setSongChanging(prev => prev + 1);
  },[currentSong,setPlaying,setSongChanging])

  useEffect(() => {
    audioRef.current.addEventListener("ended", handleNext);

    return () => {
      audioRef.current.removeEventListener("ended", handleNext);
    };
  }, [currentSong]);


  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    updateAudioVolume(newVolume);
    setIsMuted(false);
  };
  
  const updateAudioVolume = (volume) => {
    audioRef.current.volume = volume;
  };
  
  const handleMuteBtn = () => {
    const newMuteState = !isMuted;
    updateAudioVolume(newMuteState ? 0 : volume);
    setIsMuted(newMuteState);
  };
  
  const handleTimeUpdate = () => {
    const currentAudio = audioRef.current;
    setCurrentTime(currentAudio.currentTime);
    setDuration(currentAudio.duration);
  };
  
  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  
  const handleToggleLoop = () => {
    const newLoopState = !isLoop;
    setIsLoop(newLoopState);
    audioRef.current.loop = newLoopState;
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2,"0")}`;
  };

//  Fav song
const data =  localStorage.getItem("userData") || "";
const local = data?JSON.parse(data) : "";
const [favFetchingActivator, setFavFetchingActivator] = useState(0); 
const [existingSongFav, setExistingSongFav] = useState(false); 

const userDataString = localStorage.getItem("userData");
const userData = JSON.parse(userDataString || "{}");

const handleFavSongAdding = () => {
  if (userData.login !== "success") {
    props.handleModal(true);
  }
  setFavFetchingActivator(prev => prev + 1);
  dispatch(actions.setFavSongUiUpdate(activeSong));  
};

const [fetchingSongStored, setFetchingSongStored] = useState([]);

const currentPlayingSongId = 
  songDetails && 
  songDetails[currentSong] && 
  songDetails[currentSong].id &&
  songDetails[currentSong].id;

  const favSongFetching =async()=> {
    try {
      const response = await fetch("https://academics.newtonschool.co/api/v1/music/favorites/like", {
        method: 'PATCH',
        headers:{"projectID": "1rttedsgsuaj","Content-Type": "application/json","Authorization": `Bearer ${local.token}`,},
        body:currentPlayingSongId ? 
        JSON.stringify({        
            "songId": currentPlayingSongId          
        }) : (""),
      })
      
      const result = await response.json();
      // console.log("fetchedFav",result.data);

      if (result.data) {
        setFetchingSongStored(result.data.songs);

        const array = (result.data.songs || []).map((item) => {
          return item && item._id ? item._id : item;
        });
        
        let albumFlag = array.findIndex((e) => e === currentPlayingSongId);
        setExistingSongFav(albumFlag !== -1);
      } else {

      }
    } catch (error) {
      console.log(error);
    }
  }
  

  function songFavNextPrev() {
    const array = (fetchingSongStored || []).map((item) => {
      return item && item._id ? item._id : item;
    });
    let albumFlag = array.findIndex((e) => e === currentPlayingSongId);
    setExistingSongFav(albumFlag !== -1);
  }
  useEffect(()=> {
    favSongFetching();
  }, [favFetchingActivator])



  useEffect(()=> {
    setTimeout(()=> {
      songFavNextPrev();
    }, 100)
  }, [currentSong])

// console.log(songDetails);
  return (
    <>
      <audio
        className="audio-hide"
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        src={songs[currentSong]}
        controls
      />

      <div className="music-control-comp">
        {isMobile ? (
          <section className="mob-screen-controls">
            <div className="song-name">
              <div>
                <img
                  className="current-playing-song"
                  src={
                    songDetails &&
                    songDetails[currentSong] &&
                    songDetails[currentSong].thumbnail
                      ? songDetails[currentSong].thumbnail
                      : image1
                  }
                  width={100} height={100}
                  alt=""
                />
              </div>
              <div className="song-name-lines">
                <p className="song-name-1">
                  {songDetails &&
                  songDetails[currentSong] &&
                  songDetails[currentSong].name
                    ? songDetails[currentSong].name
                    : songDetails &&
                      songDetails[currentSong] &&
                      songDetails[currentSong].title
                    ? songDetails[currentSong].title
                    : "No Songs Available"}
                </p>
                <p className="song-name-2">
                  {songDetails &&
                  songDetails[currentSong] &&
                  songDetails[currentSong].artist
                    ? songDetails[currentSong].artist
                    : songDetails &&
                      songDetails[currentSong] &&
                      songDetails[currentSong].artist
                    ? songDetails[currentSong].artist
                    : ""}
                 <div>
                  {existingSongFav && (
                    <AiFillHeart
                      onClick={handleFavSongAdding}
                      id="test-5"
                      className="heart-in"
                    />
                  )}
                  {!existingSongFav && (
                    <AiOutlineHeart
                      onClick={handleFavSongAdding}
                      id="test-6"
                      className="heart-in"
                    />
                  )}
                </div>
                </p>
            
              </div>
            </div>
            <div className="song-controls-play">
              <div className="icons-control">
              <div className="song-changing-btns">
                <BiSkipPrevious
                  onClick={handlePrev}
                  className="controls-icon2"
                />
              </div>
                <div
                  className="bg-play"
                  onClick={playing ? handlePause : handlePlay}
                >
                  {playing ? (
                    <BsFillPauseCircleFill className="playing-icon" />
                  ) : (
                    <BsFillPlayCircleFill className="playing-icon" />
                  )}
                </div>
                <div className="song-changing-btns">
                <BiSkipNext
                  onClick={handleNext}
                  className="controls-icon4"
                />
              </div>
              </div>
              <div className="icons-control">
                <input
              type="range"
              className="song-time-tracker"
              name="tracker"
              min={0}
              max={duration}
              step={0.01}
              value={currentTime}
              onChange={handleSeek}
            />
            
              </div>
            </div>
          </section>
        ) : (
          <div className="large-screen-controls">
            <input
              type="range"
              className="song-time-tracker"
              name="tracker"
              min={0}
              max={duration}
              step={0.01}
              value={currentTime}
              onChange={handleSeek}
            />
            <div className="song-playing-area1">
              <div className="song-cover">
                <div>
                  <img
                    className="current-playing-song"
                    src={
                      songDetails &&
                      songDetails[currentSong] &&
                      songDetails[currentSong].thumbnail
                        ? songDetails[currentSong].thumbnail
                        : image1
                    }
                    alt=""
                  />
                </div>
                <div>
                  <p className="song-name">
                    {songDetails &&
                    songDetails[currentSong] &&
                    songDetails[currentSong].name
                      ? songDetails[currentSong].name
                      : songDetails &&
                        songDetails[currentSong] &&
                        songDetails[currentSong].title
                      ? songDetails[currentSong].title
                      : "No Songs Available"}
                  </p>
                  <p className="song-details">
                    {songDetails &&
                    songDetails[currentSong] &&
                    songDetails[currentSong].name
                      ? songDetails[currentSong].artist
                      : songDetails &&
                        songDetails[currentSong] &&
                        songDetails[currentSong].artist
                      ? songDetails[currentSong].artist
                      : ""}
                  </p>
                </div>
                <div>
                  {existingSongFav && (
                    <AiFillHeart
                      onClick={handleFavSongAdding}
                      id="test-5"
                      className="heart-in"
                    />
                  )}
                  {!existingSongFav && (
                    <AiOutlineHeart
                      onClick={handleFavSongAdding}
                      id="test-6"
                      className="heart-in"
                    />
                  )}
                </div>
                <div>
                  <SlOptionsVertical className="options" />
                </div>
              </div>
            </div>
            <div className="song-playing-area2">
              <div className="song-duration-track">
                {isNaN(duration) || isNaN(currentTime)
                  ? "0:00 / 0:00"
                  : `${formatTime(currentTime)} / ${formatTime(duration)}`}
              </div>

              <div className="song-changing-btns">
                <IoMdRepeat
                  onClick={handleToggleLoop}
                  className={
                    !isLoop
                      ? "controls-icon1"
                      : "controls-icon1 selectActivator"
                  }
                />
              </div>
              <div className="song-changing-btns">
                <BiSkipPrevious
                  onClick={handlePrev}
                  className="controls-icon2"
                />
              </div>
              <div className="song-changing-btns">
                <div
                  id="place1"
                  className="bg-play"
                  onClick={playing ? handlePause : handlePlay}
                >
                  {playing ? (
                    <BsFillPauseCircleFill className="controls-icon3" />
                  ) : (
                    <BsFillPlayCircleFill className="controls-icon3" />
                  )}
                </div>
              </div>
              <div className="song-changing-btns">
                <BiSkipNext
                  onClick={handleNext}
                  className="controls-icon4"
                />
              </div>
              <div className="song-changing-btns">
                <IoMdShuffle
                  className= "controls-icon5"
                />
              </div>
            </div>
            <div></div>
            <div className="song-playing-area3">
              <div className="volume-btn-container">
                <div
                  className="volume-button"
                
                  onClick={handleMuteBtn}
                >
                  {isMuted ? (
                    <BiSolidVolumeMute className="volume-btn" />
                  ) : (
                    <BsFillVolumeUpFill className="volume-btn" />
                  )}
                </div>
                <div className="volume-slider-container">
                  <input
                    className="volume-slider"
                    type="range"
                    name="volume"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
              <div className="audio-type">Audio High</div>
              <div>
                <IoIosArrowUp
                  className="song-details"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default memo(MusicControls);