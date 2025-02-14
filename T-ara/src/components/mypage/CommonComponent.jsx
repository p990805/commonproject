import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // axios 인스턴스 등

const CommonComponent = () => {
  const nav = useNavigate();

  const [userName, setUserName] = useState("사용자");
  const [userProfile, setUserProfile] = useState("/assets/default-profile.png");
  const [joinDays, setJoinDays] = useState(null);

  useEffect(() => {
    // localStorage에서 기본 프로필 정보를 불러옵니다.
    const storedName = localStorage.getItem("userName");
    const storedProfile = localStorage.getItem("userProfile");

    if (storedName) setUserName(storedName);
    if (storedProfile) setUserProfile(storedProfile);

    // 서버의 /myinfo API를 호출하여 회원 정보를 가져옵니다.
    const authHeader = { Authorization: localStorage.getItem("authToken") };

    api
      .get("member/myinfo", { headers: authHeader })
      .then((response) => {
        // 서버 응답 데이터 구조: { user: { createdAt, ... } }
        if (response.data.user && response.data.user.createdAt) {
          const createdAtString = response.data.user.createdAt; // "2025-02-04 06:53:38"
          const joinDate = new Date(createdAtString);
          const today = new Date();
          // 두 날짜 사이의 차이를 밀리초 단위로 계산 후 일(day)로 변환합니다.
          const diffTime = Math.abs(today - joinDate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          setJoinDays(diffDays);
        }
      })
      .catch((error) => {
        console.error("회원 정보 불러오기 오류: ", error);
      });
  }, []);

  const goDonate = () => {
    nav("/donate");
  };

  return (
    <div className="w-full border border-gray-200 shadow bg-white flex items-center justify-between h-[250px]">
      {/* 왼쪽 박스: 프로필 정보 */}
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-red-500 rounded-2xl w-[600px] h-[250px] p-5 bg-white shadow-lg">
        <p className="border-2 rounded-2xl border-red-500 w-20 text-center flex items-center justify-center">
          개인
        </p>
        <div className="flex gap-3">
          <img
            src={userProfile}
            alt="프로필이미지"
            className="w-16 h-16 rounded-full object-cover"
          />
          <h1 className="text-[20px] font-black">
            {userName}님, <br />
            반갑습니다.
          </h1>
        </div>
        <p>
          티아라와 함께한지{" "}
          <span className="font-bold">
            {joinDays !== null ? joinDays : "?"}
          </span>
          일
        </p>
      </div>

      {/* 오른쪽 박스: 후원 메시지 */}
      <div className="flex flex-col w-full items-center">
        <h1 className="text-[20px] font-black leading-snug text-center">
          유기동물의 행복을 위한 작은 실천, <br /> 지금, 티아라 후원자가 되어
          주세요!
        </h1>
        <button
          onClick={goDonate}
          className="text-gray-700 hover:text-black transition font-bold border-2 px-6 py-2 rounded-2xl mt-4 flex items-center justify-center border-red-500 w-50"
        >
          후원하기
        </button>
      </div>
    </div>
  );
};

export default CommonComponent;
