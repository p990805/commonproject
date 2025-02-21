const ConfirmPasswordInput = ({ confirmPw, setConfirmPw }) => (
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
  );
  export default ConfirmPasswordInput;