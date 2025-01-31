import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  // 닉네임 중복확인
  const handleCheckNickname = async () => {
    if (!nickname) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    try {
      // GET 요청으로 닉네임 중복 확인
      const response = await axios.get(`/member/nickcheck/${encodeURIComponent(nickname)}`);

      if (response.data.success) {
        alert(response.data.message || "사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      } else {
        alert(response.data.message || "이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 아이디 중복확인 (예시)
  const handleCheckUserId = async () => {
    if (!userId) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    try {
      // const response = await axios.post('/api/check-id', { userId });
      const response = { data: { success: true, message: "사용 가능한 아이디입니다." } }; // 데모
      if (response.data.success) {
        alert(response.data.message);
        setIsUserIdChecked(true);
      } else {
        alert(response.data.message);
        setIsUserIdChecked(false);
      }
    } catch (error) {
      console.error(error);
      alert("아이디 중복 확인 중 오류가 발생했습니다.");
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

  // 회원가입 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    // 간단한 유효성 검사
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

    // 서버에 전송할 데이터
    const formData = new FormData();
    formData.append("name", name);
    formData.append("birth", birth);
    formData.append("nickname", nickname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("userId", userId);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    // 실제 회원가입 요청 (예시)
    axios.post("/api/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      })
      .catch(err => console.error(err));

    alert("회원가입 완료 (데모용)");
    navigate("/");
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
