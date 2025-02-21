// src/components/ShelterNotice.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavigation from "./SidebarNavigation";
import api from "../../api";
import NoticeSearch from "../shelter/notice/NoticeSearch";
import NoticeList from "../shelter/notice/NoticeList";

const ShelterNotice = () => {
  const navigate = useNavigate();

  // 검색 필터 상태
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 공지사항 리스트, 로딩, 에러, 선택된 항목 상태
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // 로컬스토리지에서 보호소 ID 가져오기
  const shelterId = localStorage.getItem("shelterId");

  // 공지사항 목록 불러오기 함수
  const fetchNotices = (params) => {
    if (!shelterId) {
      setError(new Error("보호소 정보가 없습니다."));
      setLoading(false);
      return;
    }
    setLoading(true);
    api
      .get("/notice/list", {
        params: params || {
          shelterCategory: shelterId,
          searchCategory,
          keyword: searchKeyword,
          startDate,
          endDate,
        },
      })
      .then((response) => {
        const list = response.data.noticeList || [];
        setNoticeList(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("공지사항 리스트 로드 오류:", err);
        setError(err);
        setLoading(false);
      });
  };

  // 초기 조회 (컴포넌트 마운트 시)
  useEffect(() => {
    fetchNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shelterId]);

  // 검색 버튼 클릭 시 목록 갱신
  const handleSearch = () => {
    fetchNotices();
    setSelectedItems([]);
  };

  // 초기화 버튼 클릭 시 검색 조건 리셋 후 목록 갱신
  const handleReset = () => {
    const initialParams = {
      shelterCategory: shelterId,
      searchCategory: "title",
      keyword: "",
      startDate: "",
      endDate: "",
    };
    setSearchCategory(initialParams.searchCategory);
    setSearchKeyword(initialParams.keyword);
    setStartDate(initialParams.startDate);
    setEndDate(initialParams.endDate);
    setSelectedItems([]);
    fetchNotices(initialParams);
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(noticeList.map((notice) => notice.noticeId));
    } else {
      setSelectedItems([]);
    }
  };

  // 개별 항목 선택/해제 핸들러
  const handleSelectItem = (noticeId) => {
    setSelectedItems((prev) =>
      prev.includes(noticeId)
        ? prev.filter((id) => id !== noticeId)
        : [...prev, noticeId]
    );
  };

  // 수정 버튼: 단일 항목 선택 시 수정 페이지로 이동
  const handleEdit = () => {
    if (selectedItems.length !== 1) {
      alert("수정할 공지사항을 하나만 선택하세요.");
      return;
    }
    const noticeId = selectedItems[0];
    navigate(`/shelter/notice/edit/${noticeId}`);
  };

  // 삭제 버튼: 선택한 공지사항 모두 삭제
  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 공지사항을 선택하세요.");
      return;
    }
    if (!window.confirm("선택한 공지사항을 삭제하시겠습니까?")) return;
    Promise.all(
      selectedItems.map((noticeId) => api.get(`/notice/delete/${noticeId}`))
    )
      .then(() => {
        alert("삭제가 완료되었습니다.");
        setSelectedItems([]);
        fetchNotices();
      })
      .catch((err) => {
        console.error("공지사항 삭제 오류:", err);
        alert("공지사항 삭제에 실패하였습니다.");
      });
  };

  // 날짜 포맷 함수 (예: "2025-02-16 07:38:28" → "2025.02.16")
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      <div className="flex-1 p-8">
        <div className="mx-4">
          {/* 검색 필터 영역 */}
          <NoticeSearch
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onSearch={handleSearch}
            onReset={handleReset}
          />

          {/* 헤더 영역: 제목 및 액션 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              전체 공지사항
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/shelter/notice-register")}
                className="flex items-center justify-center px-5 h-10 bg-[#235fd9] text-white text-sm font-medium rounded hover:bg-[#1e51b8] transition-colors"
              >
                공지사항 등록하기
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600"
                disabled={selectedItems.length !== 1}
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                disabled={selectedItems.length === 0}
              >
                삭제
              </button>
            </div>
          </div>

          {/* 공지사항 목록 영역 */}
          <NoticeList
            noticeList={noticeList}
            loading={loading}
            error={error}
            selectedItems={selectedItems}
            handleSelectAll={handleSelectAll}
            handleSelectItem={handleSelectItem}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ShelterNotice;
