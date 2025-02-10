import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarNavigation = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("후원금 내역");

  const navigationItems = {
    "후원 관리": [
      "후원금 내역",
      "후원금 사용 내역",
      "후원금 사용 등록",
      "캠페인 후원",
    ],
    "유기 동물 관리": ["전체 유기 동물", "동물 일지", "산책 예약"],
    "공지사항 관리": ["전체 공지사항"],
    "스트리밍 관리": [
      "전체 라이브 스트리밍",
      "라이브 스트리밍 연결",
      "CCTV 라이브",
    ],
    "보호소 정보 관리": ["보호소 정보 수정"],
  };

  const reversePathMap = {
    "/shelter": "후원금 내역",
    "/shelter/usage": "후원금 사용 내역",
    "/shelter/usage-register": "후원금 사용 등록",
    "/shelter/campaign": "캠페인 후원",
    "/shelter/animal": "전체 유기 동물",
    "/shelter/animal-register": "전체 유기 동물",
    "/shelter/animal-diary": "동물 일지",
    "/shelter/walk": "산책 예약",
    "/shelter/notices": "전체 공지사항",
    "/shelter/live-streams": "전체 라이브 스트리밍",
    "/shelter/live-stream-connect": "라이브 스트리밍 연결",
    "/shelter/cctv-live": "CCTV 라이브",
    "/shelter/info": "보호소 정보 수정",
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = reversePathMap[currentPath];
    if (matchingItem) {
      setActiveItem(matchingItem);
    }
  }, [location.pathname]);

  const getPath = (item) => {
    const pathMap = {
      "후원금 내역": "/shelter",
      "후원금 사용 내역": "/shelter/usage",
      "후원금 사용 등록": "/shelter/usage-register",
      "캠페인 후원": "/shelter/campaign",
      "전체 유기 동물": "/shelter/animal",
      "동물 일지": "/shelter/animal-diary",
      "산책 예약": "/shelter/walk",
      "전체 공지사항": "/shelter/notices",
      "전체 라이브 스트리밍": "/shelter/live-streams",
      "라이브 스트리밍 연결": "/shelter/live-stream-connect",
      "CCTV 라이브": "/shelter/cctv-live",
      "보호소 정보 수정": "/shelter/info",
    };
    return pathMap[item] || "/";
  };

  return (
    <div className="w-[200px] h-[1080px] px-4 bg-[#f5f4fd] flex-col justify-start items-start gap-4 inline-flex pt-10">
      {Object.entries(navigationItems).map(([section, items]) => (
        <div
          key={section}
          className="self-stretch flex-col justify-start items-start gap-1 flex"
        >
          <div className="self-stretch py-2 justify-start items-center gap-1 inline-flex hover:bg-[#eae9f8] rounded">
            <div className="text-[#a7abc3] text-[12px] font-medium uppercase leading-none">
              {section}
            </div>
          </div>

          {items.map((item) => (
            <Link
              key={item}
              to={getPath(item)}
              className={`self-stretch p-2 justify-start items-start gap-2.5 inline-flex w-full transition-all duration-200 ${
                activeItem === item
                  ? "bg-[#d5d4f5] rounded-tr-[99px] rounded-br-[99px] shadow-[inset_3px_0px_0px_0px_rgba(123,97,255,1.00)]"
                  : "hover:bg-[#eae9f8] rounded-tr-[99px] rounded-br-[99px]"
              }`}
            >
              <div className="text-[#434657] text-[13px] font-medium leading-tight">
                • {item}
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SidebarNavigation;
