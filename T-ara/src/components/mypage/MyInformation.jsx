// MyInformation.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api';
import PasswordChangeSection from '../mypage/mypage2/PasswordChangeSection';
import PhoneChangeSection from '../mypage/mypage2/PhoneChangeSection';
import NicknameChangeSection from '../mypage/mypage2/NicknameChangeSection';
import SubscriptionConsentSection from '../mypage/mypage2/SubscriptionConsentSection';
import ProfileImageSection from '../mypage/mypage2/ProfileImageSection';

const MyInformation = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    api
      .get('/member/myinfo')
      .then((response) => {
        const data = response.data;
        // 백엔드에서 반환하는 정보가 user 또는 shelter 키로 들어옴
        if (data.user) {
          setUserInfo(data.user);
        } else if (data.shelter) {
          setUserInfo(data.shelter);
        } else {
          setError('사용자 정보를 찾을 수 없습니다.');
        }
      })
      .catch(() => setError('데이터를 불러오는 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error)   return <div>{error}</div>;

  return (
    <div className="bg-white w-full mx-auto p-5 rounded shadow-md">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold p-3">회원정보</h1>
      </div>
      <hr />

      {/* 기본 정보 섹션 */}
      <div className="w-full bg-gray-200 p-4">
        <div className="flex items-center gap-8">
          <p className="text-xl font-bold">기본정보</p>
          <p>회원정보를 확인해 주세요</p>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex justify-between p-5">
        {/* 왼쪽 정보 영역 */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <div className="flex items-center gap-10">
              <p className="w-32 font-black text-lg">성명</p>
              <p className="text-lg">{userInfo.name || '정보 없음'}</p>
            </div>
            <div className="flex items-center gap-10">
              <p className="w-32 font-black text-lg">아이디</p>
              <p className="text-lg">{userInfo.loginId || '정보 없음'}</p>
            </div>
            <PasswordChangeSection />
            <PhoneChangeSection phone={userInfo.phone} />
            <NicknameChangeSection nickname={userInfo.nickname} />
            <SubscriptionConsentSection />
          </div>
        </div>

        {/* 오른쪽 프로필 사진 영역 */}
        <ProfileImageSection profileImg={userInfo.profileImg} />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-center gap-5 mt-8">
        <button className="bg-red-500 text-white w-[250px] rounded font-bold cursor-pointer">
          회원정보 수정
        </button>
        <button className="border px-6 py-3 w-[250px] rounded font-bold cursor-pointer">
          취소
        </button>
      </div>
    </div>
  );
};

export default MyInformation;
