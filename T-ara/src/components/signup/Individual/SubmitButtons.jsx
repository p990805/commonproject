const SubmitButtons = ({ handlePrevious }) => (
    <div className="flex justify-between mt-6">
      <button
        type="button"
        className="w-40 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-600 cursor-pointer text-xs"
        onClick={handlePrevious}
      >
        이전
      </button>
      <button
        type="submit"
        className="w-40 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 cursor-pointer text-xs"
      >
        회원가입 완료
      </button>
    </div>
  );
  export default SubmitButtons;