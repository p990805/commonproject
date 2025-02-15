const UserIdInput = ({
    userId,
    setUserId,
    isUserIdChecked,
    setIsUserIdChecked,
    handleCheckUserId,
    isLoadingUserId,
  }) => (
    <div>
      <label className="block font-medium mb-1">
        아이디 <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            setIsUserIdChecked(false);
          }}
          required
        />
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleCheckUserId}
          disabled={isLoadingUserId}
        >
          {isLoadingUserId ? "확인중..." : "중복확인"}
        </button>
      </div>
      <span className="text-sm text-gray-400 block pt-1">
        5~10자 영문 소문자/숫자 조합
      </span>
    </div>
  );
  export default UserIdInput;