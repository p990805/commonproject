import { useNavigate } from "react-router-dom";

const Notice = () => {
  const navigate = useNavigate();

  // Mock 데이터
  const mockNotice = [
    {
      id: 1,
      title: "사랑의 후원으로 유기견을 구해주세요",
      created_at: new Date(2025, 1, 3), // 2025년 2월 3일
    },
    {
      id: 2,
      title: "따뜻한 봄, 유기동물과 함께하세요!",
      created_at: new Date(2025, 1, 1), // 2025년 2월 1일
    },
    {
      id: 3,
      title: "유기동물 보호 캠페인 안내",
      created_at: new Date(2025, 0, 29), // 2025년 1월 29일
    },
  ];

  // 날짜 변환 함수
  const formatDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="w-full  p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold  mb-6">공지사항</h1>
      <hr className="border-gray-200" />
      <ul className="divide-y divide-gray-200">
        {mockNotice.map((notice) => (
          <li
            key={notice.id}
            className="p-4 flex justify-between items-center hover:bg-gray-100 rounded-md transition"
            onClick={() => navigate(`/notice/${notice.id}`)} // 클릭 시 상세 페이지로 이동
          >
            <div className="flex gap-4 items-center">
              <p className="bg-red-500 text-white rounded-full px-4 py-1 text-sm font-bold">
                공지
              </p>
              <p className="font-medium text-lg text-gray-800">{notice.title}</p>
            </div>
            <p className="text-gray-500 text-sm">{formatDate(notice.created_at)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notice;
