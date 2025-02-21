// src/components/streaming/OpenViduVideoComponent.jsx
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

const OpenViduVideoComponent = forwardRef(
  ({ streamManager, autoCapture = false, captureInterval = 5000, onCapture }, ref) => {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);

    // video의 현재 프레임을 캡처하는 함수
    const captureFrame = () => {
      if (!videoRef.current) {
        console.error("비디오 요소를 찾을 수 없습니다.");
        return null;
      }
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      // video의 실제 크기 사용 또는 원하는 크기로 설정 가능
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png");
    };

    // 부모에서 captureFrame()을 호출할 수 있도록 ref에 노출
    useImperativeHandle(ref, () => ({
      captureFrame,
    }), [captureFrame]);

    useEffect(() => {
      if (streamManager && videoRef.current) {
        streamManager.addVideoElement(videoRef.current);
      }
    }, [streamManager]);

    // autoCapture 옵션이 true이면 지정 간격마다 자동 캡처 후 onCapture 콜백 호출
    useEffect(() => {
      if (autoCapture) {
        intervalRef.current = setInterval(() => {
          const dataUrl = captureFrame();
          if (dataUrl && onCapture) {
            onCapture(dataUrl);
          }
        }, captureInterval);
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [autoCapture, captureInterval, onCapture]);

    return (
      <video
        autoPlay
        ref={videoRef}
        className="w-full h-full object-cover"
        crossOrigin="anonymous"
      />
    );
  }
);

export default OpenViduVideoComponent;
