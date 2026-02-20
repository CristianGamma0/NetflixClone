import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { getTMDBApiUrl, getTMDBImageUrl, TMDB_IMAGE_SIZES } from "../../config/tmdb";

const TitleWrapper = () => {
  return (
    <>
      <div className="mb-[17.789px]">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Hunter_x_hunter.png/330px-Hunter_x_hunter.png" />
      </div>
    </>
  );
};

const InfoWrapper = ({ overview }) => {
  return (
    <div className="w-[528.475px] h-[112.863px] text-white">
      <div className="h-[28.450px] my-[14.824px] flex text-[23.7184px] font-medium items-center gap-3">
        I più amati
      </div>
      <div className="text-[17.7888px] font-normal line-clamp-3">
        {overview || "Nessuna descrizione disponibile."}
      </div>
    </div>
  );
};

const BillboardLinks = ({ mediaType, id, onPlayClick }) => {
  return (
    <>
      <div className="w-[528.475px] h-[55.575] mt-[22.236px] text-[11.118px] flex">
        <button
          onClick={onPlayClick}
          className="w-[178.087px] h-[55.575px] bg-transparent text-white items-center cursor-pointer flex justify-center"
        >
          <div className="bg-white text-black mb-[11.118px] mr-[11.118px] pl-[22.236px] pr-[26.683px] py-[8.894px] w-[118.056px] h-[26.674px] rounded-[4px] flex items-center box-content hover:bg-gray-300">
            <div className="w-[26.675px] h-[26.675px] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                data-icon="PlayMedium"
                data-icon-id=":r6:"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
              >
                <path
                  fill="currentColor"
                  d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"
                ></path>
              </svg>
            </div>
            <div className="w-[11.113px] h-[0px] flex box-border"></div>
            <span className="w-[80.287px] h-[26.688px] block text-[17.7888px] font-medium">
              Riproduci
            </span>
          </div>
        </button>
        <Link to={`/watch/${mediaType}/${id}`}>
          <button className="box-content items-center bg-[var(--button-color)] rounded-[4px] text-white flex pl-[22.236px] pr-[26.683px] py-[8.894px] w-[113.718px] h-[26.674px] mr-[11.118px] mb-[11.118px] hover:bg-opacity-80">
          <div className="w-[26.675] h-[26.675] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              data-icon="CircleIMedium"
              data-icon-id=":r7:"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12m13-2v8h-2v-8zm-1-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="flex box-border w-[11.113px] h-[26.688px]"></div>
          <span className="text-[17.7888px] font-medium w-[75.950px] h-[26.688px]">
            Altre info
          </span>
        </button>
        </Link>
      </div>
    </>
  );
};

export default function Featured() {
  const [featuredContent, setFeaturedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        // Cerca specificamente Hunter x Hunter
        const searchUrl = getTMDBApiUrl('/search/tv', { 
          query: 'Hunter x Hunter',
          language: 'it-IT' 
        });
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        
        if (searchData.results && searchData.results.length > 0) {
          // Prendi il primo risultato (Hunter x Hunter)
          const hxhResult = searchData.results[0];
          
          // Ottieni i dettagli completi della serie
          const detailsUrl = getTMDBApiUrl(`/tv/${hxhResult.id}`, { language: 'it-IT' });
          const detailsResponse = await fetch(detailsUrl);
          const featured = await detailsResponse.json();

          // Ottieni i video/trailer
          const videosUrl = getTMDBApiUrl(`/tv/${hxhResult.id}/videos`, { language: 'it-IT' });
          const videosResponse = await fetch(videosUrl);
          const videosData = await videosResponse.json();
          
          // Trova il primo trailer (prova prima in italiano, poi in inglese)
          let trailer = videosData.results?.find(v => v.type === "Trailer");
          
          // Se non c'è trailer in italiano, prova in inglese
          if (!trailer) {
            const videosUrlEN = getTMDBApiUrl(`/tv/${hxhResult.id}/videos`, { language: 'en-US' });
            const videosResponseEN = await fetch(videosUrlEN);
            const videosDataEN = await videosResponseEN.json();
            trailer = videosDataEN.results?.find(v => v.type === "Trailer");
          }
          
          if (trailer) {
            setTrailerKey(trailer.key);
          }
          
          setFeaturedContent({
            id: featured.id,
            title: featured.name,
            overview: featured.overview,
            backdropPath: featured.backdrop_path,
            posterPath: featured.poster_path,
            voteAverage: featured.vote_average,
            mediaType: 'tv'
          });
        }
      } catch (error) {
        console.error("Error fetching featured content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  if (loading) {
    return (
      <div className="mb-[20px] box-content h-[600px] flex items-center justify-center bg-gray-900">
        <div className="text-white text-2xl">Caricamento...</div>
      </div>
    );
  }

  if (!featuredContent) {
    return null;
  }

  const handlePlayClick = () => {
    if (trailerKey) {
      setShowTrailer(true);
    } else {
      alert("Trailer non disponibile");
    }
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <>
      <div className="mb[20px] box-content">
        <img className="relative w-full h-auto" src={getTMDBImageUrl(featuredContent.backdropPath, TMDB_IMAGE_SIZES.backdrop.large)} alt={featuredContent.title} />
        <div className="absolute left-[58.712px] bottom-[291.837px]">
          <TitleWrapper />
          <InfoWrapper overview={featuredContent.overview} />
          <BillboardLinks mediaType={featuredContent.mediaType} id={featuredContent.id} onPlayClick={handlePlayClick} />
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