import MainVideo from "../components/mainpage/MainVideo";
import Nanum from "../components/mainpage/Nanum";
import Gigwan from "../components/mainpage/Gigwan";
import Introduce from "../components/mainpage/Introduce";
import Campaign from "../components/mainpage/Campaign";
import MainBoard from "../components/mainpage/MainBoard";
import ScrollToTopButton from "../components/mainpage/ScrollToTopButton"; 

const MainPage = () => {
  return (
    <div className="w-full flex flex-col relative">
      <MainVideo />
      <Nanum />
      <Gigwan />
      <Introduce />
      <Campaign />
      <MainBoard />
      <ScrollToTopButton />
    </div>
  );
};

export default MainPage;
