const NicknameInput = ({
    nickname,
    setNickname,
    isNicknameChecked,
    setIsNicknameChecked,
    handleCheckNickname,
    isLoadingNickname,
  }) => (
    <div>
      <label className="block font-medium mb-1">
        닉네임 <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsNicknameChecked(false);
          }}
          required
        />
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleCheckNickname}
          disabled={isLoadingNickname}
        >
          {isLoadingNickname ? "확인중..." : "중복확인"}
        </button>
      </div>
      <span className="text-sm text-gray-400 block pt-1">
        2~10자로 한글,영어,숫자로 입력해주세요.
      </span>
    </div>
  );
  export default NicknameInput;