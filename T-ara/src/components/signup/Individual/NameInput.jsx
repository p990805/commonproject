const NameInput = ({ name, setName }) => (
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
  );
  export default NameInput;