import LiveLayout from "../../components/common/LiveLayout"
import DailyLive from "../../components/live/DailyLive"

const DailyLivePage =() => {
    const handleSelectLive = (LiveID) => {

    };

    return(
        <LiveLayout title="일상 라이브">
            <DailyLive onSelectLive={handleSelectLive}/>
        </LiveLayout>

    )
};
export default DailyLivePage;
