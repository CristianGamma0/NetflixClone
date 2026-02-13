# TMDB API Setup Instructions

## Overview
This Netflix clone now uses **The Movie Database (TMDB) API** instead of the IMDB API. TMDB provides comprehensive movie and TV show data with high-quality images.

## Getting Your API Key

1. **Create a TMDB Account**
   - Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
   - Sign up for a free account

2. **Request an API Key**
   - After logging in, go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Click on "Request an API Key"
   - Choose "Developer" option
   - Fill in the required information (you can use your project details)
   - Accept the terms of use
   - You'll receive your API key immediately

3. **Add Your API Key to the Project**
   - Open the file: `src/config/tmdb.js`
   - Find the line: `export const TMDB_API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key
   - Example: `export const TMDB_API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';`
   - Save the file

## What Changed

### API Endpoints
- **Popular Movies**: `/movie/popular`
- **Trending**: `/trending/all/week`
- **TV Shows**: `/tv/popular`
- **Top Rated**: `/movie/top_rated`
- **Upcoming**: `/movie/upcoming`

### Features Implemented
- ✅ Dynamic featured content from trending movies/shows
- ✅ Different categories for each list (Popular, Trending, Top Rated, etc.)
- ✅ Movie ratings displayed on thumbnails
- ✅ Italian language support (`language: 'it-IT'`)
- ✅ High-quality TMDB images
- ✅ Support for both movies and TV shows
- ✅ Hover effects on list items

### Files Modified
1. **src/config/tmdb.js** - New configuration file for TMDB API
2. **src/components/list/List.jsx** - Updated to fetch from TMDB
3. **src/components/listItem/ListItem.jsx** - Enhanced with ratings and hover effects
4. **src/components/featured/Featured.jsx** - Dynamic featured content from TMDB
5. **src/home/Home.jsx** - Updated with different content categories

## Testing

After adding your API key:
1. Save all files
2. Run `npm run dev` (if not already running)
3. Open your browser to the development URL
4. You should see movies and TV shows loaded from TMDB

## Troubleshooting

### No content showing?
- Check that your API key is correctly added to `src/config/tmdb.js`
- Open browser console (F12) to check for errors
- Verify your API key is valid at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### Images not loading?
- TMDB images require the API to return valid image paths
- Check network tab in browser developer tools for failed requests

### API Rate Limits
- TMDB free tier allows 40 requests per 10 seconds
- This should be more than enough for normal usage

## Additional Resources
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TMDB API Getting Started](https://developers.themoviedb.org/3/getting-started/introduction)
