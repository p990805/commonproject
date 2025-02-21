import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import api from "../api";
import AnimalCard from "../components/animal/AnimalCard";
import CampaignCard from "../components/campaign/CampaignCard";

const ShelterDetailPage = () => {
  const [shelter, setShelter] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationStats, setDonationStats] = useState({
    monthly: 0,
    general: 0,
    campaign: 0,
  });
  const [expenseData, setExpenseData] = useState([]);

  const shelterId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          shelterResponse,
          animalsResponse,
          campaignsResponse,
          expenseSumResponse,
        ] = await Promise.all([
          api.get(`/shelter/info/${shelterId}`),
          api.get(`/animal/list/user?shelterId=${shelterId}`),
          api.get(`/campaigns`),
          api.get(`/analyze/category/${shelterId}`),
        ]);

        const shelterData = shelterResponse.data.shelter;
        setShelter(shelterData);
        setAnimals(animalsResponse.data.message || []);

        const currentDate = new Date();
        const filteredCampaigns = (campaignsResponse.data || [])
          .filter(
            (campaign) =>
              campaign.shelterName === shelterData.name &&
              new Date(campaign.endedAt) > currentDate
          )
          .map((campaign) => ({
            ...campaign,
            id: campaign.campaignId.toString(),
          }));

        setCampaigns(filteredCampaigns);

        // 지출 데이터 처리
        const expenseList = expenseSumResponse.data.sumList.map((item) => ({
          name: item.categoryName,
          value: item.categorySum,
          color: getExpenseColor(item.categoryId),
        }));
        setExpenseData(expenseList);

        // 후원 통계 가져오기
        const [monthlyRes, generalRes, campaignRes] = await Promise.all([
          api.get(`/analyze/count/${shelterId}?donationCategory=monthly`),
          api.get(`/analyze/count/${shelterId}?donationCategory=general`),
          api.get(`/analyze/count/${shelterId}/campaign`),
        ]);

        const monthlyAmount = parseInt(monthlyRes.data.donationCnt || 0);
        const generalAmount = parseInt(generalRes.data.donationCnt || 0);
        const campaignAmount = parseInt(campaignRes.data.campaignCnt || 0);

        setDonationStats({
          monthly: monthlyAmount,
          general: generalAmount,
          campaign: campaignAmount,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shelterId]);

  // 지출 카테고리별 색상 지정
  const getExpenseColor = (categoryId) => {
    const colors = {
      1: "#4B89DC", // 위생용품
      2: "#37B24D", // 의약품/의료용품
      3: "#FAB005", // 장난감/의류
      4: "#15AABF", // 사료/간식
      5: "#7950F2", // 설비/기자재
      6: "#E64980", // 기타
    };
    return colors[categoryId] || "#999999";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotal = () => {
    return (
      donationStats.monthly + donationStats.general + donationStats.campaign
    );
  };

  // 총 지출 계산
  const calculateTotalExpense = () => {
    return expenseData.reduce((sum, item) => sum + item.value, 0);
  };

  if (loading) return <div className="max-w-6xl mx-auto p-8">로딩 중...</div>;
  if (error)
    return (
      <div className="max-w-6xl mx-auto p-8 text-red-500">에러: {error}</div>
    );
  if (!shelter)
    return (
      <div className="max-w-6xl mx-auto p-8">
        보호소 정보를 찾을 수 없습니다.
      </div>
    );

  const total = calculateTotal();
  const totalExpense = calculateTotalExpense();

  const incomeData = [
    { name: "정기후원", value: donationStats.monthly, color: "#37B24D" },
    { name: "일시후원", value: donationStats.general, color: "#4B89DC" },
    { name: "캠페인후원", value: donationStats.campaign, color: "#FAB005" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">{shelter.name}</h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">고유번호</p>
            <p className="font-bold">{shelter.uniqueNumber || "정보 없음"}</p>
          </div>
          <div>
            <p className="text-gray-600">전화번호</p>
            <p className="font-bold">{shelter.phone || "정보 없음"}</p>
          </div>
          <div>
            <p className="text-gray-600">이메일</p>
            <p className="font-bold">{shelter.email || "정보 없음"}</p>
          </div>
          <div>
            <p className="text-gray-600">설명</p>
            <p className="font-bold">{shelter.description || "정보 없음"}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">보호센터주소</p>
          <p className="font-bold">{shelter.address || "정보 없음"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">후원내역</h2>
          <div className="space-y-2">
            {total > 0 ? (
              <>
                <div className="flex justify-between">
                  <span>정기 후원</span>
                  <span>{formatCurrency(donationStats.monthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span>일시 후원</span>
                  <span>{formatCurrency(donationStats.general)}</span>
                </div>
                <div className="flex justify-between">
                  <span>캠페인 후원</span>
                  <span>{formatCurrency(donationStats.campaign)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>후원 총액</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                현재 후원 내역이 없습니다.
              </div>
            )}
          </div>
          {total > 0 && (
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      value={formatCurrency(total)}
                      position="center"
                      fill="#000000"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4">
                {incomeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">지출내역</h2>
          <div className="space-y-2">
            {expenseData.length > 0 ? (
              <>
                {expenseData.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{formatCurrency(item.value)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>지출합계</span>
                  <span>{formatCurrency(totalExpense)}</span>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                현재 지출 내역이 없습니다.
              </div>
            )}
          </div>
          {expenseData.length > 0 && (
            <div className="h-64 mt-4 mb-20">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      value={formatCurrency(totalExpense)}
                      position="center"
                      fill="#000000"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-4">
                {expenseData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">보호중인 동물</h2>
          <span className="text-gray-500">총 {animals.length}마리</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {animals.map((animal) => (
            <AnimalCard
              key={animal.animalId}
              animal={{
                ...animal,
                thumbnailUrl: animal.thumbnailUrl || null,
                shelterName: shelter.name,
              }}
            />
          ))}
          {animals.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              현재 보호중인 동물이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 진행중인 캠페인 프로젝트 섹션*/}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">진행중인 캠페인 프로젝트</h2>
          <span className="text-gray-500">총 {campaigns.length}개</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
          {campaigns.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              현재 진행중인 캠페인이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterDetailPage;
