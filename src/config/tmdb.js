// TMDB API Configuration
// Get your API key from: https://www.themoviedb.org/settings/api

export const TMDB_API_KEY = 'eedbcf9429cc837a1f91d2a10076a8b4'; // Replace with your TMDB API key
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes available: w92, w154, w185, w342, w500, w780, original
export const TMDB_IMAGE_SIZES = {
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  },
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original'
  }
};

// Helper function to build image URL
export const getTMDBImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Helper function to build API URL
export const getTMDBApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY);
  
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  
  return url.toString();
};
