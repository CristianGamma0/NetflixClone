import Navbar from "../components/navbar/Navbar";
import Featured from "../components/featured/Featured";
import List from "../components/list/List";

const home = () => {
  return (
    <div className="bg-[var(--main-color)]">
      <Navbar />
      <Featured />
      <List msg="Continua a guardare:" itemCount={10} category="popular" />
      <List msg="Trending questa settimana" itemCount={10} category="trending" />
      <List msg="Film più votati" itemCount={10} category="topRated" />
      <List msg="Serie TV popolari" itemCount={10} category="tv" />
      <List msg="Film in arrivo" itemCount={10} category="upcoming" />
      <List msg="Popolari su Netflix" itemCount={10} category="popular" />
      <List msg="Film d'azione e avventura" itemCount={10} category="popular" />
      <List msg="Scelti per te oggi" itemCount={10} category="trending" />
      <List msg="Drammi TV acclamati dalla critica" itemCount={10} category="tv" />
      <List msg="Nuovi e popolari" itemCount={10} category="upcoming" />
    </div>
  );
};

export default home;
