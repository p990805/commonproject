import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MainBoard = () => {
  const noticeData = [
    {
      id: 1,
      category: "공지사항",
      title: "박주찬 CEO, 세이브더칠드런 국제연맹 이사 진출",
      date: "2025-01-20",
    },
    {
      id: 2,
      category: "공지사항",
      title: "세이브더칠드런-롯데멤버스, 아동보호 위해 맞손",
      date: "2025-01-16",
    },
    {
      id: 3,
      category: "공지사항",
      title: "세이브더칠드런, '가까운 지구 폭발 무기로 매일 15명 장애 발생 위기'",
      date: "2025-01-15",
    },
    {
      id: 4,
      category: "공지사항",
      title: "2024 기부금품 모집 완료 보고",
      date: "2025-01-13",
    },
    {
      id: 5,
      category: "공지사항",
      title: "세이브더칠드런 아너스클럽, 베이커리 졸업앨범 제작 봉사 나서",
      date: "2025-01-13",
    },
  ];

  return (
    <div className="flex w-full max-w-[1500px] mx-auto h-[600px] bg-gray-100">
      <div className="flex flex-col items-center justify-center w-[60%] mx-auto gap-5">
        
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-2xl">공지사항</h1>
          <Link
            to="/community"
            className="text-gray-400 font-bold hover:underline flex items-center space-x-1"
          >
            <span className="flex gap-1 items-center">
              더보기 <FaPlus className="align-middle mb-[2.5px]" />
            </span>
          </Link>
        </div>

        {/* 리스트 */}
        <div className="w-full bg-white overflow-auto p-3 rounded">
          {noticeData.map((notice) => (
            <div
              key={notice.id}
              className="flex justify-between items-center px-4 py-3 border-b border-gray-100 last:border-none"
            >
              {/* 카테고리 */}
              <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
                {notice.category}
              </span>

              {/* 제목 */}
              <p className="flex-1 text-gray-700 ml-4 truncate">{notice.title}</p>

              {/* 날짜 */}
              <span className="text-gray-400 text-sm">{notice.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainBoard;
