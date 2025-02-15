// src/components/mypage/mypage2/NicknameChangeSection.jsx
import { useState } from "react";
import api from "../../../api";

const NicknameChangeSection = ({ 
  nickname: initialNickname, 
  onNicknameChange,       // 입력값 변경 시 부모에게 전달하는 콜백
  onNicknameCheckSuccess  // 중복 체크 성공 시 부모에게 알리는 콜백
}) => {
  const [nickname, setNickname] = useState(initialNickname || "");

  const handleNicknameCheck = async () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      const response = await api.get(`/member/join/nickcheck/${nickname}`);
      let data = response.data;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      if (data && data.nicknameCnt === 0) {
        alert("사용 가능한 닉네임입니다.");
        // 중복 체크 성공 시 부모에게 알림
        onNicknameCheckSuccess(nickname);
      } else {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해 주세요.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setNickname(newValue);
    // 만약 입력값이 초기값과 동일하면 자동으로 중복 체크 통과 처리
    if (newValue === initialNickname) {
      onNicknameCheckSuccess(newValue);
    } else {
      // 값이 변경되면 부모에게 전달하여 중복 체크 상태를 초기화(체크 실패)하도록 함
      onNicknameChange(newValue);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-10">
        <p className="w-32 font-bold">닉네임</p>
        <div className="flex gap-4">
          <input
            type="text"
            value={nickname}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-64"
          />
          <button
            onClick={handleNicknameCheck}
            className="cursor-pointer bg-neutral-600 text-white px-6 h-[42px] w-28 rounded text-sm"
          >
            중복 체크
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameChangeSection;
