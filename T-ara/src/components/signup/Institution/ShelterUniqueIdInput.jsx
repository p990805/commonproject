const ShelterUniqueIdInput = ({ uniqueId, setUniqueId }) => (
    <div>
      <label className="block font-medium mb-1">
        고유번호 <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
        placeholder="고유번호를 입력해주세요."
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
        required
      />
    </div>
  );
  export default ShelterUniqueIdInput;