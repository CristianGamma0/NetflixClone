import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { getTMDBApiUrl } from "../../config/tmdb";

export default function ListItem({ imageUrl, titleId, title, overview, rating, mediaType, releaseDate }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => {
        setIsExpanded(true);
        // Fetch trailer quando l'elemento si espande
        fetchTrailer();
      }, 1000);
    } else {
      setIsExpanded(false);
    }

    return () => clearTimeout(timer);
  }, [isHovered]);

  const fetchTrailer = async () => {
    try {
      // Prova prima in italiano
      let videosUrl = getTMDBApiUrl(`/${mediaType}/${titleId}/videos`, { language: 'it-IT' });
      let videosResponse = await fetch(videosUrl);
      let videosData = await videosResponse.json();
      
      let trailer = videosData.results?.find(v => v.type === "Trailer");
      
      // Se non c'è trailer in italiano, prova in inglese
      if (!trailer) {
        videosUrl = getTMDBApiUrl(`/${mediaType}/${titleId}/videos`, { language: 'en-US' });
        videosResponse = await fetch(videosUrl);
        videosData = await videosResponse.json();
        trailer = videosData.results?.find(v => v.type === "Trailer");
      }
      
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (trailerKey) {
      setShowTrailer(true);
    }
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleItemClick = () => {
    navigate(`/watch/${mediaType}/${titleId}`);
  };

  return (
    <>
      <div 
        className={`box-content shrink-0 pr-[5.93px] transition-all duration-300 ${
          isExpanded ? 'w-[300px] h-[400px] z-50' : 'w-[222.122px] h-[124.925px]'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`w-full h-full relative rounded-[2.9648px] overflow-hidden cursor-pointer transition-all duration-300 ${
            isExpanded ? 'shadow-2xl bg-[#181818]' : ''
          }`}
          onClick={handleItemClick}
        >
          {/* Image */}
          <div className={`w-full ${isExpanded ? 'h-[169px]' : 'h-full'} relative`}>
            <img 
              className="w-full h-full object-cover" 
              src={imageUrl} 
              alt={title || "Movie cover"}
            />
            {rating > 0 && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-yellow-400 px-2 py-1 rounded text-xs font-semibold">
                ⭐ {rating.toFixed(1)}
              </div>
            )}
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
              
              {/* Info: Anno e Rating */}
              <div className="flex items-center gap-3 mb-3 text-sm">
                {releaseDate && (
                  <span className="text-gray-400">
                    {new Date(releaseDate).getFullYear()}
                  </span>
                )}
                {rating > 0 && (
                  <span className="text-yellow-400 font-semibold">
                    ⭐ {rating.toFixed(1)}
                  </span>
                )}
              </div>
              
              {/* Play Button */}
              {trailerKey && (
                <button
                  onClick={handlePlayClick}
                  className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition mb-3 flex items-center justify-center gap-2 font-semibold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z" />
                  </svg>
                  Riproduci Trailer
                </button>
              )}

              {/* Overview */}
              {overview && (
                <p className="text-sm text-gray-300 line-clamp-4 mb-3">
                  {overview}
                </p>
              )}

              {/* More Info Link */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick();
                }}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Altre info →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Modal usando Portal */}
      {showTrailer && trailerKey && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90"
          onClick={handleCloseTrailer}
        >
          <div className="relative w-full max-w-5xl px-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCloseTrailer}
              className="absolute -top-12 right-4 text-white text-4xl hover:text-gray-300 transition"
            >
              ×
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
