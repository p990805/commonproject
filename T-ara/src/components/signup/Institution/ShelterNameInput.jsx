const ShelterNameInput = ({ shelterName, setShelterName }) => (
    <div>
      <label className="block font-medium mb-1">
        보호소 이름 <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
        placeholder="보호소 이름을 입력해주세요."
        value={shelterName}
        onChange={(e) => setShelterName(e.target.value)}
        required
      />
    </div>
  );
  export default ShelterNameInput;