import React, { useState, useEffect } from "react";
import SidebarNavigation from "./SidebarNavigation";
import api from "../../api";

const ShelterInfo = () => {
  const [cityCategoryList, setCityCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    shelterId: "",
    cityCategoryId: "",
    name: "",
    email: "",
    phone: "",
    profile: null,
    description: "",
    uniqueNumber: "",
    address: "",
    addressDetail: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCityCategories = async () => {
      try {
        const response = await api.get("/shelter/citycategory");
        setCityCategoryList(response.data.cityCategoryList);
      } catch (error) {
        console.error("Failed to fetch city categories:", error);
      }
    };

    const fetchShelterInfo = async () => {
      try {
        const response = await api.get("/member/myinfo");
        const shelterData = response.data.shelter;

        // Split address if it contains multiple parts
        const addressParts = shelterData.address.split(",");

        setFormData({
          shelterId: shelterData.shelterId || "",
          cityCategoryId: shelterData.cityCategoryId || "",
          loginId: shelterData.loginId || "",
          name: shelterData.name || "",
          email: shelterData.email || "",
          phone: shelterData.phone || "",
          profile: shelterData.profile || null,
          description: shelterData.description || "",
          uniqueNumber: shelterData.uniqueNumber || "",
          address: addressParts[0] || "",
          addressDetail: addressParts[1] || "",
        });

        // Set image preview if profile exists
        if (shelterData.profile) {
          setImagePreview(shelterData.profile);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch shelter information:", error);
        setIsLoading(false);
      }
    };

    // 두 함수 동시 호출
    Promise.all([fetchCityCategories(), fetchShelterInfo()]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine address into a single string
      const combinedAddress = formData.addressDetail
        ? `${formData.address},${formData.addressDetail}`
        : formData.address;

      // 수정된 API 엔드포인트와 데이터 구조에 맞게 변경
      const submitData = {
        name: formData.name,
        loginId: formData.loginId, // 로그인 ID로 이메일 사용
        email: formData.email,
        phone: formData.phone,
        profile: formData.profile,
        description: formData.description,
        uniqueNumber: formData.uniqueNumber,
        address: combinedAddress,
      };

      const response = await api.put("/shelter/modify", submitData, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 변경
        },
      });

      alert("정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("Failed to update shelter information:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  const handleWithdrawal = async () => {
    try {
      await axios.delete("/member/withdrawal");
      alert("회원 탈퇴가 완료되었습니다.");
      // Redirect to main page or login page
      // window.location.href = "/";
    } catch (error) {
      console.error("Failed to withdraw:", error);
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    }
    setShowModal(false);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed text-center">
              보호소 정보 수정
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-lg shadow-lg p-6"
          >
            {/* 보호소 이름 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                보호소 이름
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* 이메일 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* 전화번호 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* 설명 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 고유번호 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                고유번호
              </label>
              <input
                type="text"
                name="uniqueNumber"
                value={formData.uniqueNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* 지역 카테고리 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지역 카테고리
              </label>
              <select
                name="cityCategoryId"
                value={formData.cityCategoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">지역을 선택해주세요</option>
                {cityCategoryList.map((category) => (
                  <option
                    key={`category-${category.cityCategoryId}`}
                    value={category.cityCategoryId}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 주소 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주소
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="주소"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* 수정하기 버튼 */}
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                수정하기
              </button>
            </div>
          </form>

          {/* 탈퇴하기 버튼 */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-red-600 hover:text-red-700 hover:underline text-sm"
            >
              보호소 탈퇴하기
            </button>
          </div>
        </div>
      </div>

      {/* 탈퇴 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4">정말로 탈퇴하시겠습니까?</h2>
            <p className="text-gray-600 mb-6">
              탈퇴하시면 모든 데이터가 삭제되며 복구할 수 없습니다. 정말로
              탈퇴하시겠습니까?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleWithdrawal}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterInfo;
