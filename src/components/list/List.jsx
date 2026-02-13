import { useState, useEffect } from "react";
import ListItem from "../listItem/ListItem";
import { getTMDBApiUrl, getTMDBImageUrl } from "../../config/tmdb";

export default function List({ msg, itemCount = 10, category = "popular" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Determine which endpoint to use based on category
        let endpoint;
        switch(category) {
          case "trending":
            endpoint = "/trending/all/week";
            break;
          case "tv":
            endpoint = "/tv/popular";
            break;
          case "topRated":
            endpoint = "/movie/top_rated";
            break;
          case "upcoming":
            endpoint = "/movie/upcoming";
            break;
          default:
            endpoint = "/movie/popular";
        }

        const url = getTMDBApiUrl(endpoint, { language: 'it-IT' });
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results) {
          // Map TMDB results to our item format
          const mappedItems = data.results.slice(0, itemCount).map(item => ({
            id: item.id,
            title: item.title || item.name,
            imageUrl: getTMDBImageUrl(item.backdrop_path || item.poster_path, 'w500'),
            posterUrl: getTMDBImageUrl(item.poster_path, 'w342'),
            overview: item.overview,
            rating: item.vote_average,
            mediaType: item.media_type || (category === 'tv' ? 'tv' : 'movie')
          })).filter(item => item.imageUrl);
          
          setItems(mappedItems);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [itemCount, category]);

  return (
    <div className="text-white my-[44.472px] min-h-[168.150px]">
      <h2 className="h-[42.225px]">
        <a
          href="/browse/m/continue-watching"
          className="h-[26.975px] mx-[58.712px] mb-[10.377px] block"
        >
          <div className="cursor-pointer text-[20.7536px] font-medium">
            {msg}
          </div>
        </a>
      </h2>
      <div className="relative">
        <div className="box-content px-[58.712px] flex overflow-x-auto overflow-y-visible py-8 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {loading ? (
            <div className="text-gray-400">Caricamento...</div>
          ) : (
            items.map((item) => (
              <ListItem 
                key={item.id} 
                imageUrl={item.imageUrl} 
                titleId={item.id}
                title={item.title}
                overview={item.overview}
                rating={item.rating}
                mediaType={item.mediaType}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
