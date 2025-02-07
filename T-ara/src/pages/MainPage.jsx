import MainVideo from "../components/mainpage/MainVideo";
import Nanum from "../components/mainpage/Nanum";
import Gigwan from "../components/mainpage/Gigwan";


const MainPage = () => {
  return (
    <div className="w-full flex flex-col">
      <MainVideo />
      <Nanum />
      <Gigwan/>
    </div>
  );
};
export default MainPage;
