import Campaign2 from "./Campaign2";

const Campaign =()=>{

    return(
        <div className="w-full max-w-[1500px] h-[500px] mx-auto">
            <div className="flex w-full h-full">

                <div className="h-full aspect-square">
                    <img src="/assets/campaign.jpg" alt=""  className="h-full w-full object-cover rounded-lg"/>
                </div>

                <div className="flex-1 h-full pl-4">
                    <Campaign2/>
                </div>

            </div>

        </div>
    )
}
export default Campaign;