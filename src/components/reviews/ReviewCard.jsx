import { useState } from 'react';
import { Star, ThumbsUp, AlertTriangle } from 'lucide-react';
import { useToggleReviewLike, useIsReviewLiked, useReviewLikesCount } from '../../hooks/useReviews';
import { getTMDBImageUrl, TMDB_IMAGE_SIZES } from '../../config/tmdb';

const ReviewCard = ({ review, currentProfileId, isOwnReview }) => {
  const [showSpoiler, setShowSpoiler] = useState(false);
  
  const { data: likeData } = useIsReviewLiked(review.id, currentProfileId);
  const { data: likesCount = 0 } = useReviewLikesCount(review.id);
  const toggleLikeMutation = useToggleReviewLike();
  
  const isLiked = !!likeData;
  const profileName = review.expand?.profile?.name || 'Utente';
  const profileAvatar = review.expand?.profile?.avatar_url || review.expand?.profile?.avatar;

  const handleLike = async () => {
    if (!currentProfileId) return;
    
    try {
      await toggleLikeMutation.mutateAsync({
        reviewId: review.id,
        profileId: currentProfileId,
        isLiked,
        likeId: likeData?.id,
      });
    } catch (error) {
      console.error('Errore nel mettere like:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {profileAvatar ? (
              <img
                src={profileAvatar.startsWith('http') ? profileAvatar : getTMDBImageUrl(profileAvatar, TMDB_IMAGE_SIZES.poster.small)}
                alt={profileName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xl font-bold">
                {profileName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold">{profileName}</p>
              {isOwnReview && (
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                  La tua recensione
                </span>
              )}
              {!review.is_public && (
                <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
                  Privata
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              className={
                star <= review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400'
              }
            />
          ))}
          <span className="text-white ml-2 font-semibold">{review.rating}/5</span>
        </div>
      </div>

      {review.comment && (
        <div className="mb-4">
          {review.is_spoiler && !showSpoiler ? (
            <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={20} className="text-yellow-500" />
                <p className="text-yellow-500 font-semibold">Attenzione: Spoiler!</p>
              </div>
              <button
                onClick={() => setShowSpoiler(true)}
                className="text-yellow-400 hover:text-yellow-300 underline text-sm"
              >
                Clicca per mostrare
              </button>
            </div>
          ) : (
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {review.comment}
            </p>
          )}
        </div>
      )}

      {review.is_public && (
        <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
          <button
            onClick={handleLike}
            disabled={!currentProfileId || toggleLikeMutation.isPending}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              isLiked
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ThumbsUp size={18} className={isLiked ? 'fill-white' : ''} />
            <span>{likesCount}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
