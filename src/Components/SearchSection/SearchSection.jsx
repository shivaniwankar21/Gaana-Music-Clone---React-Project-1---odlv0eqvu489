import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Loader from "react-js-loader";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import action from "../../action";
import { useDispatch } from "react-redux";

const SearchSection = (props) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  // State for different data categories
  const [top20, setTop20] = useState([]);
  const [top50, setTop50] = useState([]);
  const [songData, setSongData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [artistData, setArtistData] = useState([]);

  // State for selected data items
  const [updatedSongData, setUpdatedSongData] = useState();
  const [updatedAlbumData, setUpdatedAlbumData] = useState();
  const [updatedArtistData, setUpdatedArtistData] = useState();
  const [updatedTopData, setUpdatedTopData] = useState();
  const [updatedTop50Data, setUpdatedTop50Data] = useState();

  // Function to fetch data
  async function fetchData(url, setData) {
    setLoader(true);
    try {
      const response = await fetch(url, {
        headers: {
          projectId: "1rttedsgsuaj",
        },
      });
      const data = await response.json();
      setData(data.data);
      setLoader(false);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      setLoader(false);
    }
  }

  // Fetch data for different categories
  useEffect(() => {
    fetchData(
      'https://academics.newtonschool.co/api/v1/music/song?search={"featured":"Top 20 of this week"}&limit=100',
      setTop20
    );
    fetchData(
      'https://academics.newtonschool.co/api/v1/music/song?search={"featured":"Top 50 of this month"}&limit=100',
      setTop50
    );
    fetchData(
      `https://academics.newtonschool.co/api/v1/music/song?search={"title":%22${props.message}%22}`,
      setSongData
    );
    // fetchData(
    //   `https://academics.newtonschool.co/api/v1/music/album?search={"title":%22${props.message}%22}`,
    //   setAlbumData
    // );
    fetchData(
      `https://academics.newtonschool.co/api/v1/music/artist/?search={"name":%22${props.message}%22}`,
      (data) => {
        setArtistData(data);
        props.handlerClosingBox(true);
      }
    );
  }, [props, updatedSongData, updatedTopData, updatedAlbumData, updatedArtistData,updatedTop50Data]);

  // Handler functions for item selection
  // useEffect(() => {
  //   fetching();
  // }, [
  //   props,
  //   updatedSongData,
  //   updatedTopData,
  //   updatedAlbumData,
  //   updatedArtistData,
  // ]);

  const handlerSongSelection = (e) => {
    const updatedList = {
      key: e._id,
      id: e._id,
      thumbnail: e.thumbnail,
      title: e.title,
      artist:
        e.artist && e.artist[0] && e.artist[0].name ? e.artist[0].name : "",
      description:
        e.artist && e.artist[0] && e.artist[0].description
          ? e.artist[0].description
          : "",
      audio_url: e.audio_url,
      fromSearch: "yes",
      category: "search-allSongs",
    };
    setUpdatedSongData(updatedList);
    setTimeout(() => {
      props.handlerClosingBox(false);
    }, 1000);
    dispatch(action.setSearchResultData(updatedList));
    dispatch(action.setAllSearchResultData(songData));
  };
  // const handlerAlbumSelection = (e) => {
  //   const updatedList = {
  //     key: e._id,
  //     id: e._id,
  //     thumbnail: e.image,
  //     title: e.title,
  //     artist:
  //       e.artist && e.artist[0] && e.artist[0].name ? e.artist[0].name : "",
  //     description:
  //       e.artist && e.artist[0] && e.artist[0].description
  //         ? e.artist[0].description
  //         : "",
  //     audio_url: e.songs,
  //     fromSearch: "yes",
  //     category: "search-albumSong",
  //   };

  //   setUpdatedAlbumData(updatedList);
  //   setTimeout(() => {
  //     props.handlerClosingBox(false);
  //   }, 1000);
  //   dispatch(action.setSearchResultData(updatedList));
  //   dispatch(action.setAllSearchResultData(albumData));
  // };

  const handlerArtistSelection = (e) => {
    const updatedList = {
      key: e._id,
      id: e._id,
      thumbnail: e.image,
      title: e.name,
      artist: e.name,
      description: e.description,
      audio_url: e.songs,
      fromSearch: "yes",
      category: "search-artistSong",
    };
    setUpdatedArtistData(updatedList);
    setTimeout(() => {
      props.handlerClosingBox(false);
    }, 1000);
    dispatch(action.setSearchResultData(updatedList));
    dispatch(action.setAllSearchResultData(artistData));
  };
  const handlerTopSelection = (e) => {
    const updatedList = {
      key: e._id,
      id: e._id,
      thumbnail: e.thumbnail,
      title: e.title,
      artist:
        e.artist && e.artist[0] && e.artist[0].name ? e.artist[0].name : "",
      description:
        e.artist && e.artist[0] && e.artist[0].description
          ? e.artist[0].description
          : "",
      audio_url: e.audio_url,
      fromSearch: "yes",
      category: "search-top20",
    };
    setUpdatedTopData(updatedList);
    setTimeout(() => {
      props.handlerClosingBox(false);
    }, 1000);
    dispatch(action.setSearchResultData(updatedList));
    dispatch(action.setAllSearchResultData(top20));
  };
  const handlerTop50Selection = (e) => {
    const updatedList = {
      key: e._id,
      id: e._id,
      thumbnail: e.thumbnail,
      title: e.title,
      artist:
        e.artist && e.artist[0] && e.artist[0].name ? e.artist[0].name : "",
      description:
        e.artist && e.artist[0] && e.artist[0].description
          ? e.artist[0].description
          : "",
      audio_url: e.audio_url,
      fromSearch: "yes",
      category: "search-top50",
    };
    setUpdatedTop50Data(updatedList);
    setTimeout(() => {
      props.handlerClosingBox(false);
    }, 1000);
    dispatch(action.setSearchResultData(updatedList));
    dispatch(action.setAllSearchResultData(top50));
  };
  return (
    <>
      <div className="search-section-box">
        <div className="search-results-lap">
          {!songData && !albumData && artistData.length == 0 && (
            <>
              <h2 className="title">Top Results</h2>
              {!loader ? (
                <>
                  <div className="search-cards trending">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={10}
                      modules={[Pagination, Navigation]}
                      navigation={true}
                      className="mySwiper"
                      breakpoints={{
                        450: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        640: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                        1080: {
                          slidesPerView: 3,
                          spaceBetween: 25,
                        },
                        1350: {
                          slidesPerView: 4,
                          spaceBetween: 25,
                        },
                      }}
                    >
                      {top20.map((item, index) => (
                        <SwiperSlide
                          key={`searchresult-${item.title}-${item._id}`}
                        >
                          <Link
                            key={`searchresult-${item.title}-${item._id}-${index}`}
                            to={`searchresult/${item.title}/${item._id}`}
                          >
                            <div
                              onClick={() => handlerTopSelection(item)}
                              className="movie-container"
                            >
                              <div className="poster">
                                <img
                                  src={item.thumbnail}
                                  className="movie-poster"
                                  alt=""
                                />
                              </div>
                              <div className="movie-name">{item.title}</div>
                              <div className="artist-name">
                                {item.artist &&
                                item.artist[0] &&
                                item.artist[0].name
                                  ? item.artist[0].name
                                  : ""}
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </>
              ) : (
                <Loader size="lg" />
              )}
            </>
          )}
          {songData && songData.length > 0 && (
            <>
              <h2 className="title">Songs</h2>
              <div className="search-cards songs">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  modules={[Pagination, Navigation]}
                  navigation={true}
                  className="mySwiper"
                  breakpoints={{
                    450: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1080: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                    1350: {
                      slidesPerView: 4,
                      spaceBetween: 25,
                    },
                  }}
                >

                  {songData.map((item, index) => (
                    <SwiperSlide key={item._id}>
                      <Link
                        key={`searchresult-${item.title}-${item._id}-${index}`}
                        to={`searchresult/${item.title}/${item._id}`}
                      >
                        <div
                          onClick={() => handlerSongSelection(item)}
                          className="movie-container"
                        >
                          <div className="poster">
                            <img
                              src={item.thumbnail}
                              className="movie-poster"
                              alt=""
                            />
                          </div>
                          <div className="movie-name">{item.title}</div>
                          <div className="artist-name">
                            {item.artist &&
                            item.artist[0] &&
                            item.artist[0].name
                              ? item.artist[0].name
                              : ""}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
          {/* {albumData && albumData.length > 0 && (
            <>
              <h2 className="title">Album</h2>
              <div className="search-cards album">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  modules={[Pagination, Navigation]}
                  navigation={true}
                  className="mySwiper"
                  breakpoints={{
                    450: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1080: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                    1350: {
                      slidesPerView: 4,
                      spaceBetween: 25,
                    },
                  }}
                >
                  {albumData.map((item, index) => (
                    <SwiperSlide key={item._id}>
                      <Link
                        key={`searchresult-${item.title}-${item._id}-${index}`}
                        to={`searchresult/${item.title}/${item._id}`}
                      >
                        <div
                          onClick={() => handlerAlbumSelection(item)}
                          className="movie-container"
                        >
                          <div className="poster">
                            <img
                              src={item.image}
                              className="movie-poster"
                              alt=""
                            />
                          </div>
                          <div className="movie-name">{item.title}</div>
                          <div className="artist-name">
                            {item.artists &&
                            item.artists[0] &&
                            item.artists[0].name
                              ? item.artists[0].name
                              : ""}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )} */}
          {artistData && artistData.length > 0 && (
            <>
              <h2 className="title">Artist</h2>
              <div className="search-cards artist">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  modules={[Pagination, Navigation]}
                  navigation={true}
                  className="mySwiper"
                  breakpoints={{
                    450: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1080: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                    1350: {
                      slidesPerView: 4,
                      spaceBetween: 25,
                    },
                  }}
                >
                  {artistData.map((item, index) => (
                    <SwiperSlide key={item._id}>
                      <Link
                        key={`searchresult-${item.title}-${item._id}-${index}`}
                        to={`searchresult/${item.title}/${item._id}`}
                      >
                        <div
                          onClick={() => handlerArtistSelection(item)}
                          className="movie-container"
                        >
                          <div className="poster">
                            <img
                              src={item.image}
                              className="movie-poster"
                              alt=""
                              style={{borderRadius:"100%"}}
                            />
                          </div>
                          <div className="movie-name">{item.name}</div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {top50.length > 0 && (
  <>
    <h2 className="title">Top 50 of this month</h2>
    <div className="search-cards top50">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Pagination, Navigation]}
        navigation={true}
        className="mySwiper"
        breakpoints={{
          450: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
          1080: { slidesPerView: 3, spaceBetween: 25 },
          1350: { slidesPerView: 4, spaceBetween: 25 },
        }}
      >
        {top50.map((item, index) => (
          <SwiperSlide key={`top50result-${item.title}-${item._id}`}>
            <Link to={`searchresult/${item.title}/${item._id}`}>
              <div
                onClick={() => handlerTop50Selection(item)}
                className="movie-container"
              >
                <div className="poster">
                  <img src={item.thumbnail} className="movie-poster" alt="" />
                </div>
                <div className="movie-name">{item.title}</div>
                <div className="artist-name">
                  {item.artist && item.artist[0] && item.artist[0].name
                    ? item.artist[0].name
                    : ""}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </>
)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchSection;
////fixed////