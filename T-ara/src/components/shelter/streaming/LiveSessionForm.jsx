// src/components/streaming/LiveSessionForm.jsx
import React from "react";

const LiveSessionForm = ({ form, handleChange, handleSubmit }) => {
  // 뒤로가기 버튼 클릭 시 호출하는 핸들러
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      {/* 뒤로가기 버튼 */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 text-blue-500 hover:underline"
      >
        뒤로가기
      </button>
      
      <h2 className="text-2xl font-bold mb-4">라이브 방송 시작</h2>
      <form onSubmit={handleSubmit}>
        {/* 보호소 ID 입력 */}
        <div className="mb-4">
          <label htmlFor="shelterId" className="block text-gray-700 mb-2">
            보호소 ID
          </label>
          <input
            type="number"
            id="shelterId"
            name="shelterId"
            value={form.shelterId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="보호소 ID를 입력하세요"
            required
          />
        </div>

        {/* 데이터 소스 선택 */}
        <div className="mb-4">
          <label htmlFor="dataSource" className="block text-gray-700 mb-2">
            데이터 소스
          </label>
          <select
            id="dataSource"
            name="dataSource"
            value={form.dataSource}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="shelter">보호소</option>
            <option value="animal">동물</option>
          </select>
        </div>

        {/* 방송 제목 입력 */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            방송 제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="방송 제목을 입력하세요"
            required
          />
        </div>

        {/* 방송 설명 입력 */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            방송 설명
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="방송 설명을 입력하세요"
            rows="3"
          ></textarea>
        </div>

        {/* 참가자명 입력 */}
        <div className="mb-4">
          <label htmlFor="participantName" className="block text-gray-700 mb-2">
            참가자명
          </label>
          <input
            type="text"
            id="participantName"
            name="participantName"
            value={form.participantName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="참가자명을 입력하세요"
            required
          />
        </div>

        {/* 방송 시작 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          방송 시작
        </button>
      </form>
    </div>
  );
};

export default LiveSessionForm;
