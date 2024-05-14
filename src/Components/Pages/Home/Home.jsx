import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import HomeCarousel from "../../HomeCarousel/HomeCarousel.jsx";
import SongsCarousel from "./Carousel/SongsCarousel.jsx";
import { useDispatch} from "react-redux";
import action from "../../../action.js";
import Loader from "react-js-loader";

import { fetchByType, fetchArtists } from "../../FetchingApis/fetching.jsx";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 7, slidesToSlide: 2 },
  desktop2: { breakpoint: { max: 1120, min: 1024 }, items: 6 },
  desktop: { breakpoint: { max: 1024, min: 900 }, items: 5 },
  tablet2: { breakpoint: { max: 900, min: 750 }, items: 4 },
  tablet: { breakpoint: { max: 750, min: 464 }, items: 3 },
  mobile2: { breakpoint: { max: 464, min: 350 }, items: 2 },
  mobile: { breakpoint: { max: 350, min: 0 }, items: 1 },
};

function Home() {
  const [trendingSongs, setTrendingSongs] = useState();
  const [soulSongs, setSoulSongs] = useState();
  const [evergreenSongs, setEvergreenSongs] = useState();
  const [top20songs, setTop20Songs] = useState();
  const [top50songs, setTop50Songs] = useState();
  const [happySongsData, setHappySongsData] = useState();
  const [romanticSongsData, setRomanticSongsData] = useState();
  const [sadSongsData, setSadSongsData] = useState();
  const [excitedSongsData, setExcitedSongsData] = useState();

  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const [loader5, setLoader5] = useState(false);
  const [loader6, setLoader6] = useState(false);
  const [loader7, setLoader7] = useState(false);
  const [loader8, setLoader8] = useState(false);
  const [loader9, setLoader9] = useState(false);


  const dispatch = useDispatch();

 
  

  function setInLocalStorage(data) {
    const allSongsList = JSON.parse(localStorage.getItem("allData")) || [];
    if (!allSongsList) {
      localStorage.setItem("allData", JSON.stringify(...data));
    } else if (allSongsList.length < 410) {
      localStorage.setItem(
        "allData",JSON.stringify([...allSongsList, ...data])
      );
    }
  }

  useEffect(() => {
    const allFetchedData = [];
    setLoader1(true);
    setLoader2(true);
    setLoader3(true);
    setLoader4(true);
    setLoader5(true);
    setLoader6(true);
    setLoader7(true);
    setLoader8(true);
    setLoader9(true);
    // setLoader10(true);


    const fetchData = async () => {
      try {
        const trendingData = await fetchByType("Trending songs");
        allFetchedData.push(...trendingData);
        setTrendingSongs(trendingData);
        dispatch(action.setTrendingData(trendingData));
        setInLocalStorage(trendingData);
        setLoader1(false);

        const soulSootherData = await fetchByType("Soul soother");
        allFetchedData.push(...soulSootherData);
        setSoulSongs(soulSootherData);
        dispatch(action.setSoulSongsData(soulSootherData));
        setInLocalStorage(soulSootherData);
        setLoader2(false);

        const everGreenData = await fetchByType("Evergreen melodies");
        allFetchedData.push(...everGreenData);
        setEvergreenSongs(everGreenData);
        dispatch(action.setEvergreenData(everGreenData));
        setInLocalStorage(everGreenData);
        setLoader3(false);

        const top20Data = await fetchByType("Top 20 of this week");
        allFetchedData.push(...top20Data);
        setTop20Songs(top20Data);
        dispatch(action.setTop20Data(top20Data));
        setInLocalStorage(top20Data);
        setLoader4(false);

        
        const top50Data = await fetchByType("Top 50 of this month");
        allFetchedData.push(...top50Data);
        setTop50Songs(top50Data);
        dispatch(action.setTop50Data(top50Data));
        setInLocalStorage(top50Data);
        setLoader5(false);

        const happyMood = await fetchByType("happy");
        allFetchedData.push(...happyMood);
        setHappySongsData(happyMood);
        dispatch(action.setHappyData(happyMood));
        setInLocalStorage(happyMood);
        setLoader6(false);

        const romanticMood = await fetchByType("romantic");
        allFetchedData.push(...romanticMood);
        setRomanticSongsData(romanticMood);
        dispatch(action.setRomanticData(romanticMood));
        setInLocalStorage(romanticMood);
        setLoader7(false);

        const sadMood = await fetchByType("sad");
        allFetchedData.push(...sadMood);
        dispatch(action.setSadSongData(sadMood));
        setSadSongsData(sadMood);
        setInLocalStorage(sadMood);
        setLoader8(false);

        const excitedMood = await fetchByType("excited");
        allFetchedData.push(...excitedMood);
        dispatch(action.setExcitedData(excitedMood));
        setExcitedSongsData(excitedMood);
        setInLocalStorage(excitedMood);
        setLoader9(false);   
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const generateProductComponents = (data) => {
    return data?.map((item) => (
      <SongsCarousel
        key={item._id}
        songId={item._id}
        name={item.title}
        url={item.thumbnail}
        audio={item.audio_url}
        mood={item.mood}
        featured={item.featured}
        album="no"
      />
    ));
  };
  // const generateArtistCarousel = (data) => {
  //   return data?.map((item) => (
  //     <CarouselType2
  //       key={item._id}
  //       songId={item._id}
  //       name={item.name}
  //       url={item.image}
  //       audio={item.audio_url}
  //       mood={item.mood}
  //       featured={item.featured}
  //       album="no"
  //     />
  //   ));
  // };

  const productTrending = generateProductComponents(trendingSongs);
  const productSoul = generateProductComponents(soulSongs);
  const productEvergreen = generateProductComponents(evergreenSongs);
  const productTop20 = generateProductComponents(top20songs);
  const productTop50 = generateProductComponents(top50songs);
  const productHappy = generateProductComponents(happySongsData);
  const productRomantic = generateProductComponents(romanticSongsData);
  const productSad = generateProductComponents(sadSongsData);
  const productExcited = generateProductComponents(excitedSongsData);
  // const productArtists = generateArtistCarousel(artistPage1);
  // const artistCarousel = generateArtistCarousel(productArtists);

 
  return (
    <>
      <HomeCarousel />
      {/* <ArtistCarousel/> */}
      {generateCarouselSection('Top Trending', productTrending, loader1)}
      {generateCarouselSection('Soul soother', productSoul, loader2)}
      {generateCarouselSection('Evergreen Melodies', productEvergreen, loader3)}
      {generateCarouselSection('Top 20 Of this week', productTop20, loader4)}
      {generateCarouselSection('Top 50 Of this month', productTop50, loader5)}
      {generateCarouselSection('Happy Mood', productHappy, loader6)}
      {generateCarouselSection('Romantic Mood', productRomantic, loader7)}
      {generateCarouselSection('Sad Songs', productSad, loader8)}
      {generateCarouselSection('Excited Mood', productExcited, loader9)}
      {/* {generateCarouselSection("Artists", productArtists, loader10)} */}
    </>
  );
}

const generateCarouselSection = (title, data, loader) => {
  return (
    <>
      <h2 className="homepage-heading">{title}</h2>
      {!loader ? (
        <>
          {data?.length > 0 && (
            <Carousel showDots={false} responsive={responsive}>
              {data}
            </Carousel>
          )}
        </>
      ) : (
        <Loader size="lg" />
      )}
    </>
  );
};

export default Home;
