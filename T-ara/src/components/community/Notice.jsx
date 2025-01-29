import { useNavigate } from "react-router-dom";


const Notice =() => {
   const nav = useNavigate();



    return(
        <div className="w-full ">
            <div className="flex flex-col justify-">
                <h1 className="font-bold text-3xl">공지사항</h1>
                <div className="flex ">
                    <p>제목</p>
                    <p>내용</p>
                    <p>날짜</p>

                </div>
            </div>
        </div>
    )
}
export default Notice;