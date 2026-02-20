import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import pb from '../config/pocketbase';

// Hook per ottenere la watchlist di un profilo
export const useWatchlist = (profileId) => {
  return useQuery({
    queryKey: ['watchlist', profileId],
    queryFn: async () => {
      const records = await pb.collection('watchlist').getFullList({
        filter: `profile = "${profileId}"`,
        sort: '-created',
        expand: 'profile',
      });
      return records;
    },
    enabled: !!profileId,
  });
};

// Hook per verificare se un film/serie è nella watchlist
export const useIsInWatchlist = (profileId, tmdbId, mediaType) => {
  return useQuery({
    queryKey: ['watchlist-check', profileId, tmdbId, mediaType],
    queryFn: async () => {
      try {
        const records = await pb.collection('watchlist').getFullList({
          filter: `profile = "${profileId}" && tmdb_id = ${tmdbId} && media_type = "${mediaType}"`,
        });
        return records.length > 0 ? records[0] : null;
      } catch {
        return null;
      }
    },
    enabled: !!profileId && !!tmdbId && !!mediaType,
  });
};

// Hook per aggiungere alla watchlist
export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ profileId, tmdbId, mediaType, movieData }) => {
      const data = {
        profile: profileId,
        tmdb_id: tmdbId,
        media_type: mediaType,
        title: movieData?.title || '',
        poster_path: movieData?.posterPath || '',
        backdrop_path: movieData?.backdropPath || '',
        overview: movieData?.overview || '',
        vote_average: movieData?.voteAverage || 0,
        release_date: movieData?.releaseDate || '',
      };
      
      return await pb.collection('watchlist').create(data);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', variables.profileId] });
      queryClient.invalidateQueries({ 
        queryKey: ['watchlist-check', variables.profileId, variables.tmdbId, variables.mediaType] 
      });
    },
  });
};

// Hook per rimuovere dalla watchlist
export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (watchlistItemId) => {
      return await pb.collection('watchlist').delete(watchlistItemId);
    },
    onSuccess: () => {
      // Invalida tutte le query relative alla watchlist
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist-check'] });
    },
  });
};
