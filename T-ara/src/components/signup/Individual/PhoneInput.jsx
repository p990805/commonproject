const PhoneInput = ({ phone, setPhone }) => (
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
  );
  export default PhoneInput;