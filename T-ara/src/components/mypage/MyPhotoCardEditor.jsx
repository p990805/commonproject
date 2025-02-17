import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaUndo, FaRedo, FaPaintBrush, FaSmile, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const MyPhotoCardEditor = ({ composedImage }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('draw');
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [editHistory, setEditHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const brushSizes = [
    { label: '얇게', size: 3 },
    { label: '보통', size: 5 },
    { label: '굵게', size: 8 },
  ];

  const commonEmojis = ['😊', '❤️', '✨', '🌟', '🎉', '🎨', '🌈', '💖', '🌸', '⭐'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    setCtx(context);

    const image = new Image();
    image.src = composedImage;
    image.onload = () => {
      const maxWidth = 800;
      const ratio = Math.min(1, maxWidth / image.width);
      canvas.width = image.width * ratio;
      canvas.height = image.height * ratio;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      saveToHistory();
    };
  }, [composedImage]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(canvas.toDataURL());
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleMouseDown = (e) => {
    if (currentTool === 'draw') {
      const pos = getMousePos(e);
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    } else if (currentTool === 'emoji' && selectedEmoji) {
      const pos = getMousePos(e);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.font = '30px Arial';
      context.fillStyle = brushColor;
      context.fillText(selectedEmoji, pos.x, pos.y);
      saveToHistory();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || currentTool !== 'draw') return;
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const image = new Image();
      image.src = editHistory[historyIndex - 1];
      image.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        setHistoryIndex(historyIndex - 1);
      };
    }
  };

  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      const image = new Image();
      image.src = editHistory[historyIndex + 1];
      image.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        setHistoryIndex(historyIndex + 1);
      };
    }
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.download = 'edited-photocard.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // 캔버스의 현재 상태를 이미지 데이터로 변환
      const imageData = canvasRef.current.toDataURL('image/png');

      // API 요청 데이터 구성
      const requestData = {
        photocardPath: imageData
      };

      // POST 요청 전송
      const response = await api.post('/photocard/register', requestData);

      // 응답 확인
      console.log('Photocard registration response:', response);

      // 성공적으로 등록되면 포토카드 목록 페이지로 이동
      navigate('/mypage/photocard');
    } catch (error) {
      console.error('Error registering photocard:', error);
      setError('포토카드 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">포토카드 편집</h2>
        <div className="flex gap-4">
          <button 
            onClick={handleUndo} 
            disabled={historyIndex <= 0}
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-lg transition-colors"
          >
            <FaUndo />
          </button>
          <button 
            onClick={handleRedo} 
            disabled={historyIndex >= editHistory.length - 1}
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-lg transition-colors"
          >
            <FaRedo />
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <FaSave />
            저장
          </button>
          
          <button 
            onClick={handleComplete}
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaCheck />
            {isSubmitting ? '처리중...' : '완료'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-80 space-y-3">
          <div className="space-y-6">
            {/* 도구 선택 */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setCurrentTool('draw');
                  setSelectedEmoji(null);
                }}
                className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors 
                  ${currentTool === 'draw' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <FaPaintBrush />
                브러시
              </button>
              <button
                onClick={() => setCurrentTool('emoji')}
                className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors
                  ${currentTool === 'emoji' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <FaSmile />
                이모지
              </button>
            </div>

            {/* 브러시 설정 */}
            {currentTool === 'draw' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    브러시 크기
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {brushSizes.map(({ label, size }) => (
                      <button
                        key={size}
                        onClick={() => setBrushSize(size)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors
                          ${brushSize === size 
                            ? 'bg-red-500 text-white' 
                            : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    색상 선택
                  </h3>
                  <div className="relative inline-block">
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                      style={{
                        backgroundColor: brushColor,
                        WebkitAppearance: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 이모지 선택 */}
            {currentTool === 'emoji' && (
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  이모지 선택
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-10 h-10 text-xl rounded-lg transition-colors
                        ${selectedEmoji === emoji 
                          ? 'bg-red-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <canvas
            ref={canvasRef}
            className="w-full h-auto cursor-crosshair rounded-lg border border-gray-200"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPhotoCardEditor;