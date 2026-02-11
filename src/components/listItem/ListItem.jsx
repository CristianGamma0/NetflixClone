export default function ListItem({ imageUrl, titleId }) {
  return (
    <div className="box-content w-[222.122px] h-[124.925px] shrink-0 pr-[5.93px]">
      <div className="w-full h-full">
        <div className="w-full h-full">
          <div className="w-full h-full">
            <a href={`/watch/${titleId}`} className="block w-full h-full">
              <div className="w-full h-full">
                <img 
                  className="w-full h-full object-cover rounded-[2.9648px]" 
                  src={imageUrl} 
                  alt="Movie cover"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
