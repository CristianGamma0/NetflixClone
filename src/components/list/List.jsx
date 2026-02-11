import { useState, useEffect } from "react";
import ListItem from "../listItem/ListItem";

// Pool di IMDb IDs di film/serie popolari
const IMDB_IDS = [
  "tt0111161", "tt0068646", "tt0468569", "tt0167260", "tt0108052",
  "tt0110912", "tt0120737", "tt0109830", "tt1375666", "tt0816692",
  "tt0137523", "tt0133093", "tt6751668", "tt0080684", "tt0099685",
  "tt2380307", "tt7286456", "tt8289930", "tt4574334", "tt2861424",
  "tt0114369", "tt0434409", "tt1853728", "tt0102926", "tt0317705",
  "tt0095765", "tt0047478", "tt0118799", "tt0245429", "tt0407887",
  "tt0172495", "tt0103064", "tt0076759", "tt0088763", "tt0482571",
  "tt1345836", "tt0364569", "tt0903624", "tt0338013", "tt0110413",
  "tt0361748", "tt0054215", "tt0120815", "tt0268978", "tt0167261",
  "tt0816711", "tt1130884", "tt0266543", "tt0253474", "tt0120689"
];

export default function List({ msg, itemCount = 10 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Seleziona IMDb IDs casuali
        const selectedIds = [...IMDB_IDS]
          .sort(() => Math.random() - 0.5)
          .slice(0, itemCount);

        const promises = selectedIds.map(async (id) => {
          try {
            const response = await fetch(`https://api.imdbapi.dev/titles/${id}/images`);
            const data = await response.json();
            
            // Prende solo le immagini di tipo still_frame
            const validImage = data?.images?.find(img => 
              img.type === "still_frame" && img.url
            );
            
            if (validImage) {
              return { id, imageUrl: validImage.url };
            }
            return null;
          } catch (err) {
            console.error(`Error fetching ${id}:`, err);
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validResults = results.filter(item => item !== null);
        setItems(validResults);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [itemCount]);

  return (
    <div className="text-white my-[44.472px] h-[168.150px]">
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
      <div className="h-[125.925px] relative">
        <div className="box-content px-[58.712px] flex overflow-x-auto h-[124.925px] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {loading ? (
            <div className="text-gray-400">Caricamento...</div>
          ) : (
            items.map((item) => (
              <ListItem key={item.id} imageUrl={item.imageUrl} titleId={item.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
