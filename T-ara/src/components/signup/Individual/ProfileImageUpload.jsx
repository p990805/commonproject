// src/components/signup/Individual/ProfileImageUpload.jsx
import React, { useImperativeHandle, forwardRef } from "react";
import compressImage from "../../../utils/compressImage";
import api from "../../../api"; // axios 인스턴스

const DEFAULT_PLACEHOLDER = "/assets/placeholder.png";

const ProfileImageUpload = forwardRef(
  ({ profilePreview, setProfilePreview, onCompressedImage }, ref) => {
    // 랜덤 문자열 생성 (영문/숫자 조합)
    const generateRandomString = (length = 10) => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    // S3 프리사인드 URL 요청 후 파일 업로드
    const uploadFileToS3 = async (file) => {
      const fileName = file.name;
      const fileType = file.type;
      // presigned URL 요청
      const response = await api.get("/upload/presigned-url", {
        params: { fileName, fileType },
      });
      const { url, key } = response.data;
      // S3에 PUT 방식 업로드
      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": fileType,
        },
        body: file,
      });
      if (!uploadResponse.ok) {
        throw new Error("S3 업로드 실패");
      }
      // 최종 S3 URL 구성 (S3Service에서 profile_img/ 폴더에 저장)
      const urlObj = new URL(url);
      const bucketUrl = `${urlObj.protocol}//${urlObj.host}`;
      const finalUrl = `${bucketUrl}/profile_img/${key}`;
      return finalUrl;
    };

    // 파일 선택 시 처리: 압축 → 파일명 랜덤화 → S3 업로드
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) {
        console.warn("파일이 선택되지 않았습니다.");
        return;
      }
      try {
        // 1. 파일 압축 (옵션은 필요에 따라 조정)
        let compressedFile = await compressImage(file);
        // 2. 파일명 랜덤화 (확장자 유지)
        const originalFileName = compressedFile.name;
        const extension = originalFileName.substring(
          originalFileName.lastIndexOf(".")
        );
        const randomName = generateRandomString(10) + extension;
        compressedFile = new File([compressedFile], randomName, {
          type: compressedFile.type,
        });
        // 3. S3 업로드
        const finalUrl = await uploadFileToS3(compressedFile);
        // 4. 상태 업데이트
        setProfilePreview(finalUrl);
        if (onCompressedImage) {
          onCompressedImage(finalUrl);
        }
      } catch (error) {
        console.error("이미지 처리 중 오류:", error);
      }
    };

    // 기본 placeholder 이미지를 S3에 업로드
    const uploadDefaultImage = async () => {
      try {
        const response = await fetch(DEFAULT_PLACEHOLDER);
        if (!response.ok) {
          throw new Error("placeholder 이미지 로드 실패");
        }
        const blob = await response.blob();
        const fileType = blob.type || "image/png";
        const fileName = "placeholder.png";
        const placeholderFile = new File([blob], fileName, { type: fileType });
        const finalUrl = await uploadFileToS3(placeholderFile);
        setProfilePreview(finalUrl);
        if (onCompressedImage) {
          onCompressedImage(finalUrl);
        }
        return finalUrl;
      } catch (error) {
        console.error("기본 이미지 업로드 중 오류:", error);
        throw error;
      }
    };

    // 초기화: S3에 업로드된 파일 삭제 후 기본 placeholder로 복원
    const handleReset = async () => {
      try {
        if (profilePreview && profilePreview !== DEFAULT_PLACEHOLDER) {
          const urlObj = new URL(profilePreview);
          const pathname = urlObj.pathname; // 예: "/profile_img/랜덤파일명.png"
          const key = pathname.startsWith("/profile_img/")
            ? pathname.substring("/profile_img/".length)
            : pathname.substring(1);
          // 백엔드 삭제 API 호출
          await api.delete("/upload/delete-file", { params: { fileName: key } });
        }
        setProfilePreview(DEFAULT_PLACEHOLDER);
        if (onCompressedImage) {
          onCompressedImage(null);
        }
      } catch (error) {
        console.error("파일 삭제 중 오류:", error);
        alert("파일 삭제에 실패했습니다.");
      }
    };

    // 부모 컴포넌트에서 회원가입 제출 시 호출하도록 finalizeUpload 함수 제공
    useImperativeHandle(ref, () => ({
      finalizeUpload: async () => {
        if (profilePreview === DEFAULT_PLACEHOLDER) {
          return await uploadDefaultImage();
        }
        return profilePreview;
      },
    }));

    return (
      <div>
        <label className="block font-medium mb-1">프로필 사진</label>
        <div className="flex items-center space-x-4">
          <div className="w-30 h-35 border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
            {profilePreview &&
            profilePreview !== DEFAULT_PLACEHOLDER &&
            profilePreview.startsWith("http") ? (
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
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default ProfileImageUpload;
