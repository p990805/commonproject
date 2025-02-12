import Campaign2 from "./Campaign2";

const Campaign =()=>{

    return(
        <div className="w-full max-w-[1500px] h-[500px] mx-auto">
            <div className="flex w-full h-full">

                <div className="h-full w-500">
                    <img src="/assets/nanum1.png" alt=""  className="h-full w-full"/>
                </div>

                <div className="w-full h-full">
                    <Campaign2/>
                </div>

            </div>

        </div>
    )
}
export default Campaign;