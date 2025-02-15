// src/components/mypage/mypage2/ProfileImageSection.jsx
import React, { useState } from "react";
import compressImage from "../../../utils/compressImage";
import api from "../../../api";

const ProfileImageSection = ({ 
  profileImg: initialProfileImg, 
  onProfileImgChange, 
  onFlagForDeletion 
}) => {
  // 원래 이미지는 로드 시 저장된 값, 현재 이미지는 화면에 표시할 이미지
  const [originalImage, setOriginalImage] = useState(initialProfileImg || "/assets/placeholder.png");
  const [currentImage, setCurrentImage] = useState(initialProfileImg || "/assets/placeholder.png");

  // 파일 업로드 처리
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.warn("파일이 선택되지 않았습니다.");
      return;
    }
    console.log("선택된 파일:", file);
    try {
      // 1. 파일 압축
      const compressedFile = await compressImage(file);
      console.log("압축된 파일:", compressedFile);

      // 2. presigned URL 요청
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

      // 4. 최종 S3 URL 구성 (S3Service에서 "profile_img/" 폴더에 저장되도록 했다고 가정)
      const urlObj = new URL(url);
      const bucketUrl = `${urlObj.protocol}//${urlObj.host}`;
      const finalUrl = `${bucketUrl}/profile_img/${key}`;
      console.log("최종 S3 URL:", finalUrl);

      // 5. 업로드 전에 원래 이미지가 기본 이미지가 아니라면 보관
      if (currentImage !== "/assets/placeholder.png" && currentImage !== originalImage) {
        // 이미 새 이미지가 있다면, 이전 이미지도 삭제 대상에 추가
        onFlagForDeletion(currentImage);
      } else if (currentImage === originalImage) {
        // 처음 변경하는 경우, 보관
        onFlagForDeletion(originalImage);
      }
      // 6. 현재 이미지 업데이트 및 부모 콜백 호출
      setCurrentImage(finalUrl);
      onProfileImgChange(finalUrl);
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
    }
  };

  // 초기화 버튼: 새 이미지 삭제 후 원래 이미지로 복귀
  const handleReset = async () => {
    // 만약 현재 이미지가 원래 이미지와 동일하다면 아무 작업도 하지 않음
    if (currentImage === originalImage) return;
    try {
      // S3 URL에서 key 추출 (예: "/profile_img/gigwan3.png")
      const urlObj = new URL(currentImage);
      const pathname = urlObj.pathname;
      const key = pathname.startsWith("/profile_img/") 
                    ? pathname.substring("/profile_img/".length)
                    : pathname.substring(1);
      console.log("삭제할 파일 키:", key);

      // 백엔드의 삭제 API 호출
      await api.delete("/upload/delete-file", { params: { fileName: key } });
      console.log("파일 삭제 성공");

      // 현재 이미지를 원래 이미지로 복귀
      setCurrentImage(originalImage);
      onProfileImgChange(originalImage);
    } catch (error) {
      console.error("파일 삭제 중 오류:", error);
      alert("파일 삭제에 실패했습니다.");
    }
  };

  // 기본 이미지 변경 버튼: 현재 이미지 변경 전에 원래 이미지를 보류하고, 기본 이미지로 변경
  const handleDefaultChange = () => {
    // 만약 현재 이미지가 기본 이미지가 아니라면, 삭제 대상으로 보류
    if (currentImage !== "/assets/placeholder.png") {
      onFlagForDeletion(currentImage);
    }
    setCurrentImage("/assets/placeholder.png");
    onProfileImgChange("/assets/placeholder.png");
  };

  return (
    <div className="flex flex-col items-center gap-2 justify-start mr-10 mt-10">
      <img
        src={currentImage}
        alt="프로필사진"
        className="w-42 h-50 bg-gray-100"
      />
      <div className="flex gap-2 flex-col">
        <label
          htmlFor="profileUpload"
          className="cursor-pointer bg-neutral-600 text-white px-4 py-2 w-[168px] h-[45px] rounded text-sm text-center"
        >
          사진 업로드
        </label>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer bg-red-500 text-white px-4 py-2 w-[168px] h-[45px] rounded text-sm"
        >
          초기화
        </button>
        <button
          type="button"
          onClick={handleDefaultChange}
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 w-[168px] h-[45px] rounded text-sm"
        >
          기본 이미지 변경
        </button>
      </div>
      <input
        type="file"
        id="profileUpload"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleUpload}
      />
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
