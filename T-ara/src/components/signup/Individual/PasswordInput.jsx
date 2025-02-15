const PasswordInput = ({ password, setPassword }) => (
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
  );
  export default PasswordInput;