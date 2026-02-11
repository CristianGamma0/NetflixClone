import Navbar from "../components/navbar/Navbar";
import Featured from "../components/featured/Featured";
import List from "../components/list/List";

const home = () => {
  return (
    <div className="bg-[var(--main-color)]">
      <Navbar />
      <Featured />
      <List msg="Cri2, continua a guardare:" itemCount={2} />
      <List msg="Perché hai guardato Hunter x Hunter"/>
      <List msg="Drammi TV acclamati dalla critica"/>
      <List msg="Anime per principianti"/>
      <List msg="Scelti per te oggi"/>
      <List msg="Anime di fantascienza e fantasy giapponesi"/>
      <List msg="Pensiamo ti appassioneranno"/>
      <List msg="La mia lista"/>
      <List msg="Film e TV giapponesi"/>
      <List msg="Novità su Netflix"/>
    </div>
  );
};

export default home;
