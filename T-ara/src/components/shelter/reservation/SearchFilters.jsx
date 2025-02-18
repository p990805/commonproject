import { useState } from "react";

const SearchFilters = ({ onSearch }) => {
  // 오늘 날짜와 한 달 전 날짜 계산 (YYYY-MM-DD)
  const today = new Date();
  const endDateDefault = today.toISOString().slice(0, 10);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const startDateDefault = oneMonthAgo.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(startDateDefault);
  const [endDate, setEndDate] = useState(endDateDefault);
  const [categories, setCategories] = useState({
    미확인: false,
    승인: false,
    거절: false,
  });
  const [searchField, setSearchField] = useState("전체");
  const [keyword, setKeyword] = useState("");

  const handleCategoryChange = (category) => {
    setCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSearchClick = () => {
    // 부모에게 필터 기준을 전달합니다.
    onSearch({ startDate, endDate, categories, searchField, keyword });
  };

  return (
    <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
      <div className="border border-[#dee1e8]">
        {/* 기간 필터 */}
        <div className="flex">
          <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
            <span className="ml-5 text-[10.31px] text-[#191919] font-normal font-['Roboto']">
              기간
            </span>
          </div>
          <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
            <div className="flex items-center ml-5">
              <input
                type="date"
                className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-xs text-[#575757]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="mx-4 text-[#575757]">-</span>
              <input
                type="date"
                className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-xs text-[#575757]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 분류 필터 */}
        <div className="flex">
          <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
            <span className="ml-5 text-[10.31px] text-[#191919] font-normal font-['Roboto']">
              분류
            </span>
          </div>
          <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
            <div className="flex gap-4 ml-5">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                  checked={categories["미확인"]}
                  onChange={() => handleCategoryChange("미확인")}
                />
                <span className="text-xs font-medium text-[#575757]">미확인</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                  checked={categories["승인"]}
                  onChange={() => handleCategoryChange("승인")}
                />
                <span className="text-xs font-medium text-[#575757]">승인</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                  checked={categories["거절"]}
                  onChange={() => handleCategoryChange("거절")}
                />
                <span className="text-xs font-medium text-[#575757]">거절</span>
              </label>
            </div>
          </div>
        </div>

        {/* 검색 키워드 */}
        <div className="flex">
          <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
            <span className="ml-5 text-[10.31px] text-[#191919] font-normal font-['Roboto']">
              검색 키워드
            </span>
          </div>
          <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
            <div className="flex gap-4 ml-5">
              <select
                className="w-24 h-7 px-3 bg-white border border-[#cccccc] text-xs text-[#575757]"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="전체">전체</option>
              </select>
              <input
                type="text"
                className="w-64 h-7 px-3 bg-white border border-[#cccccc]"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 검색 버튼 */}
      <div className="flex justify-center mt-5">
        <button
          onClick={handleSearchClick}
          className="w-[68px] h-[33px] bg-[#191919] text-xs text-white font-normal font-['Roboto'] hover:bg-[#666]"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
