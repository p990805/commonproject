const TermsAgreement = ({
    agreeAll,
    handleAgreeAll,
    agreeTerm,
    handleAgreeTerm,
    agreePrivacy,
    handleAgreePrivacy,
  }) => (
    <div className="bg-white p-4 rounded shadow-sm">
      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-orange-500"
          checked={agreeAll}
          onChange={(e) => handleAgreeAll(e.target.checked)}
        />
        <span className="font-bold text-sm">
          이용약관, 개인정보 수정 및 이용, 티아라 활동 안내 수신에 모두 동의합니다.
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
  );
  export default TermsAgreement;