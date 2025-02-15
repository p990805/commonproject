// src/components/signup/Individual/ProfileImageUpload.jsx
import React from "react";
import compressImage from "../../../utils/compressImage";
import api from "../../../api"; // axios 인스턴스

const ProfileImageUpload = ({ profilePreview, setProfilePreview, onCompressedImage }) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.warn("파일이 선택되지 않았습니다.");
      return;
    }
    console.log("선택된 파일:", file);
    try {
      // 1. 파일 압축 (옵션은 필요에 따라 조정)
      const compressedFile = await compressImage(file);
      console.log("압축된 파일:", compressedFile);

      // 2. presigned URL 요청 (백엔드의 S3Controller 사용)
      const fileName = compressedFile.name;
      const fileType = compressedFile.type;
      const response = await api.get("/upload/presigned-url", {
        params: { fileName, fileType },
      });
      const { url, key } = response.data;
      console.log("Presigned URL:", url, "Key:", key);

      // 3. S3에 파일 업로드 (PUT 요청)
      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": fileType,
        },
        body: compressedFile,
      });
      if (!uploadResponse.ok) {
        throw new Error("S3 업로드 실패");
      }
      console.log("S3 업로드 성공");

      // 4. 최종 S3 URL 구성  
      // 백엔드 S3Service에서 key를 생성할 때 "profile_img/" 폴더에 저장하도록 했으므로,
      // 최종 URL은 bucketUrl + "/profile_img/" + key 형태가 되어야 합니다.
      const urlObj = new URL(url);
      const bucketUrl = `${urlObj.protocol}//${urlObj.host}`;
      const finalUrl = `${bucketUrl}/profile_img/${key}`;
      console.log("최종 S3 URL:", finalUrl);

      // 5. 부모 상태 업데이트: 미리보기 및 압축 이미지 URL(객체 키가 아니라 최종 URL) 전달
      setProfilePreview(finalUrl);
      if (onCompressedImage) {
        onCompressedImage(finalUrl);
      }
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
    }
  };

  // 초기화 버튼 클릭 시, S3에서 파일 삭제 후 미리보기 및 부모 상태 초기화
  const handleReset = async () => {
    try {
      // 파일 키는 S3 URL에서 "profile_img/" 이후의 파일명을 추출
      const urlObj = new URL(profilePreview);
      const pathName = urlObj.pathname; // 예: "/profile_img/gigwan2.png"
      const key = pathName.startsWith("/profile_img/") 
                    ? pathName.substring("/profile_img/".length)
                    : pathName.substring(1);
      console.log("삭제할 파일명:", key);

      // 백엔드의 삭제 API 호출 (DELETE 요청)
      await api.delete("/upload/delete-file", { params: { fileName: key } });
      console.log("파일 삭제 성공");

      // 미리보기와 부모 상태 초기화
      setProfilePreview("/assets/placeholder.png");
      if (onCompressedImage) {
        onCompressedImage(null);
      }
    } catch (error) {
      console.error("파일 삭제 중 오류:", error);
      alert("파일 삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      <label className="block font-medium mb-1">프로필 사진</label>
      <div className="flex items-center space-x-4">
        <div className="w-30 h-35 border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
          {profilePreview && profilePreview !== "/assets/placeholder.png" ? (
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
          <div className="flex gap-2">
            <label
              htmlFor="profileUpload"
              className="whitespace-nowrap bg-gray-800 text-white px-4 py-3 rounded hover:bg-gray-600 mt-1 cursor-pointer text-center text-xs"
            >
              사진 업로드
            </label>
            <button
              type="button"
              onClick={handleReset}
              className="whitespace-nowrap bg-red-500 text-white px-4 py-3 rounded hover:bg-red-400 mt-1 cursor-pointer text-center text-xs"
            >
              초기화
            </button>
          </div>
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
};

export default ProfileImageUpload;
