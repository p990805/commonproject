// RegionSelect.jsx
import React from "react";

const RegionSelect = ({ region, setRegion }) => {
  // 각 옵션에 지역번호(id)와 라벨 지정
  const regionOptions = [
    { id: "", label: "지역선택" },
    { id: "3", label: "인천" },
    { id: "1", label: "서울" },
    { id: "2", label: "경기" },
    { id: "4", label: "강원" },
    { id: "5", label: "충북" },
    { id: "6", label: "대전/충남/세종" },
    { id: "7", label: "대구/경북" },
    { id: "8", label: "전북" },
    { id: "9", label: "광주/전남" },
    { id: "10", label: "부산/울산/경남" },
    { id: "11", label: "제주" },
  ];

  return (
    <div>
      <label className="block font-medium mb-1">
        지역 <span className="text-red-500">*</span>
      </label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        required
      >
        {regionOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelect;
