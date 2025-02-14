import React, { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";

const ShelterInfo = () => {
  const [formData, setFormData] = useState({
    name: "행복보호소",
    email: "happy@shelter.com",
    phone: "02-1234-5678",
    profile_image: null,
    description: "행복한 보호소입니다.",
    registration_number: "제1234-5678호",
    address: "서울특별시 강남구 테헤란로 123",
    address_detail: "4층",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        profile_image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // API 호출 로직 추가
  };

  const handleWithdrawal = () => {
    console.log("회원 탈퇴 처리");
    setShowModal(false);
    // API 호출 로직 추가
  };

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
            {/* 프로필 이미지 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프로필 이미지
              </label>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 border rounded-full overflow-hidden">
                  <img
                    src={imagePreview || "/default-profile.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  name="profile_image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

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
                name="registration_number"
                value={formData.registration_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="address_detail"
                  value={formData.address_detail}
                  onChange={handleInputChange}
                  placeholder="상세주소"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
