import { Link } from "react-router-dom";

const DonationRecord =() => {

    const donations =[
        {
            id:1,
            type:"정기",
            where: "보호소",
            content: "광주 동물보호센터 후원",
            date: "2025.02.17"
            
        },
        {
            id:2,
            type:"일시",
            where:"유기동물",
            content: "맥스 후원",
            date: "2025.02.17"
        },
        {
            id:3,
            type:"캠페인",
            where:"유기동물",
            content:"아픈 맥스 병원비",
            date:"2025.02.17"
        }

    ];

    const getStatusColor = (type) => {
        switch (type){
            case "정기": return "bg-red-500 text-white";
            case "일시": return "border border-red-500 text-red-500";
            case "캠페인": return "border border-orange-500 text-orange-500";
            default : return "border border-red-500 text-red-500";
        }
    }


    return(
        <div className="w-full bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">후원내역</h2>
                <Link 
                to="/mypage/regularspon"
                className="text-gray-400 hover:underline text-sm font-medium"
                >
                    +더보기
                </Link>
            </div>

            <div className="space-y-2">
                {donations.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                >
                    {/* 왼쪽: [맥스] 날짜/시간 */}
                    <div className="flex items-center space-x-2">
                    <span className={`text-sm flex items-center align-middle justify-center rounded-2xl py-1 px-3 font-semibold ${getStatusColor(item.type)}`}>{item.type}</span>
                    <span className="text-sm text-gray-700">[{item.where}]</span>
                    <span className="text-sm text-gray-700">{item.content}</span>
                    </div>

                    {/* 오른쪽: 상태 표시 */}
                    <div>
                    <span
                        className="text-gray text-sm"
                    >
                        후원일 {item.date}
                    </span>
                    </div>
                </div>
                ))}
            </div>

        </div>
    )   
}
export default DonationRecord;