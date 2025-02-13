const NicknameChangeSection = ({ nickname }) => {
    return (
      <div className="mb-4">
        <div className="flex items-center gap-10">
          <p className="w-32 font-bold">닉네임</p>
          <div className="flex gap-4">
            <input
              type="text"
              defaultValue={nickname || '닉네임 없음'}
              className="border rounded px-4 py-2 w-64"
            />
            <button className="cursor-pointer bg-neutral-600 text-white px-5 h-[42px] rounded text-sm">
              닉네임 변경
            </button>
          </div>
        </div>
      </div>
    );
  };
export default NicknameChangeSection;  