import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTMDBApiUrl, getTMDBImageUrl, TMDB_IMAGE_SIZES } from "../config/tmdb";
import Navbar from "../components/navbar/Navbar";

export default function Details() {
  const { mediaType, id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch main details
        const detailsUrl = getTMDBApiUrl(`/${mediaType}/${id}`, { language: 'it-IT' });
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        // Fetch credits (cast)
        const creditsUrl = getTMDBApiUrl(`/${mediaType}/${id}/credits`, { language: 'it-IT' });
        const creditsResponse = await fetch(creditsUrl);
        const creditsData = await creditsResponse.json();

        // Fetch videos (trailers)
        const videosUrl = getTMDBApiUrl(`/${mediaType}/${id}/videos`, { language: 'it-IT' });
        const videosResponse = await fetch(videosUrl);
        const videosData = await videosResponse.json();

        setContent({
          id: detailsData.id,
          title: detailsData.title || detailsData.name,
          overview: detailsData.overview,
          backdropPath: detailsData.backdrop_path,
          posterPath: detailsData.poster_path,
          voteAverage: detailsData.vote_average,
          releaseDate: detailsData.release_date || detailsData.first_air_date,
          runtime: detailsData.runtime || detailsData.episode_run_time?.[0],
          genres: detailsData.genres,
          status: detailsData.status,
          numberOfSeasons: detailsData.number_of_seasons,
          numberOfEpisodes: detailsData.number_of_episodes,
        });

        setCast(creditsData.cast?.slice(0, 10) || []);
        setVideos(videosData.results?.filter(v => v.type === "Trailer").slice(0, 1) || []);

      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [mediaType, id]);

  if (loading) {
    return (
      <div className="bg-[var(--main-color)] min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-2xl">Caricamento...</div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-[var(--main-color)] min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-2xl">Contenuto non trovato</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--main-color)] min-h-screen">
      <Navbar />
      
      {/* Backdrop Image */}
      <div className="relative h-[600px] w-full">
        <img
          src={getTMDBImageUrl(content.backdropPath, TMDB_IMAGE_SIZES.backdrop.original)}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--main-color)] via-transparent to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-12 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md backdrop-blur-sm transition"
        >
          ← Indietro
        </button>
      </div>

      {/* Content Details */}
      <div className="px-12 -mt-32 relative z-10">
        <div className="flex gap-8">
          {/* Poster */}
          {content.posterPath && (
            <img
              src={getTMDBImageUrl(content.posterPath, TMDB_IMAGE_SIZES.poster.large)}
              alt={content.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl"
            />
          )}

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-yellow-400 text-xl font-semibold">
                ⭐ {content.voteAverage.toFixed(1)}
              </span>
              {content.releaseDate && (
                <span className="text-gray-400">{new Date(content.releaseDate).getFullYear()}</span>
              )}
              {content.runtime && (
                <span className="text-gray-400">{content.runtime} min</span>
              )}
              {content.numberOfSeasons && (
                <span className="text-gray-400">{content.numberOfSeasons} stagioni</span>
              )}
            </div>

            {/* Genres */}
            {content.genres && content.genres.length > 0 && (
              <div className="flex gap-2 mb-6">
                {content.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {content.overview || "Nessuna descrizione disponibile."}
            </p>

            {/* Trailer */}
            {videos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
                <div className="aspect-video w-full max-w-3xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${videos[0].key}`}
                    title="Trailer"
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      {actor.profile_path ? (
                        <img
                          src={getTMDBImageUrl(actor.profile_path, TMDB_IMAGE_SIZES.poster.small)}
                          alt={actor.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <p className="font-medium text-sm">{actor.name}</p>
                      <p className="text-gray-400 text-xs">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
