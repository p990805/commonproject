import { Link, useLocation } from "react-router-dom";

const LiveSidebarMenu = () => {
  const location = useLocation();
  const menuItems = [
    { name: "일상 라이브", path: "/live/daily" },
    { name: "내 후원동물 라이브", path: "/live/myanimal" },
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

export default LiveSidebarMenu;
