import imageCompression from "browser-image-compression";

// 이미지 압축 함수
const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1, // 최대 1MB로 압축 (필요에 따라 조정)
    maxWidthOrHeight: 800, // 가로 혹은 세로 최대 800px
    useWebWorker: true, // 웹워커 사용 (UI 스레드 부하 줄임)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("이미지 압축 오류:", error);
    return file; // 압축 실패 시 원본 파일 반환
  }
};
export default compressImage;