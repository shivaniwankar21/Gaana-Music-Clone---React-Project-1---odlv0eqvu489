const headers = {
  'Content-Type': 'application/json',
  projectId: "1rttedsgsuaj",
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchData2 = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchSongs = async (filter) => {
  const url = `https://academics.newtonschool.co/api/v1/music/song?filter=${filter}&limit=100`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};

export const fetchAllSongs = async (page) => {
  const url = `https://academics.newtonschool.co/api/v1/music/song?&page=${page}&limit=10`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};

export const fetchArtists = async () => {
  const url = `https://academics.newtonschool.co/api/v1/music/artist?limit=100`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};

export const fetchAlbum = async (limit = 100) => {
  const url = `https://academics.newtonschool.co/api/v1/music/album?limit=${limit}`;
  const options = {
    headers,
  };

  return fetchData(url, options);
};
//home page
export const fetchByType = async (type) => {
  switch (type) {
    case 'Trending songs':
      return fetchSongs('{"featured":"Trending songs"}', 100);
    case 'Soul soother':
      return fetchSongs('{"featured":"Soul soother"}', 100);
    case 'Evergreen melodies':
      return fetchSongs('{"featured":"Evergreen melodies"}', 100);
    case 'Top 20 of this week':
      return fetchSongs('{"featured":"Top 20 of this week"}', 100);
    case 'Top 50 of this month':
      return fetchSongs('{"featured":"Top 50 of this month"}', 100);
    case 'happy':
      return fetchSongs('{"mood":"happy"}', 100);
    case 'romantic':
      return fetchSongs('{"mood":"romantic"}', 100);
    case 'sad':
      return fetchSongs('{"mood":"sad"}', 100);
    case 'excited':
      return fetchSongs('{"mood":"excited"}', 100);
    case 'artists':
      return fetchArtists();
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};




///for pagination
export const fetchSongs2 = async (filter,page) => {
  const url = `https://academics.newtonschool.co/api/v1/music/song?filter=${filter}&page=${page}&limit=10`;
  const options = {
    headers,
  };

  return fetchData2(url, options);
};

export const fetchArtists2 = async (page) => {
  const url = `https://academics.newtonschool.co/api/v1/music/artist?page=${page}&limit=10`;
  const options = {
    headers,
  };

  return fetchData2(url, options);
};
export const fetchByType2 = async (type, page) => {
  switch (type) {
    case 'Trending songs':
      return fetchSongs('{"featured":"Trending songs"}', 100);
    case 'Soul soother':
      return fetchSongs2('{"featured":"Soul soother"}', page);
    case 'Evergreen melodies':
      return fetchSongs2('{"featured":"Evergreen melodies"}', page);
    case 'happy':
      return fetchSongs2('{"mood":"happy"}', page);
    case 'romantic':
      return fetchSongs2('{"mood":"romantic"}', page);
    case 'sad':
      return fetchSongs2('{"mood":"sad"}', page);
    case 'excited':
      return fetchSongs2('{"mood":"excited"}', page);
      case 'artists':
        return fetchArtists2(page);
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};
