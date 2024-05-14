//done
const initialState = {
    darkMode: true,
    activeItem: "Home",
    activeSong: {},
    happySong: [],
    romanticSong: [],
    trendingSong: [],
    soulSongs: [],
    evergreen: [], 
    top20: [],
    top50: [],
    sadSong: [],
    excitedSong: [],
    allSongs: [],
    albumSongs: [],
    resultSongs: [],
    resultData: [],
    allfavSongData: [],
    favSongUiUpdate: false,
    artistPage1: [],
    artistPage2: [],
    artistPageCardRender: [],
  };
  
  const usersReducer = (state = initialState, action) => {
    const actionHandlers = {
      TOGGLE_DARK_MODE: () => ({ ...state, darkMode: action.payload }),
      SET_ACTIVE_ITEM: () => ({ ...state, activeItem: action.payload }),
      SET_ACTIVE_SONG: () => ({ ...state, activeSong: action.payload }),
      SET_HAPPY_SONG: () => ({ ...state, happySong: action.payload }),
      SET_ROMANTIC_SONG: () => ({ ...state, romanticSong: action.payload }),
      SET_TRENDING_SONG: () => ({ ...state, trendingSong: action.payload }),
      SET_SOUL_SONG: () => ({ ...state, soulSongs: action.payload }),
      SET_EVERGREEN_SONG: () => ({ ...state, evergreen: action.payload }),
      SET_TOP20_SONG: () => ({ ...state, top20: action.payload }),
      SET_TOP50_SONG: ()=> ({...state,top50: action.payload}),
      SET_SAD_SONG: () => ({ ...state, sadSong: action.payload }),
      SET_EXCITED_SONG: () => ({ ...state, excitedSong: action.payload }),
      SET_ALL_SONGS: () => ({ ...state, allSongs: action.payload }),
      SET_ALBUM_SONGS: () => ({ ...state, albumSongs: action.payload }),
      SET_SEARCH_RESULT_SONGS: () => ({ ...state, resultSongs: action.payload }),
      SET_ALL_SEARCH_RESULT_SONGS: () => ({ ...state, resultData: action.payload }),
      SET_ALL_FAV_SONGS: () => ({ ...state, allfavSongData: action.payload }),
      SET_FAV_SONG_UI_UPDATE: () => ({ ...state, favSongUiUpdate: action.payload }),
      SET_ARTIST_PAGE_1: () => ({ ...state, artistPage1: action.payload }),
      SET_ARTIST_PAGE_2: () => ({ ...state, artistPage2: action.payload }),
      SET_ARTIST_CARD_RENDER: () => ({ ...state, artistPageCardRender: action.payload }),
      REMOVE_FROM_FAVORITES: () => {
        const songIdToRemove = action.payload.songId;
        // Filter out the song with the specified ID from the favorites
        const updatedFavSongs = state.allfavSongData.filter(song => song.id !== songIdToRemove);
        return { ...state, allfavSongData: updatedFavSongs };
      },
      default: () => state,
    };
  
    return (actionHandlers[action.type] || actionHandlers.default)();
  };
  
  export default usersReducer;
  