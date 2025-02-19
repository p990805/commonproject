import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavigation from "./SidebarNavigation";
import api from "../../api";
import EditCampaignModal from "./EditCampaignModal";

const ShelterCampaign = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const shelterId = localStorage.getItem("shelterId");
      const response = await api.get("/campaigns/shelter");
      const filteredCampaigns = response.data.filter(
        (campaign) => campaign.shelterId === parseInt(shelterId)
      );
      setCampaigns(filteredCampaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleClick = () => {
    navigate(`/shelter/campaign-register`);
  };

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    fetchCampaigns();
    setIsEditModalOpen(false);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(campaigns.map((item) => item.campaignId));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDelete = async () => {
    // 삭제 확인
    const confirmMessage =
      selectedItems.length > 1
        ? `선택하신 ${selectedItems.length}개의 캠페인을 정말 삭제하시겠습니까?`
        : "선택하신 캠페인을 정말 삭제하시겠습니까?";

    if (window.confirm(confirmMessage)) {
      try {
        // 선택된 모든 캠페인에 대해 삭제 요청을 보냄
        await Promise.all(
          selectedItems.map((campaignId) =>
            api.delete(`/campaigns/${campaignId}`)
          )
        );

        // 삭제 후 캠페인 목록 새로고침
        await fetchCampaigns();

        // 선택된 항목 초기화
        setSelectedItems([]);

        // 삭제 완료 알림
        alert("선택하신 캠페인이 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting campaigns:", error);
        alert("캠페인 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              캠페인 후원 대시보드
            </h1>
            <button
              onClick={handleClick}
              className="flex items-center justify-center px-5 h-10 bg-[#2f69dd] text-white text-sm font-medium rounded hover:bg-[#1e51b8] transition-colors"
            >
              캠페인 후원 등록하기
            </button>
          </div>

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
                성공 캠페인 수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">15</span>
                <span className="!text-white/70 text-lg ml-2">개</span>
              </div>
            </div>

            {/* Total Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                전체 캠페인 수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">255</span>
                <span className="!text-white/70 text-lg ml-2">개</span>
              </div>
            </div>
          </div>

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

          {/* Donation List Table */}
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
            {/* 리스트 헤더 */}
            <div className="px-3 py-3 border-b border-[#dee1e8]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    [
                    {selectedItems.length > 0
                      ? `${selectedItems.length}개의 항목 선택됨`
                      : `전체 항목 총 ${campaigns.length}건`}
                    ]
                  </span>
                </div>
                {selectedItems.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="px-4 py-1.5 bg-red-500 text-white rounded text-xs"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f0f3fc]">
                  <tr>
                    <th className="w-[4%] p-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === campaigns.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="w-[12%] p-4 text-left">캠페인 번호</th>
                    <th className="w-[23%] p-4 text-left">제목</th>
                    <th className="w-[15%] p-4 text-left">목표금액</th>
                    <th className="w-[15%] p-4 text-left">달성금액</th>
                    <th className="w-[15%] p-4 text-left">시작일시</th>
                    <th className="w-[15%] p-4 text-left">마감일시</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.campaignId} className="border-b">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(campaign.campaignId)}
                          onChange={() => handleSelectItem(campaign.campaignId)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleCampaignClick(campaign)}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {campaign.campaignId}
                        </button>
                      </td>
                      <td className="p-4">{campaign.title}</td>
                      <td className="p-4">
                        {campaign.targetAmount?.toLocaleString()}원
                      </td>
                      <td className="p-4">
                        {campaign.achievedAmount?.toLocaleString()}원
                      </td>
                      <td className="p-4">
                        {new Date(campaign.startedAt).toLocaleString()}
                      </td>
                      <td className="p-4">
                        {new Date(campaign.endedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditCampaignModal
          campaign={selectedCampaign}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ShelterCampaign;
