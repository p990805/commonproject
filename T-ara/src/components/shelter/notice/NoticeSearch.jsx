const NoticeSearch = ({
  searchCategory,
  setSearchCategory,
  searchKeyword,
  setSearchKeyword,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSearch,
  onReset,
}) => {
  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h1 className="text-2xl font-bold mb-4">공지사항 검색</h1>
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            검색 카테고리
          </label>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="w-40 border border-gray-300 rounded px-2 py-1"
          >
            <option value="title">제목</option>
            <option value="content">내용</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            검색 키워드
          </label>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-64 border border-gray-300 rounded px-2 py-1"
            placeholder="검색어를 입력하세요"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            시작 날짜
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            종료 날짜
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={onSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            검색
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeSearch;
