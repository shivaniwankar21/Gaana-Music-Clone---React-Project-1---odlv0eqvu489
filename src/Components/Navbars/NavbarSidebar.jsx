//done
import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdBrightness2 } from "react-icons/md";
import MainLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../action.js";

function NavbarSidebar(props) {
  const [screenSize, setScreenSize] = useState(window.innerWidth > 960);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const darkMode = useSelector((state) => state.users.darkMode);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const [searchSection, setSearchSection] = useState(false);

  const handlerSearch = () => {
    setSearchSection(true);
    props.handleSearchBar(true);
    setInputValue('');
  };

  const handleCloseSearch = () => {
    setSearchSection(false);
    props.handleSearchBar(false);
    props.boxClose;
    props.handleTyping("");
    setInputValue('');
  };

  let timeout;
  const handlerTyping = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      props.handleTyping(e.target.value);
    }, 2000);
    setInputValue(e.target.value);
  };

  const handleLogo = () => {
    dispatch(actions.setActiveItem("Home"));
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(actions.toggledarkmode(!darkMode));
  };

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString || "{}");
  const [userName, setUserName] = useState("Log In / Sign Up");
  const localStorageCheck = Object.keys(userData).length;

  useEffect(() => {
    if (localStorageCheck !== 0) {
      setUserName(userData.userNameFromFetch);
    }
  }, [localStorageCheck, userData]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 960);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [modalToggle, setModalToggle] = useState(false);

  const openLoginForm = () => {
    setModalToggle(!modalToggle);
    props.handleModal(true);
  };

  return (
    <div className="navbar-top">
      <div className="navbar-view-changer">
        <div className="main-logo">
          <Link to="/">
            <img onClick={handleLogo} src={MainLogo} alt="main-logo" />
          </Link>
        </div>
        <span className="search-section">
          <span className="search-bar">
            <span className="search-icon">
              <AiOutlineSearch />
            </span>
            <input
              type="text"
              value={inputValue}
              className="input-search-option"
              placeholder="Search Artists, Songs, Albums"
              onChange={handlerTyping}
              onClick={handlerSearch}
            />
            {searchSection && (
              <AiOutlineClose
                onClick={handleCloseSearch}
                className="search-icon"
              />
            )}
          </span>
        </span>
        <div className="buttons-area">
          <Link to="/comingsoon">
            <button className="get-gaana-plus">Get Gaana Plus</button>
          </Link>
          <button
            className="dark-light-toggler"
            onClick={handleDarkModeToggle}
          >
            {darkMode ? <BsFillBrightnessHighFill /> : <MdBrightness2 />}
          </button>
          <button className="user-login" onClick={openLoginForm}>
            {userName === 'Log In / Sign Up' ?
              <>Log In / Sign Up</> :
              <><BiUserCircle /> {userName}</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarSidebar;
