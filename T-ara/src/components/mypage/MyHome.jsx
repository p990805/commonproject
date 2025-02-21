import CommonComponent from "./CommonComponent";
import ReservationStatus from "./mypageHome/ReservationStatus";
import DonationRecord from "./mypageHome/DonationRecord";
import MiniWorkJournal from "./mypageHome/MiniWorkJournal";

const MyHome =()=>{
    return(

        <div className="grid grid-row-2 gap-5">
            <CommonComponent />
            <div className="flex flex-col gap-3">
                <div className="shadow-sm">
                    <DonationRecord />
                </div>
                <div className="grid grid-cols-2 gap-3 shadow-sm">
                    <MiniWorkJournal />
                    <ReservationStatus />
                </div>
                
            </div>
        </div>
    )
}
export default MyHome;