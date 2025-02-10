const ProfileImageSection = ({ profileImg }) => {
    return (
      <div className="flex flex-col items-center gap-2 justify-start mr-10 mt-10">
        <img
          src={profileImg || '/assets/placeholder.png'}
          alt="프로필사진"
          className="w-42 h-50 bg-gray-100"
        />
        <button className="cursor-pointer bg-neutral-600 text-white px-4 py-2 w-[168px] h-[45px] rounded text-sm">
          사진변경
        </button>
        <p className="text-xs text-gray-400 text-left">
          권장 사이즈: 최소 200x200 이상
          <br />
          파일형식: JPG, JPEG, PNG
          <br />
          최대용량: 5MB 이하
        </p>
      </div>
    );
  };
  export default ProfileImageSection;