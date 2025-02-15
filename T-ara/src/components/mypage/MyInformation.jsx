// src/pages/MyInformation.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import PasswordChangeSection from '../mypage/mypage2/PasswordChangeSection';
import PhoneChangeSection from '../mypage/mypage2/PhoneChangeSection';
import NicknameChangeSection from '../mypage/mypage2/NicknameChangeSection';
import SubscriptionConsentSection from '../mypage/mypage2/SubscriptionConsentSection';
import ProfileImageSection from '../mypage/mypage2/ProfileImageSection';

const MyInformation = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [originalNickname, setOriginalNickname] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [nicknameChecked, setNicknameChecked] = useState(true); // 초기에는 기존 값이 체크된 것으로 가정
  // flaggedImage: 삭제 대상으로 지정된 이미지 URL (추후 회원정보 수정 성공 후 삭제할 대상)
  const [flaggedImage, setFlaggedImage] = useState(null);
  const nav = useNavigate();
 
  useEffect(() => {
    api.get('/member/myinfo')
      .then((response) => {
        const data = response.data;
        console.log("내 정보", data.user);
        if (data.user) {
          setUserInfo(data.user);
          setOriginalNickname(data.user.nickname);
        } else if (data.shelter) {
          setUserInfo(data.shelter);
          setOriginalNickname(data.shelter.nickname);
        } else {
          setError('사용자 정보를 찾을 수 없습니다.');
        }
      })
      .catch(() => setError('데이터를 불러오는 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  // 회원정보 수정 버튼 클릭 시 호출되는 함수
  const handleUpdate = async () => {
    if (!nicknameChecked) {
      alert("닉네임 중복 체크를 먼저 완료해주세요.");
      return;
    }
    try {
      const response = await api.put('/member/modify/user', userInfo, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        alert("사용자 정보 수정이 완료되었습니다.");
        // 수정 성공 후 flaggedImage가 있다면 삭제 API 호출
        if (flaggedImage) {
          try {
            const urlObj = new URL(flaggedImage);
            const pathname = urlObj.pathname;
            const key = pathname.startsWith("/profile_img/") 
                          ? pathname.substring("/profile_img/".length)
                          : pathname.substring(1);
            await api.delete("/upload/delete-file", { params: { fileName: key } });
            console.log("삭제 대상 이미지 삭제 성공:", flaggedImage);
          } catch (err) {
            console.error("삭제 대상 이미지 삭제 오류:", err);
          }
        }
        nav("/");
      } else {
        alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원정보 수정 오류:", error);
      alert("서버 오류로 정보 수정에 실패했습니다.");
    }
  };

  // 닉네임 입력 변경 시 부모 콜백
  const handleNicknameChange = (newNickname) => {
    setUserInfo({ ...userInfo, nickname: newNickname });
    if (newNickname === originalNickname) {
      setNicknameChecked(true);
    } else {
      setNicknameChecked(false);
    }
  };

  // 닉네임 중복 체크 성공 시 부모 콜백
  const handleNicknameCheckSuccess = (checkedNickname) => {
    setUserInfo({ ...userInfo, nickname: checkedNickname });
    setNicknameChecked(true);
  };

  // ProfileImageSection에서 이미지 변경 시 호출되는 콜백
  const handleProfileImgChange = (newImgUrl) => {
    setUserInfo({ ...userInfo, profileImg: newImgUrl });
  };

  // ProfileImageSection에서 삭제 대상으로 지정된 이미지 URL을 받는 콜백
  const handleFlagForDeletion = (imgUrl) => {
    setFlaggedImage(imgUrl);
  };

  if (loading) return <div>로딩중...</div>;
  if (error)   return <div>{error}</div>;

  return (
    <div className="bg-white w-full mx-auto p-5 rounded shadow-md">
      <div>
        <h1 className="text-3xl font-bold p-3">회원정보</h1>
      </div>
      <hr />
      <div className="w-full bg-gray-200 p-4">
        <div className="flex items-center gap-8">
          <p className="text-xl font-bold">기본정보</p>
          <p>회원정보를 확인해 주세요</p>
        </div>
      </div>
      <div className="flex justify-between p-5">
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
            <PhoneChangeSection 
              phone={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
            <NicknameChangeSection 
              nickname={userInfo.nickname}
              onNicknameChange={handleNicknameChange}
              onNicknameCheckSuccess={handleNicknameCheckSuccess}
            />
            <SubscriptionConsentSection />
          </div>
        </div>
        <ProfileImageSection 
          profileImg={userInfo.profileImg}
          onProfileImgChange={handleProfileImgChange}
          onFlagForDeletion={handleFlagForDeletion}
        />
      </div>
      <div className="flex justify-center gap-5 mt-8">
        <button 
          onClick={handleUpdate}
          className="bg-red-500 text-white w-[250px] rounded font-bold cursor-pointer"
        >
          회원정보 수정
        </button>
        <button 
          className="border px-6 py-3 w-[250px] rounded font-bold cursor-pointer"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default MyInformation;
