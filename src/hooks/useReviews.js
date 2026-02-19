import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import pb from '../config/pocketbase';

// Hook per ottenere le recensioni di un film/serie
export const useReviews = (tmdbId, mediaType) => {
  return useQuery({
    queryKey: ['reviews', tmdbId, mediaType],
    queryFn: async () => {
      const records = await pb.collection('reviews').getFullList({
        filter: `tmdb_id = ${tmdbId} && media_type = "${mediaType}" && is_public = true`,
        sort: '-created',
        expand: 'profile',
      });
      return records;
    },
    enabled: !!tmdbId && !!mediaType,
  });
};

// Hook per ottenere la recensione di un profilo per un film/serie
export const useMyReview = (profileId, tmdbId, mediaType) => {
  return useQuery({
    queryKey: ['my-review', profileId, tmdbId, mediaType],
    queryFn: async () => {
      try {
        const records = await pb.collection('reviews').getFullList({
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

// Hook per ottenere tutte le recensioni di un profilo
export const useProfileReviews = (profileId) => {
  return useQuery({
    queryKey: ['profile-reviews', profileId],
    queryFn: async () => {
      const records = await pb.collection('reviews').getFullList({
        filter: `profile = "${profileId}"`,
        sort: '-created',
      });
      return records;
    },
    enabled: !!profileId,
  });
};

// Hook per creare una recensione
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ profileId, tmdbId, mediaType, rating, comment, movieData, isPublic = false, isSpoiler = false }) => {
      const data = {
        profile: profileId,
        tmdb_id: tmdbId,
        media_type: mediaType,
        rating,
        comment: comment || '',
        title: movieData?.title || '',
        poster_path: movieData?.posterPath || '',
        is_public: isPublic,
        is_spoiler: isSpoiler,
        likes: 0,
      };
      
      return await pb.collection('reviews').create(data);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.tmdbId, variables.mediaType] });
      queryClient.invalidateQueries({ 
        queryKey: ['my-review', variables.profileId, variables.tmdbId, variables.mediaType] 
      });
      queryClient.invalidateQueries({ queryKey: ['profile-reviews', variables.profileId] });
    },
  });
};

// Hook per aggiornare una recensione
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reviewId, data }) => {
      return await pb.collection('reviews').update(reviewId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['my-review'] });
      queryClient.invalidateQueries({ queryKey: ['profile-reviews'] });
    },
  });
};

// Hook per eliminare una recensione
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewId) => {
      return await pb.collection('reviews').delete(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['my-review'] });
      queryClient.invalidateQueries({ queryKey: ['profile-reviews'] });
    },
  });
};

// Hook per mettere/togliere like a una recensione
export const useToggleReviewLike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reviewId, profileId, isLiked, likeId }) => {
      if (isLiked && likeId) {
        // Rimuovi like
        await pb.collection('review_likes').delete(likeId);
        // Decrementa contatore
        const review = await pb.collection('reviews').getOne(reviewId);
        await pb.collection('reviews').update(reviewId, {
          likes: Math.max(0, (review.likes || 0) - 1),
        });
      } else {
        // Aggiungi like
        await pb.collection('review_likes').create({
          review: reviewId,
          profile: profileId,
        });
        // Incrementa contatore
        const review = await pb.collection('reviews').getOne(reviewId);
        await pb.collection('reviews').update(reviewId, {
          likes: (review.likes || 0) + 1,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// Hook per verificare se hai messo like a una recensione
export const useIsReviewLiked = (reviewId, profileId) => {
  return useQuery({
    queryKey: ['review-like', reviewId, profileId],
    queryFn: async () => {
      try {
        const records = await pb.collection('review_likes').getFullList({
          filter: `review = "${reviewId}" && profile = "${profileId}"`,
        });
        return records.length > 0 ? records[0] : null;
      } catch {
        return null;
      }
    },
    enabled: !!reviewId && !!profileId,
  });
};
