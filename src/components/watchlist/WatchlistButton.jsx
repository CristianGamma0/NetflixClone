import { Check, Plus } from 'lucide-react';
import { useIsInWatchlist, useToggleWatchlist } from '../../hooks/useWatchlist';
import { useState } from 'react';

const WatchlistButton = ({ profileId, tmdbId, mediaType, movieData, className = '' }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  // Verifica se è nella watchlist
  const { data: existingItem, isLoading } = useIsInWatchlist(profileId, tmdbId, mediaType);
  const toggleMutation = useToggleWatchlist();

  const isInWatchlist = !!existingItem;

  const handleToggle = async () => {
    if (!profileId || isAdding) return;
    
    setIsAdding(true);
    try {
      await toggleMutation.mutateAsync({
        profileId,
        tmdbId,
        mediaType,
        movieData,
        existingItem,
      });
    } catch (error) {
      console.error('Errore toggle watchlist:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <button className={`flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded opacity-50 ${className}`}>
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isAdding}
      className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
        isInWatchlist
          ? 'bg-gray-700 text-white hover:bg-gray-600'
          : 'bg-white text-black hover:bg-gray-200'
      } disabled:opacity-50 ${className}`}
      title={isInWatchlist ? 'Rimuovi dalla mia lista' : 'Aggiungi alla mia lista'}
    >
      {isInWatchlist ? (
        <>
          <Check size={20} />
          <span>La mia lista</span>
        </>
      ) : (
        <>
          <Plus size={20} />
          <span>La mia lista</span>
        </>
      )}
    </button>
  );
};

export default WatchlistButton;
