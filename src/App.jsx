import React, { useState, useEffect,useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import Home from "./Components/Pages/Home/Home.jsx";
import AllSongs from "./Components/Pages/AllSongs/AllSongs.jsx";
import MusicControls from "./Components/MusicControlComp/MusicControls.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { FaBars } from "react-icons/fa";
import Navbar from "./Components/Navbars/Navbar.jsx";
import NavbarSidebar from "./Components/Navbars/NavbarSidebar.jsx"
import SongsCollection from "./Components/SongsColletion/SongsCollection.jsx";
import TrendingSongs from "./Components/Pages/TrendingSongs/TrendingSongs.jsx"
import Happy from "./Components/Pages/HappySongs/Happy.jsx";
import Album from "./Components/Pages/Album/Album.jsx";
import ExcitedSongs from "./Components/Pages/ExcitedSongs/Excited.jsx";
import ComingSoonPage from "./Components/Pages/ComingSoon/ComingSoon.jsx";
import Sad from "./Components/Pages/SadSongs/Sad.jsx";
import Romance from "./Components/Pages/Romance/Romance.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import MySongs from "./Components/Pages/MySongs/MySongs.jsx";
import AlbumPage2 from "./Components/Pages/AlbumPage2/AlbumPage2.jsx";
import SearchSection from "./Components/SearchSection/SearchSection.jsx";
import SearchResultPage from "./Components/Pages/SearchResult/SearchResult.jsx";
import ArtistPage2 from "./Components/Pages/ArtistPage2/ArtistPage2.jsx";
import Artist from "./Components/Pages/ArtistPage/Artist.jsx";



function App() {
  const darkMode = useSelector((state) => state.users.darkMode);
  // console.log(darkMode);

  // music player maximize and minimize
  const [screenSize, setScreensize] = useState(window.innerWidth > 960);
  const [isOpen, setIsOpen] = useState(false);
  const [searchingType, setSearchingType] = useState("");

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const closeSidePanel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className == "opacity-style-middle") {
        closeSidePanel();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const screenSizeMemoized = useMemo(() => window.innerWidth > 960, []);
  useEffect(() => {
    const handleScreensize = () => {
      setScreensize(screenSizeMemoized);
    };

    window.addEventListener("resize", handleScreensize);

    return () => {
      window.removeEventListener("resize", handleScreensize);
    };
  }, [screenSizeMemoized]);

  const [searchBar, setSearchBar] = useState(false);

  const handleSearchBar = (value) => {
    setSearchBar(value);
  };

  const handleTyping = (value) => {
    setSearchingType(value);
  }

  const [boxClose, setBoxClose] = useState(true);

  const handlerClosingBox =(value) => {
    setBoxClose(value);
    setSearchBar(value);
    if (value === false) {
      setSearchingType("");
    }
  }

  const [openModal, setOpenModal] = useState(false);

  const handleModal = (openState) => {
    setOpenModal(openState);
  };
 

  return (
    <>
      <LoginPage isOpen={openModal} handleModal={handleModal} />

      <div className="search-bar-section">{searchBar && <SearchSection message={searchingType} handlerClosingBox={handlerClosingBox} darkMode={darkMode? `dark-mode` : "light-mode"} />}</div>

      <div className={`app-component ${darkMode ? `dark-mode` : "light-mode"}`}>
    
          <div>
            <button className="navbar-btn" onClick={toggleSidePanel}>
              <FaBars />
            </button>
            {isOpen && <div className="opacity-style-middle"></div>}
            <Navbar handleModal={handleModal} isOpen={isOpen} closeSidePanel={closeSidePanel} />
            {isOpen && <div className="overlay" onClick={closeSidePanel}></div>}

            <NavbarSidebar handleModal={handleModal}  closingStatus={boxClose} handleSearchBar={handleSearchBar} handleTyping={handleTyping} />

            <div className="bg-fill-patch-work">
              <SongsCollection />
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/album" element={<Album />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/trending" element={<TrendingSongs />} />
              <Route path="/allsongs" element={<AllSongs />} />
              <Route path="/happy" element={<Happy />} />
              
              <Route path="/excited" element={<ExcitedSongs />} />
              <Route path="/sad" element={<Sad />} />
              <Route path="/romance" element={<Romance />} />
              <Route path="/comingsoon" element={<ComingSoonPage />} />

              <Route path="/comingsoon" element={<ComingSoonPage />} />
              <Route path="/mysongs" element={<MySongs />} />

              <Route path="album/:albumName/:albumId" element={<AlbumPage2 />} />

              <Route path="searchresult/:title/:id" element={<SearchResultPage />} />
              <Route path="artist/:name/" element = { <ArtistPage2/> } />
              

            </Routes>
          </div>



        <Footer />        

        <MusicControls  handleModal={handleModal} />

        
        
      </div>
    </>
  );
}

export default App;
