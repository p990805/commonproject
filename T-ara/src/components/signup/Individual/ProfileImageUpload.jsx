const ProfileImageUpload = ({ profilePreview, handleImageChange }) => (
    <div>
      <label className="block font-medium mb-1">프로필 사진</label>
      <div className="flex items-center space-x-4">
        <div className="w-30 h-35 border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>No Image</span>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">사진 업로드 가이드</h3>
          <p className="text-gray-400 text-xs">
            권장 해상도: 200 x 200(px)
            <br />
            파일 양식: JPG, JPEG, PNG
            <br />
            최대 용량: 5MB 이하
          </p>
          <label
            htmlFor="profileUpload"
            className="whitespace-nowrap bg-gray-800 text-white px-4 py-3 rounded hover:bg-gray-600 mt-1 cursor-pointer text-center text-xs"
          >
            사진 업로드
          </label>
          <input
            type="file"
            id="profileUpload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
  export default ProfileImageUpload;