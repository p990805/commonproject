import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

import ConfirmPasswordInput from "./ConfirmPasswordInput";
import EmailInput from "./EmailInput";
import NicknameInput from "./NicknameInput";
import PasswordInput from "./PasswordInput";
import PhoneInput from "./PhoneInput";
import ProfileImageUpload from "./ProfileImageUpload";
import SubmitButtons from "./SubmitButtons";
import TermsAgreement from "./TermsAgreement";
import UserIdInput from "./UserIdInput";
import NameInput from "./NameInput";

const Individual = () => {
    const navigate = useNavigate();
  
    // 폼 데이터 상태들
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [emailLocal, setEmailLocal] = useState("");
    const [emailDomain, setEmailDomain] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [isLoadingNickname, setIsLoadingNickname] = useState(false);
    const [isLoadingUserId, setIsLoadingUserId] = useState(false);
  
    // 이미지 업로드 상태
    const [profilePreview, setProfilePreview] = useState(
      "/assets/placeholder.png"
    );
    const [profileImage, setProfileImage] = useState(null);
  
    // 약관 동의 상태
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeTerm, setAgreeTerm] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
  
    // 중복확인 상태
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  
    // 닉네임 중복 확인
    const handleCheckNickname = async () => {
        if (!nickname || typeof nickname !== "string") {
          alert("닉네임을 올바르게 입력해 주세요.");
          return;
        }
      
        // 닉네임 길이 5~10자 체크
        if (nickname.length < 5 || nickname.length > 10) {
          alert("닉네임은 5~10자 영문 소문자/숫자 조합이어야 합니다.");
          return;
        }
      
        if (isLoadingNickname) return;
        setIsLoadingNickname(true);
        try {
          const response = await api.get(`/member/join/nickcheck/${nickname}`);
          let data = response.data;
          if (typeof data === "string") data = JSON.parse(data);
          if (!data || data.nicknameCnt === undefined) {
            throw new Error("유효하지 않은 응답 데이터입니다.");
          }
          const nicknameCount = parseInt(data.nicknameCnt, 10);
          if (isNaN(nicknameCount))
            throw new Error("닉네임 데이터가 올바르지 않습니다.");
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
  
    // 아이디 중복 확인
    const handleCheckUserId = async () => {
        if (!userId) {
          alert("아이디를 입력해 주세요.");
          return;
        }
      
        // 5~10자 영문 소문자/숫자 조합 체크 (정규식)
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
  
    // 파일을 base64 문자열로 변환
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
    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
      e.preventDefault();

      // 필수 정보 유효성 검사
      if (
        !name ||
        !nickname ||
        !phone ||
        !emailLocal ||
        !emailDomain ||
        !userId ||
        !password ||
        !confirmPw
      ) {
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

      // 비밀번호 정규식 체크: 영어, 숫자, 특수문자 조합, 8~15자
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/;
      if (!passwordRegex.test(password)) {
        alert("비밀번호는 영어, 숫자, 특수문자 조합으로 8~15자여야 합니다.");
        return;
      }

      // 비밀번호와 확인 값이 일치하는지 체크
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
      let payload = {
        name,
        email,
        loginId: userId,
        password,
        phone,
        nickname,
        profileImage,
      };

      // 프로필 이미지 처리
      if (profileImage) {
        try {
          const base64Image = await fileToBase64(profileImage);
          payload.profileImage = base64Image;
        } catch (error) {
          console.error("이미지 인코딩 오류:", error);
          alert("프로필 이미지 처리 중 오류가 발생했습니다.");
          return;
        }
      } else {
        delete payload.profileImage;
      }

      console.log("전송할 payload:", payload);
      try {
        const res = await api.post("/member/join/user", payload, {
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
          <p className="text-gray-600 text-center mb-8">
            회원정보를 입력해 주세요.
          </p>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <NameInput name={name} setName={setName} />
              <NicknameInput
                nickname={nickname}
                setNickname={setNickname}
                isNicknameChecked={isNicknameChecked}
                setIsNicknameChecked={setIsNicknameChecked}
                handleCheckNickname={handleCheckNickname}
                isLoadingNickname={isLoadingNickname}
              />
              <PhoneInput phone={phone} setPhone={setPhone} />
              <EmailInput
                emailLocal={emailLocal}
                setEmailLocal={setEmailLocal}
                emailDomain={emailDomain}
                setEmailDomain={setEmailDomain}
              />
              <UserIdInput
                userId={userId}
                setUserId={setUserId}
                isUserIdChecked={isUserIdChecked}
                setIsUserIdChecked={setIsUserIdChecked}
                handleCheckUserId={handleCheckUserId}
                isLoadingUserId={isLoadingUserId}
              />
              <PasswordInput password={password} setPassword={setPassword} />
              <ConfirmPasswordInput
                confirmPw={confirmPw}
                setConfirmPw={setConfirmPw}
              />
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
  
  export default Individual;