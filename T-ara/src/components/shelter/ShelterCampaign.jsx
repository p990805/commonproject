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
      const response = await api.get("/campaigns");
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
                      {selectedItems.length > 0
                        ? `${selectedItems.length}개의 항목 선택됨`
                        : `전체 항목 총 ${campaigns.length}건`}
                    </span>
                  </div>
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    ]
                  </span>
                </div>
                <div className="flex gap-3 items-center">
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
                  <select className="w-[131px] h-7 px-3 border border-[#cccccc] !text-[#191919] text-xs">
                    <option>최신순</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="mx-4 my-4">
              {/* Table Header */}
              <div className="w-full bg-[#f0f3fc] border-t border-[#dee1e8]">
                <div className="flex">
                  <div className="w-[5%] p-4 border-r border-[#dee1e8] flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-[#767676] rounded-sm"
                      checked={selectedItems.length === campaigns.length}
                      onChange={handleSelectAll}
                    />
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    캠페인 번호
                  </div>
                  <div className="w-[23%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    제목
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    목표금액
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    달성금액
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    시작일시
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    마감일시
                  </div>
                </div>
              </div>

              {/* Table Body */}
              {campaigns.map((campaign) => (
                <div
                  key={campaign.campaignId}
                  className="flex border-b border-[#dee1e8]"
                >
                  <div className="w-[5%] p-4 border-r border-[#dee1e8] flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-[#767676] rounded-sm"
                      checked={selectedItems.includes(campaign.campaignId)}
                      onChange={() => handleSelectItem(campaign.campaignId)}
                    />
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] text-center">
                    <button
                      onClick={() => handleCampaignClick(campaign)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {campaign.campaignId}
                    </button>
                  </div>
                  <div className="w-[23%] p-4 border-r border-[#dee1e8] text-center">
                    {campaign.title}
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] text-center">
                    {campaign.targetAmount?.toLocaleString()}원
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] text-center">
                    {campaign.achievedAmount?.toLocaleString()}원
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] text-center">
                    {new Date(campaign.startedAt).toLocaleString()}
                  </div>
                  <div className="w-[15%] p-4 border-r border-[#dee1e8] text-center">
                    {new Date(campaign.endedAt).toLocaleString()}
                  </div>
                </div>
              ))}
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
