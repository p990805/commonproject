// src/components/live/ThumbnailCapture.jsx
import React, { useState, useEffect, useRef } from 'react';

const ThumbnailCapture = ({ imageUrl, width = 320, height = 180 }) => {
  const canvasRef = useRef(null);
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // 크로스도메인 문제 해결용 (필요 시)
    img.src = imageUrl;

    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      // 원본 이미지를 지정한 width, height에 맞게 캔버스에 그림
      ctx.drawImage(img, 0, 0, width, height);
      const dataURL = canvas.toDataURL('image/png');
      setThumbnail(dataURL);
    };

    img.onerror = (err) => {
      console.error('Image load error:', err);
    };
  }, [imageUrl, width, height]);

  return (
    <>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
          <p>썸네일 캡처 중...</p>
        </div>
      )}
      {/* 캔버스는 화면에 보이지 않도록 숨김 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
};

export default ThumbnailCapture;
