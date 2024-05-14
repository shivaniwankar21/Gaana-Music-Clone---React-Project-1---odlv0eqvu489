//done
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineDown } from 'react-icons/ai';
import action from '../../action.js';
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const SongsCollection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.users.activeItem);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [category, setCategory] = useState("Moods & Genres");

  const handleSongSelection = (selectedItem, selectedCategory) => {
    dispatch(action.setActiveItem(selectedItem));
    setCategory(selectedCategory);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scroll = () => {
    if (activeItem === "Home" || activeItem === "Album" || activeItem === "All Songs") {
      window.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    dispatch(action.setActiveItem("Home"));
    navigate('/', { replace: true });
  }, []);

  useEffect(() => {
    scroll();
  }, [activeItem]);

  const renderMenuItem = (label, to, onClick) => (
    <Link className="list-selector" to={to}>
      <MenuItem onClick={onClick}>
        <Typography variant="body1" component="span" className={activeItem === label ? "active" : ""}>
          {label}
        </Typography>
      </MenuItem>
    </Link>
  );

  return (
    <div className="songsCollection">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {renderMenuItem("Home", "/", () => handleSongSelection("Home", "Moods & Genres"))}
        
        {renderMenuItem("Trending Songs", "/trending", () => handleSongSelection("Trending Songs", "Trending Songs"))}
        {renderMenuItem("All Songs", "/allsongs", () => handleSongSelection("All Songs", "Moods & Genres"))}
        {renderMenuItem("Artist", "/artist", () => handleSongSelection("Artist", "Moods & Genres"))}
        {renderMenuItem("Happy Mood", "/happy", () => handleSongSelection("Happy Mood", "Moods & Genres"))}
        {renderMenuItem("Exciting Music", "/excited", () => handleSongSelection("Exciting Harmony", "Moods & Genres"))}

        <Tooltip title="">
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => { setAnchorEl(event.currentTarget); handleSongSelection("Moods & Genres", "Moods & Genres") }}
          >
            <Typography
              className={activeItem === "Moods & Genres" ? "active" : ""}
              variant="body1"
              component="span"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {category} <AiOutlineDown />
            </Typography>
          </IconButton>
        </Tooltip>
        {renderMenuItem("Album", "/album", () => handleSongSelection("Album", "Moods & Genres"))}
        {renderMenuItem("Radio", "/comingsoon", () => handleSongSelection("Radio", "Moods & Genres"))}
        {renderMenuItem("Podcast", "/comingsoon", () => handleSongSelection("Podcast", "Moods & Genres"))}
        {renderMenuItem("My Music", "/mysongs", () => handleSongSelection("My Music", "Moods & Genres"))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={() => { handleSongSelection("Moods & Genres", "Moods & Genres"); }}

        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""', display: "block", position: "absolute", top: 0, right: 14,
              width: 10, height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ maxHeight: 240, overflowY: "auto" }}>
          {renderMenuItem("Party", "/excited", () => setCategory("Party"))}
          {renderMenuItem("Sad Songs", "/sad", () => setCategory("Sad Songs"))}
          {renderMenuItem("Romance", "/romance", () => setCategory("Romance"))}
          {renderMenuItem("90s and 2000s", "/comingsoon", () => setCategory("90s and 2000s"))}
          {renderMenuItem("Bhakti", "/comingsoon", () => setCategory("Bhakti"))}
          {renderMenuItem("Indie", "/comingsoon", () => setCategory("Indie"))}
          {renderMenuItem("EDM", "/comingsoon", () => setCategory("EDM"))}
          {renderMenuItem("Ghazals", "/comingsoon", () => setCategory("Ghazals"))}
          {renderMenuItem("Workout", "/comingsoon", () => setCategory("Workout"))}
          {renderMenuItem("Stars", "/comingsoon", () => setCategory("Stars"))}
          {renderMenuItem("Wedding", "/comingsoon", () => setCategory("Wedding"))}
          {renderMenuItem("Kids", "/comingsoon", () => setCategory("Kids"))}
          {renderMenuItem("Dance", "/comingsoon", () => setCategory("Dance"))}
          {renderMenuItem("Friendship", "/comingsoon", () => setCategory("Friendship"))}
        </Box>
      </Menu>
    </div>
  );
};

export default SongsCollection;
