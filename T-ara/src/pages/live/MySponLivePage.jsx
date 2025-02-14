import LiveLayout from "../../components/common/LiveLayout";
import MySponLive from "../../components/live/MySponLive";


const MySponLivePage =()=>{
    const handleSelectPost = (liveId)=>{

    };

    return(
       <LiveLayout title = "내 후원동물 라이브">
        <MySponLive onSelectPost={handleSelectPost}/>
       </LiveLayout>
    );
}
export default MySponLivePage;