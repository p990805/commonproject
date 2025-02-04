import MainVideo from "../components/mainpage/MainVideo";
import Nanum from "../components/mainpage/Nanum";
import Gigwan from "../components/mainpage/Gigwan";

import "./styles/MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <MainVideo />
      <Nanum />
      <Gigwan />
    </div>
  );
};
export default MainPage;
