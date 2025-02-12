const SubscriptionConsentSection = () => {
    return (
      <div className="mb-4">
        <div className="flex items-center gap-10">
          <p className="w-32 font-bold text-[14px]">
            티아라 활동안내
            <br />
            수신에 동의합니다.
          </p>
          <div className="flex flex-col justify-center">
            <div className="flex gap-5">
              <div className="flex gap-2">
                <input type="checkbox" id="custom-checkbox-mobile" className="hidden peer" />
                <label
                  htmlFor="custom-checkbox-mobile"
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </label>
                <p className="font-black text-[20px]">모바일</p>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="custom-checkbox-email" className="hidden peer" />
                <label
                  htmlFor="custom-checkbox-email"
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </label>
                <p className="font-black text-[20px]">이메일</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-500">
              티아라의 국내외 다양한 활동소식(소식지/연차보고서 등)을 받을 수 있습니다
              <br />
              (후원소식 관련 서비스는 수신동의 여부와 상관없이 발송됩니다.)
            </p>
          </div>
        </div>
      </div>
    );
  };
  export default SubscriptionConsentSection