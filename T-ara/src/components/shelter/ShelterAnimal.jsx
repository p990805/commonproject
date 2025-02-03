import SidebarNavigation from "../SidebarNavigation";

const ShelterAnimal = () => {
  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              전체 유기 동물
            </h1>
          </div>

          {/* Search Filters */}
          <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
            <div className="border border-[#dee1e8]">
              {/* Period Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    등록 기간
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex items-center ml-5">
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      defaultValue="2024-10-23"
                    />
                    <span className="mx-4 !text-[#575757]">-</span>
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      defaultValue="2025-01-23"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    동물 분류류
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <select className="w-24 h-7 px-3 bg-white border border-[#cccccc] text-[#575757] text-xs">
                      <option>전체</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Keyword */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    검색 키워드
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <select className="w-24 h-7 px-3 bg-white border border-[#cccccc] text-[#575757] text-xs">
                      <option>전체</option>
                    </select>
                    <input
                      type="text"
                      className="w-64 h-7 px-3 bg-white border border-[#cccccc]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-5">
              <button className="w-[68px] h-[33px] bg-[#191919] text-white text-xs font-normal font-['Roboto'] hover:bg-[#666]">
                검색
              </button>
            </div>
          </div>
          {/* Donation List Title */}
          <div className="!text-[#191919] text-lg font-bold font-['Roboto'] leading-tight mb-6">
            유기 동물 전체 목록
          </div>

          {/* Donation List Table */}
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)]">
            {/* List Header */}
            <div className="px-7 py-7 border-b border-[#dee1e8]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    [
                  </span>
                  <div className="mx-1">
                    <span className="!text-[#191919] text-sm font-semibold">
                      전체 항목 총{" "}
                    </span>
                    <span className="!text-[#235fd9] text-sm font-bold">0</span>
                    <span className="!text-[#191919] text-sm font-semibold">
                      건
                    </span>
                  </div>

                  <span className="!text-[#191919] text-[15px] font-semibold">
                    ]
                  </span>
                </div>
                <div className="flex gap-3">
                  <select className="w-[131px] h-7 px-3 border border-[#cccccc] !text-[#191919] text-xs">
                    <option>최신순</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="w-full bg-[#f0f3fc] border-t border-[#dee1e8]">
              <div className="flex">
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  등록 코드
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  등록 이름
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  동물 종류
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  동물 품종
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  성별
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  생년월일
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  중성화 상태
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  체중
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  색깔
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  등록일시
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  동물상태
                </div>
                <div className="flex-1 p-3 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                  보호소
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center py-5 gap-4">
              <button className="w-3.5 h-3.5 rotate-180">◀</button>
              <div className="flex gap-5">
                <span className="!text-[#235fd9] text-[13px] font-bold">1</span>
                <span className="!text-[#5a738e] text-[13px]">2</span>
                <span className="!text-[#5a738e] text-[13px]">3</span>
                <span className="!text-[#5a738e] text-[13px]">4</span>
                <span className="!text-[#5a738e] text-[13px]">5</span>
                <span className="!text-[#5a738e] text-[13px]">6</span>
              </div>
              <button className="w-3.5 h-3.5">▶</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterAnimal;
