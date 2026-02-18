import ListItem from "../listItem/ListItem";
import { useMovieList } from "../../hooks/useTMDBQueries";

export default function List({ msg, itemCount = 10, category = "popular" }) {
  const { data: items = [], isLoading: loading } = useMovieList(category, itemCount);

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
                releaseDate={item.releaseDate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
