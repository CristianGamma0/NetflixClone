import { useQuery } from '@tanstack/react-query';
import { getTMDBApiUrl, getTMDBImageUrl } from '../config/tmdb';

// Hook per fetch dettagli film/serie
export const useMovieDetails = (mediaType, id) => {
  return useQuery({
    queryKey: ['movieDetails', mediaType, id],
    queryFn: async () => {
      const url = getTMDBApiUrl(`/${mediaType}/${id}`, { language: 'it-IT' });
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch details');
      const data = await response.json();
      
      return {
        id: data.id,
        title: data.title || data.name,
        overview: data.overview,
        backdropPath: data.backdrop_path,
        posterPath: data.poster_path,
        voteAverage: data.vote_average,
        releaseDate: data.release_date || data.first_air_date,
        runtime: data.runtime || data.episode_run_time?.[0],
        genres: data.genres,
        status: data.status,
        numberOfSeasons: data.number_of_seasons,
        numberOfEpisodes: data.number_of_episodes,
      };
    },
    enabled: !!mediaType && !!id,
  });
};

// Hook per fetch cast
export const useMovieCredits = (mediaType, id) => {
  return useQuery({
    queryKey: ['movieCredits', mediaType, id],
    queryFn: async () => {
      const url = getTMDBApiUrl(`/${mediaType}/${id}/credits`, { language: 'it-IT' });
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch credits');
      const data = await response.json();
      return data.cast?.slice(0, 10) || [];
    },
    enabled: !!mediaType && !!id,
  });
};

// Hook per fetch videos/trailer
export const useMovieVideos = (mediaType, id) => {
  return useQuery({
    queryKey: ['movieVideos', mediaType, id],
    queryFn: async () => {
      const url = getTMDBApiUrl(`/${mediaType}/${id}/videos`, { language: 'it-IT' });
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch videos');
      const data = await response.json();
      return data.results?.filter(v => v.type === "Trailer").slice(0, 1) || [];
    },
    enabled: !!mediaType && !!id,
  });
};

// Hook per fetch trailer - con fallback italiano/inglese
export const useTrailer = (mediaType, titleId, enabled = true) => {
  return useQuery({
    queryKey: ['trailer', mediaType, titleId],
    queryFn: async () => {
      // Prova prima in italiano
      let url = getTMDBApiUrl(`/${mediaType}/${titleId}/videos`, { language: 'it-IT' });
      let response = await fetch(url);
      let data = await response.json();
      
      let trailer = data.results?.find(v => v.type === "Trailer");
      
      // Se non c'è trailer in italiano, prova in inglese
      if (!trailer) {
        url = getTMDBApiUrl(`/${mediaType}/${titleId}/videos`, { language: 'en-US' });
        response = await fetch(url);
        data = await response.json();
        trailer = data.results?.find(v => v.type === "Trailer");
      }
      
      return trailer?.key || null;
    },
    enabled: !!mediaType && !!titleId && enabled,
    staleTime: 1000 * 60 * 30, // Trailer raramente cambiano, cache per 30 minuti
  });
};

// Hook per fetch liste (popular, trending, etc.)
export const useMovieList = (category, itemCount) => {
  return useQuery({
    queryKey: ['movieList', category, itemCount],
    queryFn: async () => {
      // Determine which endpoint to use based on category
      let endpoint;
      switch(category) {
        case "trending":
          endpoint = "/trending/all/week";
          break;
        case "tv":
          endpoint = "/tv/popular";
          break;
        case "topRated":
          endpoint = "/movie/top_rated";
          break;
        case "upcoming":
          endpoint = "/movie/upcoming";
          break;
        case "recent":
          endpoint = "/movie/now_playing";
          break;
        default:
          endpoint = "/movie/popular";
      }

      const url = getTMDBApiUrl(endpoint, { language: 'it-IT' });
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch movie list');
      const data = await response.json();
      
      if (!data.results) return [];

      // Map TMDB results to our item format
      const mappedItems = data.results.map(item => ({
        id: item.id,
        title: item.title || item.name,
        imageUrl: getTMDBImageUrl(item.backdrop_path || item.poster_path, 'w500'),
        posterUrl: getTMDBImageUrl(item.poster_path, 'w342'),
        overview: item.overview,
        rating: item.vote_average,
        releaseDate: item.release_date || item.first_air_date,
        mediaType: item.media_type || (category === 'tv' ? 'tv' : 'movie')
      })).filter(item => {
        // Filtra elementi senza immagine
        if (!item.imageUrl) return false;
        
        // Per upcoming, mostra solo contenuti non ancora usciti
        if (category === 'upcoming' && item.releaseDate) {
          return new Date(item.releaseDate) > new Date();
        }
        
        // Per recent, mostra solo contenuti usciti nell'ultimo mese
        if (category === 'recent' && item.releaseDate) {
          const now = new Date();
          const releaseDate = new Date(item.releaseDate);
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return releaseDate <= now && releaseDate >= oneMonthAgo;
        }
        
        return true;
      }).slice(0, itemCount);
      
      return mappedItems;
    },
    enabled: !!category,
  });
};
