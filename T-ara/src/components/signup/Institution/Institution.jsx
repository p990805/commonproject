// Institution.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

import ShelterNameInput from "./ShelterNameInput";
import ShelterUniqueIdInput from "./ShelterUniqueIdInput";
import RegionSelect from "./RegionSelect";
import EmailInput from "../Individual/EmailInput";
import UserIdInput from "../Individual/UserIdInput";
import PasswordInput from "../Individual/PasswordInput";
import ConfirmPasswordInput from "../Individual/ConfirmPasswordInput";
import ProfileImageUpload from "../Individual/ProfileImageUpload";
import TermsAgreement from "../Individual/TermsAgreement";
import SubmitButtons from "../Individual/SubmitButtons";
import PhoneInput from "../Individual/PhoneInput";

const Institution = () => {
  const navigate = useNavigate();

  // 폼 데이터 상태
  const [shelterName, setShelterName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [region, setRegion] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isLoadingUserId, setIsLoadingUserId] = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  const [phone, setPhone] = useState("")

  // 이미지 업로드 상태
  const [profilePreview, setProfilePreview] = useState("/assets/placeholder.png");
  const [profileImage, setProfileImage] = useState(null);

  // 약관 동의 상태
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // 아이디 중복 확인 함수 (개별 컴포넌트에서 호출)
  const handleCheckUserId = async () => {
    if (!userId) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    // 5~10자 영문 소문자/숫자 조합 (영문 소문자 반드시 포함)
    const regex = /^(?=.*[a-z])[a-z0-9]{5,10}$/;
    if (!regex.test(userId)) {
      alert("아이디는 5~10자 영문 소문자/숫자 조합이어야 합니다.");
      return;
    }
    setIsLoadingUserId(true);
    try {
      const response = await api.get(`/member/join/idcheck/${userId}`);
      let data = response.data;
      if (typeof data === "string") data = JSON.parse(data);
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
      setIsLoadingUserId(false);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 파일을 base64 문자열로 변환하는 헬퍼 함수
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // 약관 동의 핸들러
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

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 필수 필드 체크
    if (
      !shelterName ||
      !uniqueId ||
      !region ||
      !emailLocal ||
      !emailDomain ||
      !userId ||
      !password ||
      !confirmPw
    ) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }
    if (!isUserIdChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }
    // 비밀번호 정규식 체크 (영문, 숫자, 특수문자 조합, 8~15자)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 영어, 숫자, 특수문자 조합으로 8~15자여야 합니다.");
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
    const email = `${emailLocal}@${emailDomain}`;

    // API 요청에 맞게 payload 구성
    const payload = {
      cityCategoryId: region, // RegionSelect에서 저장된 지역번호(id)
      name: shelterName,
      email: email,
      loginId: userId,
      password: password,
      phone: phone, // 전화번호 입력이 없는 경우 빈 문자열 처리
      profile: null, // 아래서 base64로 처리
      description: "", // 설명은 빈 문자열 처리
      uniqueNumber: uniqueId,
      address: "", // 주소는 빈 문자열 처리
    };

    // 프로필 이미지 처리 (base64 인코딩)
    if (profileImage) {
      try {
        const base64Image = await fileToBase64(profileImage);
        payload.profile = base64Image;
      } catch (error) {
        console.error("이미지 인코딩 오류:", error);
        alert("프로필 이미지 처리 중 오류가 발생했습니다.");
        return;
      }
    } else {
      delete payload.profile;
    }

    console.log("전송할 payload:", payload);
    try {
      const res = await api.post("/member/join/shelter", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("회원가입 응답:", res.data);
      alert("회원가입이 완료되었습니다.");
      navigate("/signup/successfulsignup");
    } catch (err) {
      console.error("회원가입 오류:", err);
      if (err.response && err.response.data) {
        console.error("서버 응답 에러 데이터:", err.response.data);
      }
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-2">회원가입</h1>
        <p className="text-gray-600 text-center mb-8">보호소 정보를 알려주세요</p>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <ShelterNameInput shelterName={shelterName} setShelterName={setShelterName} />
            <ShelterUniqueIdInput uniqueId={uniqueId} setUniqueId={setUniqueId} />
            <RegionSelect region={region} setRegion={setRegion} />
            <EmailInput
              emailLocal={emailLocal}
              setEmailLocal={setEmailLocal}
              emailDomain={emailDomain}
              setEmailDomain={setEmailDomain}
            />
            <PhoneInput phone={phone} setPhone={setPhone} />
            <UserIdInput
              userId={userId}
              setUserId={setUserId}
              isUserIdChecked={isUserIdChecked}
              setIsUserIdChecked={setIsUserIdChecked}
              handleCheckUserId={handleCheckUserId}
              isLoadingUserId={isLoadingUserId}
            />
            <PasswordInput password={password} setPassword={setPassword} />
            <ConfirmPasswordInput confirmPw={confirmPw} setConfirmPw={setConfirmPw} />
            <ProfileImageUpload
              profilePreview={profilePreview}
              handleImageChange={handleImageChange}
            />
            <TermsAgreement
              agreeAll={agreeAll}
              handleAgreeAll={handleAgreeAll}
              agreeTerm={agreeTerm}
              handleAgreeTerm={handleAgreeTerm}
              agreePrivacy={agreePrivacy}
              handleAgreePrivacy={handleAgreePrivacy}
            />
            <SubmitButtons handlePrevious={handlePrevious} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Institution;
