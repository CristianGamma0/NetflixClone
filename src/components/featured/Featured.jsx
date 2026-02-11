const TitleWrapper = () => {
  return (
    <>
      <div className="mb-[17.789px]">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Hunter_x_hunter.png/330px-Hunter_x_hunter.png" />
      </div>
    </>
  );
};

const InfoWrapper = () => {
  return (
    <>
      <div className="w-[528.475px] h-[112.863px] text-white">
        <div className="h-[28.450px] my-[14.824px] flex text-[23.7184px] font-medium">I più amati</div>
        <div className="text-[17.7888px] font-normal">Per realizzare il suo sogno di diventare un ‘hunter’ leggendario come il suo papà, un ragazzino deve superare un difficile esame e trovare il padre scomparso.  </div>
      </div>
    </>
  );
};

const BillboardLinks = () => {
  return (
    <>
      <div className="w-[528.475px] h-[55.575] mt-[22.236px] text-[11.118px] flex">
        <a
          href="/watch/81726716?trackId=254015180&tctx=0%2C0%2C470f33cc-5b21-4dc8-b8b9-18f6c5da29ae-13815859%2CNES_51B6660E4EAABAF9CEB8157C1DC75D-E911D54DEEF141-12BB73D603_p_1769771500837%2CNES_51B6660E4EAABAF9CEB8157C1DC75D_p_1769771500837%2C%2C%2C%2C%2CVideo%3A81726714%2C"
          className="w-[178.087px] h-[55.575px] bg-transparent text-white items-center cursor-pointer flex justify-center"
        >
          <button className="bg-white text-black mb-[11.118px] mr-[11.118px] pl-[22.236px] pr-[26.683px] py-[8.894px] w-[118.056px] h-[26.674px] rounded-[4px] flex items-center box-content hover:bg-gray-300">
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
          </button>
        </a>
        <button className="box-content items-center bg-[var(--button-color)] rounded-[4px] text-white flex pl-[22.236px] pr-[26.683px] py-[8.894px] w-[113.718px] h-[26.674px] mr-[11.118px] mb-[11.118px]">
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
      </div>
    </>
  );
};

export default function Featured() {
  const featuredimg = "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVFI8b15a8pzYHwY3W7_pXkGNvfsnat0vbVO3RdoF1yt0aGCBBRJkrflv9PqJKkTWUeysTmXIo1lKQ0dqzO-DOharH7NtlHmZbxl.jpg?r=327"
  return (
    <div className="mb[20px] box-content">
      <img className="relative" src={featuredimg} />
      <div className="absolute left-[58.712px] bottom-[291.837px]">
      <TitleWrapper />
      <InfoWrapper />
      <BillboardLinks />
      </div>
    </div>
  );
}