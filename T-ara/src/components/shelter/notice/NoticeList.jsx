// src/components/NoticeList.jsx
import { useNavigate } from "react-router-dom";

const NoticeList = ({
  noticeList,
  loading,
  error,
  selectedItems,
  handleSelectAll,
  handleSelectItem,
  handleEdit,
  handleDelete,
  formatDate,
}) => {
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl text-center text-red-500">
          공지사항을 불러올 수 없습니다. {error.message}
        </h2>
      </div>
    );
  if (noticeList.length === 0)
    return (
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl text-center">작성된 공지사항이 없습니다.</h2>
      </div>
    );

  return (
    <div className="bg-white rounded shadow p-6">
      {/* 리스트 헤더 */}
      <div className="px-3 py-3 border-b border-[#dee1e8]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-[15px] font-semibold text-[#191919]">[</span>
            <div className="mx-1">
              <span className="text-sm font-semibold text-[#191919]">
                {selectedItems.length > 0
                  ? `${selectedItems.length}개의 항목 선택됨`
                  : `전체 항목 총 ${noticeList.length}건`}
              </span>
            </div>
            <span className="text-[15px] font-semibold text-[#191919]">]</span>
          </div>
          <div className="flex gap-3 items-center">
            <select className="w-[131px] h-7 px-3 border border-[#cccccc] text-xs text-[#191919]">
              <option>최신순</option>
            </select>
          </div>
        </div>
      </div>
      {/* 리스트 본문 */}
      <div className="mx-4 my-4">
        {noticeList.map((notice) => (
          <div
            key={notice.noticeId}
            className="flex border-b border-[#dee1e8] py-4 cursor-pointer"
            onClick={() => navigate(`/shelter/notice/${notice.noticeId}`)}
          >
            <div className="w-[4%] flex justify-center items-center">
              <input
                type="checkbox"
                className="w-4 h-4 border border-[#767676] rounded-sm"
                checked={selectedItems.includes(notice.noticeId)}
                onClick={(e) => e.stopPropagation()}  // 여기서 이벤트 버블링 방지
                onChange={() => handleSelectItem(notice.noticeId)}
              />
            </div>
            <div className="w-[70%] ml-4">
              <h2 className="text-lg font-semibold">{notice.title}</h2>
              <p className="text-sm text-gray-500">
                작성자: {notice.shelterName}
              </p>
            </div>
            <div className="w-[26%] text-right">
              <p className="text-gray-400 text-sm">{formatDate(notice.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeList;
