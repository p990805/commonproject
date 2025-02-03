import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api";

const Individual = () => {
  const navigate = useNavigate();

  // 폼 데이터 상태들
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isLoadingNickname, setIsLoadingNickname] = useState(false);
  const [isLoadingUserId, setIsLoadingUserId] = useState(false);

  // 이미지 업로드
  const [profilePreview, setProfilePreview] = useState("/assets/placeholder.png");
  const [profileImage, setProfileImage] = useState(null);

  // 약관 동의
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // 중복확인 상태
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);

  const handleCheckNickname = async () => {
    if (!nickname || typeof nickname !== "string") {
      alert("닉네임을 올바르게 입력해 주세요.");
      return;
    }
  
    if (isLoadingNickname) return; // 중복 요청 방지
    setIsLoadingNickname(true);
  
    try {
      const response = await api.get(`/member/join/nickcheck/${nickname}`);
      console.log("닉네임 확인 응답:", response.data);
  
      // 응답 데이터가 문자열이면 JSON으로 파싱합니다.
      let data;
      if (typeof response.data === "string") {
        try {
          data = JSON.parse(response.data);
        } catch (err) {
          throw new Error("응답 데이터를 JSON으로 파싱할 수 없습니다.");
        }
      } else {
        data = response.data;
      }
  
      // 백엔드에서 반환하는 프로퍼티 이름이 idCnt이므로 확인합니다.
      if (!data || data.nicknameCnt === undefined) {
        throw new Error("유효하지 않은 응답 데이터입니다.");
      }
  
      const nicknameCount = parseInt(data.nicknameCnt, 10);
      if (isNaN(nicknameCount)) {
        throw new Error("닉네임 데이터가 올바르지 않습니다.");
      }
  
      if (nicknameCount === 0) {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      } else {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해 주세요.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsNicknameChecked(false);
    } finally {
      setIsLoadingNickname(false);
    }
  };
  


  const handleCheckUserId = async () => {
    if (!userId) {
      alert("아이디를 입력해 주세요.");
      return;
    }
  
    setIsLoadingUserId(true); // 아이디 확인 로딩 시작
    try {
      // 실제 API 요청 (encodeURIComponent로 URL 인코딩)
      const response = await api.get(`/member/join/idcheck/${userId}`);
  
      // 응답 데이터 확인
      console.log("아이디 확인 응답:", response.data);
  
      // 응답 데이터가 문자열이면 JSON으로 파싱합니다.
      let data;
      if (typeof response.data === "string") {
        try {
          data = JSON.parse(response.data);
        } catch (err) {
          throw new Error("응답 데이터를 JSON으로 파싱할 수 없습니다.");
        }
      } else {
        data = response.data;
      }
  
      // 백엔드에서 반환하는 프로퍼티가 idCnt인지 확인합니다.
      if (!data || data.idCnt === undefined) {
        throw new Error("유효하지 않은 응답 데이터입니다.");
      }
  
      const idCount = parseInt(data.idCnt, 10);
      if (isNaN(idCount)) {
        throw new Error("유효하지 않은 응답 데이터입니다.");
      }
  
      if (idCount === 0) {
        alert("사용 가능한 아이디입니다.");
        setIsUserIdChecked(true);
      } else {
        alert("이미 사용 중인 아이디입니다. 다른 아이디를 선택해 주세요.");
        setIsUserIdChecked(false);
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
      alert("아이디 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsUserIdChecked(false);
    } finally {
      setIsLoadingUserId(false); // 아이디 확인 로딩 종료
    }
  };
  
  // 이미지 업로드
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(file);

    // 미리보기
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // 약관 전체 동의
  const handleAgreeAll = (checked) => {
    setAgreeAll(checked);
    setAgreeTerm(checked);
    setAgreePrivacy(checked);
  };
  const handleAgreeTerm = (checked) => {
    setAgreeTerm(checked);
    setAgreeAll(checked && agreePrivacy);
  };
  const handleAgreePrivacy = (checked) => {
    setAgreePrivacy(checked);
    setAgreeAll(checked && agreeTerm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 필수 정보 유효성 검사
    if (!name || !birth || !nickname || !phone || !emailLocal || !userId || !password || !confirmPw) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }
    if (!isNicknameChecked) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }
    if (!isUserIdChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }
    if (password !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreeTerm || !agreePrivacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
  
    // 이메일 조합
    const email = `${emailLocal}@${emailDomain || ""}`;
  
    // 전송할 데이터 객체 생성
    const payload = {
      name,
      birth,
      nickname,
      phone,
      email,
      loginId: userId,
      password,
      // 프로필 이미지는 선택 사항이므로, 없으면 포함하지 않습니다.
    };
  
    // 프로필 이미지가 선택된 경우, base64 문자열로 변환 후 payload에 추가
    if (profileImage) {
      try {
        const base64Image = await fileToBase64(profileImage);
        payload.profileImage = base64Image;
      } catch (error) {
        console.error("이미지 인코딩 오류:", error);
        alert("프로필 이미지 처리 중 오류가 발생했습니다.");
        return;
      }
    }
  
    // JSON 형식으로 회원가입 요청 전송 (Content-Type은 브라우저가 자동으로 올바르게 설정하도록 합니다.)
    api.post("/member/join/user", payload, {
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        alert("회원가입이 완료되었습니다.");
        navigate("/signup/successfulsignup");
      })
      .catch(err => {
        console.error("회원가입 오류:", err);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };
  

  return (
    <div className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-2">회원가입</h1>
        <p className="text-gray-600 text-center mb-8">회원정보를 입력해 주세요.</p>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 이름 */}
            <div>
              <label className="block font-medium mb-1">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="이름을 입력해주세요."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* 생년월일 */}
            <div>
              <label className="block font-medium mb-1">
                생년월일 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                required
              />
            </div>

            {/* 닉네임 */}
            <div>
              <label className="block font-medium mb-1">
                닉네임 <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setIsNicknameChecked(false);
                  }}
                  required
                />
                <button
                  type="button"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCheckNickname}
                >
                  중복확인
                </button>
              </div>
              <span className="text-sm text-gray-400 block pt-1">
                5~10자 영문 소문자/숫자 조합
              </span>
            </div>

            {/* 휴대폰 번호 */}
            <div>
              <label className="block font-medium mb-1">
                휴대폰 번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="'-'를 제외하고 숫자만 입력"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="block font-medium mb-1">
                이메일 <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                  value={emailLocal}
                  onChange={(e) => setEmailLocal(e.target.value)}
                  required
                />
                <span className="py-2 text-gray-700">@</span>
                <input
                  type="text"
                  placeholder="도메인을 입력해주세요."
                  className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  required
                />
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                  onChange={(e) => setEmailDomain(e.target.value)}
                  required
                >
                  <option value="">직접입력</option>
                  <option value="gmail.com">@gmail.com</option>
                  <option value="naver.com">@naver.com</option>
                  <option value="daum.net">@daum.net</option>
                </select>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                해당 이메일로 알람 및 후원 관련 안내가 발송됩니다.
              </p>
            </div>

            {/* 아이디 */}
            <div>
              <label className="block font-medium mb-1">
                아이디 <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setIsUserIdChecked(false);
                  }}
                  required
                />
                <button
                  type="button"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCheckUserId}
                >
                  중복확인
                </button>
              </div>
              <span className="text-sm text-gray-400 block pt-1">
                5~10자 영문 소문자/숫자 조합
              </span>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block font-medium mb-1">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="text-sm text-gray-400 block pt-1">
                영문, 숫자, 특수문자 조합 8~15자
              </span>
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block font-medium mb-1">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호 확인을 위해 한번 더 입력해주세요."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                required
              />
            </div>

            {/* 프로필 사진 업로드 */}
            <div>
              <label className="block font-medium mb-1">프로필 사진</label>
              <div className="flex items-center space-x-4">
                <div className="w-30 h-35 border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="프로필"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">사진 업로드 가이드</h3>
                  <p className="text-gray-400 text-xs">
                    권장 해상도: 200 x 200(px)<br />
                    파일 양식: JPG, JPEG, PNG<br />
                    최대 용량: 5MB 이하
                  </p>
                  <label
                    htmlFor="profileUpload"
                    className="whitespace-nowrap bg-gray-800 text-white px-4 py-3 rounded hover:bg-gray-600 mt-1 cursor-pointer text-center text-xs"
                  >
                    사진 업로드
                  </label>
                  <input
                    type="file"
                    id="profileUpload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="bg-white p-4 rounded shadow-sm">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-orange-500"
                  checked={agreeAll}
                  onChange={(e) => handleAgreeAll(e.target.checked)}
                />
                <span className="font-bold text-sm">
                  이용약관, 개인정보 수정 및 이용, 세이브더칠드런 활동 안내 수신에 모두 동의합니다.
                </span>
              </label>
              <hr className="my-4" />

              <label className="inline-flex items-center space-x-2 mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-orange-500"
                  checked={agreeTerm}
                  onChange={(e) => handleAgreeTerm(e.target.checked)}
                />
                <p className="flex text-xs">
                  <span className="text-red-500">(필수)</span>
                  서비스 이용약관에 동의합니다.
                </p>
              </label>

              <label className="inline-flex items-center space-x-2 mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-orange-500"
                  checked={agreePrivacy}
                  onChange={(e) => handleAgreePrivacy(e.target.checked)}
                />
                <p className="flex text-xs">
                  <span className="text-red-500">(필수)</span>
                  개인정보 수집 및 이용에 동의합니다.
                </p>
              </label>
            </div>

            {/* 버튼들 */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="w-40 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-600 cursor-pointer text-xs"
                onClick={() => navigate(-1)}
              >
                이전
              </button>
              <button
                type="submit"
                className="w-40 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 cursor-pointer text-xs"
              >
                회원가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Individual;
