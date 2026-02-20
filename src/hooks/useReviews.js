import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import pb from '../config/pocketbase';

export const useReviews = (tmdbId, mediaType, profileId = null) => {
  return useQuery({
    queryKey: ['reviews', tmdbId, mediaType, profileId],
    queryFn: async () => {
      try {
        // La listRule di PocketBase gestisce automaticamente la visibilità (pubbliche + proprie private)
        const records = await pb.collection('reviews').getFullList({
          expand: 'profile',
        });
        
        const filtered = records.filter(r => 
          r.tmdb_id === tmdbId && r.media_type === mediaType
        );
        
        return filtered;
      } catch (error) {
        console.error('Errore recupero recensioni:', error);
        return [];
      }
    },
    enabled: !!tmdbId && !!mediaType,
  });
};

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

export const useProfileReviews = (profileId) => {
  return useQuery({
    queryKey: ['profile-reviews', profileId],
    queryFn: async () => {
      const records = await pb.collection('reviews').getFullList({
        filter: `profile = "${profileId}"`,
      });
      return records;
    },
    enabled: !!profileId,
  });
};

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

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reviewId, data }) => {
      return await pb.collection('reviews').update(reviewId, data);
    },
    onSuccess: () => {
      // Invalida tutte le query relative alle recensioni
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['my-review'] });
      queryClient.invalidateQueries({ queryKey: ['profile-reviews'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewId) => {
      return await pb.collection('reviews').delete(reviewId);
    },
    onSuccess: () => {
      // Invalida tutte le query relative alle recensioni
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['my-review'] });
      queryClient.invalidateQueries({ queryKey: ['profile-reviews'] });
    },
  });
};

export const useToggleReviewLike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reviewId, profileId, isLiked, likeId }) => {
      if (isLiked && likeId) {
        await pb.collection('review_likes').delete(likeId);
      } else {
        await pb.collection('review_likes').create({
          review: reviewId,
          profile: profileId,
        });
      }
    },
    onSuccess: () => {
      // Invalida tutte le query relative ai like
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review-like'] });
      queryClient.invalidateQueries({ queryKey: ['review-likes-count'] });
    },
  });
};

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

export const useReviewLikesCount = (reviewId) => {
  return useQuery({
    queryKey: ['review-likes-count', reviewId],
    queryFn: async () => {
      try {
        const records = await pb.collection('review_likes').getFullList({
          filter: `review = "${reviewId}"`,
        });
        return records.length;
      } catch {
        return 0;
      }
    },
    enabled: !!reviewId,
  });
};
