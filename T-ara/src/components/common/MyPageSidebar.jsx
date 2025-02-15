// src/components/common/MyPageSidebar.jsx
import { Link, useLocation } from "react-router-dom";

const MyPageSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      type: "button",
      name: "MY 홈",
      key: "myhome",
      path: "/mypage",
    },
    {
      type: "group",
      groupName: "나의 정보",
      items: [
        { name: "회원정보", key: "myinformation", path: "/mypage/information" },
        { name: "회원탈퇴", key: "withdraw", path: "/mypage/withdraw" },
      ],
    },
    {
      type: "group",
      groupName: "나의 후원내역",
      items: [
        { name: "정기후원", key: "myregularspon", path: "/mypage/regularspon" },
        { name: "일시후원", key: "mytemporaryspon", path: "/mypage/temporaryspon" },
        { name: "캠페인 후원", key: "mycampaignspon", path: "/mypage/campaignspon" },
      ],
    },
    {
      type: "group",
      groupName: "나의 후원동물",
      items: [
        { name: "활동일지", key: "myworkjournal", path: "/mypage/workjournal" },
        { name: "포토카드", key: "myphotocard", path: "/mypage/photocard" },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">마이페이지</h2>
      <ul className="space-y-3">
        {menuItems.map((item, idx) => {
          if (item.type === "button") {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          } else if (item.type === "group") {
            return (
              <li key={idx}>
                <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">
                  {item.groupName}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((subItem) => {
                    const isActive = location.pathname === subItem.path;
                    return (
                      <li key={subItem.key}>
                        <Link
                          to={subItem.path}
                          className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive
                              ? "bg-red-500 text-white"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default MyPageSidebar;
