// src/components/shelter/ShelterDonation.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { logout } from "../../features/auth/authSlice";
import SidebarNavigation from "./SidebarNavigation";

const ShelterDonation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    api
      .get("/member/logout") // 백엔드의 @GetMapping("/logout") 엔드포인트 호출
      .then((response) => {
        toast.success("로그아웃이 완료되었습니다.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userProfile");
        dispatch(logout());
        navigate("/"); // 로그아웃 후 홈 또는 로그인 페이지로 이동
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
        toast.error("로그아웃 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-4">
          {/* Dashboard Title */}
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              후원금 대시보드
            </h1>
          </div>
          {/* Dashboard Stats */}
          <div className="w-full h-[130px] relative bg-gradient-to-r from-[#5e9dfc] via-[#6085ef] to-[#5c6efe] rounded-[10px] shadow-[3px_3px_10px_0px_rgba(151,152,159,0.25)] flex items-center justify-between px-16 mb-12">
            {/* Today's Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                오늘 후원받은 금액
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">
                  503,165
                </span>
                <span className="!text-white/70 text-lg ml-2">원</span>
              </div>
            </div>

            {/* Total Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                총 후원받은 금액
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">
                  623,503,165
                </span>
                <span className="!text-white/70 text-lg ml-2">원</span>
              </div>
            </div>

            {/* Today's Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                오늘 후원자 수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">15</span>
                <span className="!text-white/70 text-lg ml-2">명</span>
              </div>
            </div>

            {/* Total Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                전체 후원자 수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">255</span>
                <span className="!text-white/70 text-lg ml-2">명</span>
              </div>
            </div>
          </div>

          {/* Search Filters */}
          <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
            <div className="border border-[#dee1e8]">
              {/* Period Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    기간
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
                    분류
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                      />
                      <span className="!text-[#575757] text-xs font-medium">
                        일반
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                      />
                      <span className="!text-[#575757] text-xs font-medium">
                        정기
                      </span>
                    </label>
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
            후원 전체 목록
          </div>

          {/* Donation List Table */}
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
            {/* List Header */}
            <div className="px-3 py-3 border-b border-[#dee1e8]">
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

            {/* Table Container with margin */}
            <div className="mx-4 my-4">
              {/* Table Header */}
              <div className="w-full bg-[#f0f3fc] border-t border-[#dee1e8]">
                <div className="flex">
                  <div className="w-[4%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-[#767676] rounded-sm"
                    />
                  </div>
                  <div className="w-[8%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    후원 번호
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    후원자명
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    후원자 아이디
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    후원 분류
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    후원 대상
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    후원 금액
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    후원일시
                  </div>
                  <div className="w-[16%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center">
                    담당 보호소
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDonation;
