import React, { useState } from 'react';
import api from '../../api'

const CheckPassword = ({ onPasswordChecked }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheck = async () => {
    try {
      // api 인스턴스를 사용하여 비밀번호 확인 API 호출
      const response = await api.post('/member/passwordcheck', { password });
      if (response.status === 200) {
        onPasswordChecked(); // 비밀번호 인증 성공 시 콜백 실행
      }
    } catch (error) {
      // API 에러 메시지가 존재하면 표시, 아니면 기본 메시지 표시
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("비밀번호 확인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="p-4 h-full">
      <h1 className="text-3xl font-bold pl-2">회원정보</h1>
      <hr className="mt-3 w-full" />
      <div className="h-180 flex flex-col items-center justify-center gap-10">
        <p className="text-xl">
          회원정보 조회를 위해서는 인증이 필요합니다. <br />
          보안을 위해 비밀번호를 한번 더 입력해 주세요.
        </p>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 w-[550px] h-[50px]"
        />
        <button
          onClick={handleCheck}
          className="bg-red-500 text-white font-bold w-[200px] h-[50px]"
        >
          확인
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CheckPassword;
