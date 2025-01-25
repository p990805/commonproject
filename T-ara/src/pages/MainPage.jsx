import MainVideo from "../components/MainVideo"
import Nanum from "../components/Nanum";
import Gigwan from "../components/Gigwan";

const MainPage =() => {

    return(
       <div className="main-page">
         <MainVideo />
         <Nanum />
         <Gigwan />
       </div>
    )
}
export default MainPage;