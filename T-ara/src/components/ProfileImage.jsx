// src/components/ProfileImage.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

const ProfileImage = ({ imageIdentifier, alt = "Profile" }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!imageIdentifier) return;

    // URL 형태면 파일 키 추출
    const getKeyFromUrl = (url) => {
      try {
        const parsedUrl = new URL(url);
        let key = parsedUrl.pathname.startsWith("/")
          ? parsedUrl.pathname.substring(1)
          : parsedUrl.pathname;
        // console.log('원본 파일 키:', key);
        // "profile_img/" 접두어가 있다면 제거
        if (key.startsWith("profile_img/")) {
          key = key.replace("profile_img/", "");
          // console.log('수정된 파일 키:', key);
        }
        return key;
      } catch (error) {
        console.error("파일 키 추출 오류:", error);
        return url;
      }
    };

    let fileKey = imageIdentifier;
    if (imageIdentifier.startsWith("http")) {
      fileKey = getKeyFromUrl(imageIdentifier);
    }
    // console.log('presigned URL API 호출을 위한 fileKey:', fileKey);

    const fetchImageUrl = async () => {
      try {
        const response = await api.get("/upload/presigned-get-url", {
          params: { fileName: fileKey },
        });
        // console.log('presigned URL 응답:', response.data);
        setImageUrl(response.data.url);
      } catch (error) {
        console.error("프로필 이미지 URL 가져오기 실패:", error);
        // 실패하면 원래 imageIdentifier 사용
        setImageUrl(imageIdentifier);
      }
    };

    fetchImageUrl();
  }, [imageIdentifier]);

  return (
    <img
      src={imageUrl || imageIdentifier || "/assets/placeholder.png"}
      alt={alt}
      className="w-12 h-12 rounded-full object-cover"
    />
  );
};

export default ProfileImage;
