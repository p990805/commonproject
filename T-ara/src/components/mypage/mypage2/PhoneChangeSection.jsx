const PhoneChangeSection = ({ phone }) => {
    return (
      <div className="mb-4">
        <div className="flex items-center gap-10">
          <p className="w-32 font-black text-lg">휴대폰 번호</p>
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <input
                type="text"
                defaultValue={phone || '번호 없음'}
                className="border rounded px-4 py-2 w-64"
              />
              <button className="cursor-pointer bg-neutral-600 text-white h-[42px] px-5 rounded text-sm flex items-center justify-center">
                연락처 변경
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              안전한 개인정보 보호를 위해 휴대폰 번호 변경 시, 본인 인증이 필요합니다.
              <br />
              (단,14세 미만 혹은 기업/단체 후원자 휴대폰 인증 불가)
            </p>
          </div>
        </div>
      </div>
    );
  };
export default PhoneChangeSection;  