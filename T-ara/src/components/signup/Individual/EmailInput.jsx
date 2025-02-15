import { useState } from "react";

const EmailInput = ({ emailLocal, setEmailLocal, emailDomain, setEmailDomain }) => {
  // 직접 입력 여부 상태: true이면 직접 입력, false이면 preset 선택
  const [isCustom, setIsCustom] = useState(true);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      // 직접 입력 선택
      setIsCustom(true);
      setEmailDomain(""); // 사용자가 입력할 수 있도록 초기화
    } else {
      // preset 도메인 선택
      setIsCustom(false);
      setEmailDomain(value);
    }
  };

  return (
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
          required={isCustom} // 직접 입력일 때만 required
          disabled={!isCustom} // preset 선택 시 비활성화
        />
        <select
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
          onChange={handleSelectChange}
          value={isCustom ? "" : emailDomain}
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
  );
};

export default EmailInput;
