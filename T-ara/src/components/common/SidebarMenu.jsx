// src/components/common/SidebarMenu.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarMenu = () => {
  const location = useLocation();
  const menuItems = [
    { name: "공지사항", path: "/community/notice" },
    { name: "게시판", path: "/community/board" },
    { name: "자주묻는 질문", path: "/community/faq" },
    { name: "1:1 문의", path: "/community/inquiry" },
  ];

  return (
    <ul className="space-y-2">
      {menuItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block w-full text-left px-3 py-2 rounded transition ${
                isActive ? "bg-red-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenu;
