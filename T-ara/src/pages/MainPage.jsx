import MainVideo from "../components/MainVideo"
import Nanum from "../components/Nanum";
import Gigwan from "../components/Gigwan";

import "./styles/MainPage.css"

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