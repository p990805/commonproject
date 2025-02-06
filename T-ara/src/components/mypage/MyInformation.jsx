import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyInformation = () => {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기

    axios
      .get('http://localhost:8090/member/myinfo', {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        const data = response.data;
        if (data.user) setUserInfo(data.user);
        else setError('사용자 정보를 찾을 수 없습니다.');
      })
      .catch(() => setError('데이터를 불러오는 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩중...</div>; // 로딩 중일 때
  if (error) return <div>{error}</div>; // 에러 발생 시

  return (
    <div className="bg-white w-full  mx-auto p-5 rounded shadow-md">
      {/* Header */}
      <div className="">
        <h1 className="text-3xl font-bold p-3">회원정보</h1>
      </div>
      <hr />

      {/* 기본 정보 */}
      <div className="w-full bg-gray-200 p-4">
        <div className="flex items-center gap-8">
          <p className="text-xl font-bold">기본정보</p>
          <p>회원정보를 확인해 주세요</p>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className="flex justify-between p-5">
        {/* 왼쪽 정보 */}
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
            <div className="flex items-center gap-10">
                <p className="w-32 font-black text-lg">비밀번호</p>
                <button className="cursor-pointer bg-neutral-600 text-white h-[42px] px-4 flex items-center justify-center rounded text-sm">
                    비밀번호 변경
                </button>
            </div>

            <div>
              <div className="flex items-center gap-10">
                <p className="w-32 font-black text-lg">휴대폰 번호</p>
                <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            defaultValue={userInfo.phone || '번호 없음'}
                            className="border rounded px-4 py-2 w-64"
                        />
                        <button className="cursor-pointer bg-neutral-600 text-white h-[42px] px-5 rounded text-sm flex items-center justify-center">
                        연락처 변경
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                    안전한 개인정보 보호를 위해 휴대폰 번호 변경 시, 본인 인증이 필요합니다.<br/>
                    (단,14세 미만 혹은 기업/단체 후원자 휴대폰 인증 불가)
                    </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <p className="w-32 font-bold">닉네임</p>
              <div className="flex gap-4">
                <input
                    type="text"
                    defaultValue={userInfo.nickname || '닉네임 없음'}
                    className="border rounded px-4 py-2 w-64"
                />
                <button className="cursor-pointer bg-neutral-600 text-white px-5 h-[42px] rounded text-sm">
                    닉네임 변경
                </button>
              </div>
            </div>

            <div className="flex items-center gap-10">
                <p className="w-32 font-bold text-[14px]">티아라 활동안내<br />수신에 동의합니다.</p>
                <div className="flex flex-col justify-center">
                    <div className="flex gap-5">

                        <div className="flex gap-2">
                            <input type="checkbox" id="custom-checkbox-mobile" className="hidden peer" />
                                <label htmlFor="custom-checkbox-mobile"
                                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-400 hover:border-red-300 hover:text-red-300 peer-checked:border-red-400 peer-checked:bg-white peer-checked:text-red-400 transition"
                                >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                                </svg>
                                </label>
                            <p className="font-black text-[20px]">모바일</p>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" id="custom-checkbox-email" className="hidden peer" />
                                <label htmlFor="custom-checkbox-email"
                                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-400 hover:border-red-300 hover:text-red-300 peer-checked:border-red-500 peer-checked:bg-white peer-checked:text-red-500 transition"
                                >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                                </svg>
                                </label>
                            <p className="font-black text-[20px]">이메일</p>
                        </div>
                    </div>

                    <p className="text-[11px] text-gray-500">티아라의 국내외 다양한 활동소식(소식지/연차보고서 등)을 받을 수 있습니다<br/>
                    (후원소식 관련 서비스는 수신동의 여부와 상관없이 발송됩니다.)
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 프로필 사진 */}
        <div className="flex flex-col items-center gap-2 justify-start mr-10 mt-10">
          <img
            src={userInfo.profileImg || '/assets/placeholder.png'}
            alt="프로필사진"
            className="w-42 h-50  bg-gray-100"
          />
          <button className="cursor-pointer bg-neutral-600 text-white px-4 py-2 w-[168px] h-[45px] rounded text-sm">
            사진변경
          </button>
          <p className="text-xs text-gray-400 text-left">
            권장 사이즈: 최소 200x200 이상
            <br />
            파일형식: JPG, JPEG, PNG
            <br />
            최대용량: 5MB 이하
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center gap-5 mt-8">
        <button className="bg-red-500 text-white w-[250PX] rounded font-bold cursor-pointer">
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
