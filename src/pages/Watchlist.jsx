import { useAuth } from '../contexts/AuthContext';
import { useWatchlist } from '../hooks/useWatchlist';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const { currentProfile, isAuthenticated } = useAuth();
  const { data: watchlist, isLoading } = useWatchlist(currentProfile?.id);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 px-12 text-center">
          <h1 className="text-4xl text-white mb-4">Accedi per vedere la tua lista</h1>
          <p className="text-gray-400">Devi effettuare l'accesso per visualizzare i contenuti salvati</p>
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 px-12 text-center">
          <h1 className="text-4xl text-white mb-4">Seleziona un profilo</h1>
          <p className="text-gray-400">Scegli un profilo per visualizzare la tua lista</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32 px-12">
        <h1 className="text-5xl font-bold text-white mb-8">La mia lista</h1>
        
        {isLoading ? (
          <div className="text-white text-center py-20">Caricamento...</div>
        ) : !watchlist || watchlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">La tua lista è vuota</p>
            <p className="text-gray-500">Aggiungi film e serie TV che desideri guardare più tardi</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlist.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/watch/${item.media_type}/${item.tmdb_id}`)}
                className="cursor-pointer group relative"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=No+Image'
                    }
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
                </div>
                <h3 className="text-white text-sm mt-2 line-clamp-2">{item.title}</h3>
                {item.vote_average && (
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-gray-400 text-xs ml-1">
                      {item.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
