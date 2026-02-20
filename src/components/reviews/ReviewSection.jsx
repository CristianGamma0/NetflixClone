import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useMyReview, useReviews, useCreateReview, useUpdateReview, useDeleteReview } from '../../hooks/useReviews';
import ReviewCard from './ReviewCard';

const ReviewSection = ({ profileId, tmdbId, mediaType, movieData }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);

  const { data: myReview, isLoading: loadingMyReview } = useMyReview(profileId, tmdbId, mediaType);
  const { data: allReviews = [], isLoading: loadingReviews } = useReviews(tmdbId, mediaType, profileId);
  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();
  const deleteMutation = useDeleteReview();

  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating);
      setComment(myReview.comment || '');
      setIsPublic(myReview.is_public);
      setIsSpoiler(myReview.is_spoiler);
    }
  }, [myReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;

    try {
      if (myReview) {
        await updateMutation.mutateAsync({
          reviewId: myReview.id,
          data: { rating, comment, is_public: isPublic, is_spoiler: isSpoiler },
        });
      } else {
        await createMutation.mutateAsync({
          profileId,
          tmdbId,
          mediaType,
          rating,
          comment,
          movieData,
          isPublic,
          isSpoiler,
        });
      }
    } catch (error) {
      console.error('Errore salvataggio recensione:', error);
    }
  };

  const handleDelete = async () => {
    if (myReview && confirm('Vuoi eliminare la tua recensione?')) {
      try {
        await deleteMutation.mutateAsync(myReview.id);
        setRating(0);
        setComment('');
        setIsPublic(false);
        setIsSpoiler(false);
      } catch (error) {
        console.error('Errore eliminazione recensione:', error);
      }
    }
  };

  // Escludi la propria recensione dalla lista (viene mostrata nel form sopra)
  const otherReviews = allReviews.filter(review => review.id !== myReview?.id);

  if (loadingMyReview) {
    return <div className="text-white">Caricamento...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-white text-2xl font-semibold mb-4">La tua recensione</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Voto</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-400'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white block mb-2">Commento (opzionale)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              rows={4}
              maxLength={1000}
              placeholder="Scrivi la tua recensione..."
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4"
              />
              Rendi pubblica (visibile ad altri utenti)
            </label>
            
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={isSpoiler}
                onChange={(e) => setIsSpoiler(e.target.checked)}
                className="w-4 h-4"
              />
              Contiene spoiler
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!rating || createMutation.isPending || updateMutation.isPending}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
            >
              {myReview ? 'Aggiorna' : 'Pubblica'} Recensione
            </button>
            
            {myReview && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
              >
                Elimina
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h3 className="text-white text-2xl font-semibold mb-4">
          Recensioni {otherReviews.length > 0 && `(${otherReviews.length})`}
        </h3>
        
        {loadingReviews ? (
          <div className="text-white text-center py-8">Caricamento recensioni...</div>
        ) : otherReviews.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">Nessuna recensione ancora. Sii il primo a recensire!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {otherReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                currentProfileId={profileId}
                isOwnReview={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
