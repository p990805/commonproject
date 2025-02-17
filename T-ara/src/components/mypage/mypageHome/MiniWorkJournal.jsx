import { Link } from "react-router-dom";

const MiniWorkJournal =() => {

    const journals =[
        {
            id:1,
            title:"12월의 김시원",
            date:"2025.02.17"
        },
        {
            id:2,
            title:"11월의 김시원",
            date:"2025.02.17"
        },
        {
            id:3,
            title:"10월의 김시원",
            date:"2025.02.17"
        },
    ]

    return(
        <div className="w-full bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">활동일지</h2>
                <Link
                 to="/mypage/workjournal"
                 className="text-gray-400 hover:underline text-sm font-medium"
                 >
                +더보기
                </Link>
            </div>

            <div className="space-y-2">
                {journals.map((item) =>(
                    <div
                        key={item.id}
                        className="flex items-center justify-between border-b p-2"
                    >
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">{item.title}</span>
                        </div>

                        <div>
                            <span className="text-gray-700 text-sm">후원일 {item.date}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default MiniWorkJournal;