import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaUndo, FaRedo, FaFont, FaPaintBrush, FaSmile } from 'react-icons/fa';

const MyPhotoCardEditor = ({ composedImage, onBack }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('select');
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [texts, setTexts] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [editHistory, setEditHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 미리 정의된 브러시 크기
  const brushSizes = [
    { label: '얇게', size: 3 },
    { label: '보통', size: 5 },
    { label: '굵게', size: 8 },
    { label: '매우 굵게', size: 12 }
  ];

  const commonEmojis = ['😊', '❤️', '✨', '🌟', '🎉', '🎨', '🌈', '💖', '🌸', '⭐'];

  const colorPalette = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

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
      let width = image.width;
      let height = image.height;
      
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
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

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      loadHistoryState(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      loadHistoryState(historyIndex + 1);
    }
  };

  const loadHistoryState = (index) => {
    const image = new Image();
    image.src = editHistory[index];
    image.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };
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

  const handleMouseDown = (e) => {
    if (currentTool !== 'draw') return;
    
    const pos = getMousePos(e);
    setIsDrawing(true);
    
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
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

  const addText = () => {
    const newText = {
      id: Date.now(),
      content: '텍스트를 입력하세요',
      x: 50,
      y: 50,
      fontSize: 20,
      color: '#000000',
      isEditing: true
    };
    setTexts([...texts, newText]);
    setSelectedElement({ type: 'text', id: newText.id });
    setCurrentTool('select');
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const currentState = canvas.toDataURL();
    
    texts.forEach(text => {
      context.font = `${text.fontSize}px Arial`;
      context.fillStyle = text.color;
      context.fillText(text.content, text.x, text.y);
    });
    
    emojis.forEach(emoji => {
      context.font = `${emoji.fontSize}px Arial`;
      context.fillText(emoji.content, emoji.x, emoji.y);
    });
    
    const link = document.createElement('a');
    link.download = 'edited-photocard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    const tempImage = new Image();
    tempImage.src = currentState;
    tempImage.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(tempImage, 0, 0);
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded">
          뒤로가기
        </button>
        <div className="flex gap-4">
          <button onClick={handleUndo} disabled={historyIndex <= 0}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 rounded">
            <FaUndo />
          </button>
          <button onClick={handleRedo} disabled={historyIndex >= editHistory.length - 1}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 rounded">
            <FaRedo />
          </button>
          <button onClick={handleSave}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            저장하기
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-64 bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setCurrentTool('select')}
              className={`p-2 rounded ${currentTool === 'select' ? 'bg-red-500 text-white' : 'bg-white border'}`}>
              선택
            </button>
            <button onClick={() => setCurrentTool('draw')}
              className={`p-2 rounded ${currentTool === 'draw' ? 'bg-red-500 text-white' : 'bg-white border'}`}>
              <FaPaintBrush className="inline-block mr-2" />
              그리기
            </button>
            <button onClick={() => { setCurrentTool('text'); addText(); }}
              className={`p-2 rounded ${currentTool === 'text' ? 'bg-red-500 text-white' : 'bg-white border'}`}>
              <FaFont className="inline-block mr-2" />
              텍스트
            </button>
            <button onClick={() => setCurrentTool('emoji')}
              className={`p-2 rounded ${currentTool === 'emoji' ? 'bg-red-500 text-white' : 'bg-white border'}`}>
              <FaSmile className="inline-block mr-2" />
              이모지
            </button>
          </div>

          {currentTool === 'draw' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  브러시 크기
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {brushSizes.map(({ label, size }) => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      className={`p-2 rounded ${brushSize === size ? 'bg-red-500 text-white' : 'bg-white border'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  색상 선택
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colorPalette.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBrushColor(color)}
                      className="w-8 h-8 rounded-full border-2"
                      style={{
                        backgroundColor: color,
                        borderColor: brushColor === color ? '#FF0000' : '#E5E7EB'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentTool === 'emoji' && (
            <div className="grid grid-cols-5 gap-2">
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    const newEmoji = {
                      id: Date.now(),
                      content: emoji,
                      x: 50,
                      y: 50,
                      fontSize: 30
                    };
                    setEmojis([...emojis, newEmoji]);
                    setSelectedElement({ type: 'emoji', id: newEmoji.id });
                    setCurrentTool('select');
                  }}
                  className="w-10 h-10 text-xl bg-white border rounded hover:bg-gray-100"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 relative" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <canvas
            ref={canvasRef}
            className="border rounded-lg shadow-lg w-full h-auto"
            style={{ maxWidth: '100%' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          <div className="absolute inset-0 pointer-events-none">
            {texts.map(text => (
              <div
                key={text.id}
                style={{
                  position: 'absolute',
                  left: text.x,
                  top: text.y,
                  fontSize: `${text.fontSize}px`,
                  color: text.color,
                  padding: '4px',
                  border: selectedElement?.id === text.id ? '1px dashed #000' : 'none',
                  backgroundColor: selectedElement?.id === text.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  pointerEvents: currentTool === 'select' ? 'auto' : 'none',
                  cursor: 'move'
                }}
                onClick={() => {
                  setSelectedElement({ type: 'text', id: text.id });
                  setCurrentTool('select');
                }}
                onDoubleClick={() => {
                  const updatedTexts = texts.map(t =>
                    t.id === text.id ? { ...t, isEditing: true } : t
                  );
                  setTexts(updatedTexts);
                }}
              >
                {text.isEditing ? (
                  <input
                    type="text"
                    value={text.content}
                    onChange={(e) => {
                      const updatedTexts = texts.map(t =>
                        t.id === text.id ? { ...t, content: e.target.value } : t
                      );
                      setTexts(updatedTexts);
                    }}
                    onBlur={() => {
                      const updatedTexts = texts.map(t =>
                        t.id === text.id ? { ...t, isEditing: false } : t
                      );
                      setTexts(updatedTexts);
                      saveToHistory();
                    }}
                    className="bg-transparent border-none outline-none"
                    style={{
                      fontSize: `${text.fontSize}px`,
                      color: text.color,
                      width: '100%'
                    }}
                    autoFocus
                  />
                ) : (
                  <div
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', '');
                    }}
                    onDrag={(e) => {
                      if (e.clientX === 0 && e.clientY === 0) return;
                      const pos = getMousePos(e);
                      const updatedTexts = texts.map(t =>
                        t.id === text.id ? { ...t, x: pos.x, y: pos.y } : t
                      );
                      setTexts(updatedTexts);
                    }}
                    onDragEnd={saveToHistory}
                  >
                    {text.content}
                  </div>
                )}
              </div>
            ))}

            {emojis.map(emoji => (
              <div
                key={emoji.id}
                style={{
                  position: 'absolute',
                  left: emoji.x,
                  top: emoji.y,
                  fontSize: `${emoji.fontSize}px`,
                  padding: '4px',
                  border: selectedElement?.id === emoji.id ? '1px dashed #000' : 'none',
                  backgroundColor: selectedElement?.id === emoji.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  pointerEvents: currentTool === 'select' ? 'auto' : 'none',
                  cursor: 'move'
                }}
                onClick={() => {
                  setSelectedElement({ type: 'emoji', id: emoji.id });
                  setCurrentTool('select');
                }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', '');
                }}
                onDrag={(e) => {
                  if (e.clientX === 0 && e.clientY === 0) return;
                  const pos = getMousePos(e);
                  const updatedEmojis = emojis.map(e =>
                    e.id === emoji.id ? { ...e, x: pos.x, y: pos.y } : e
                  );
                  setEmojis(updatedEmojis);
                }}
                onDragEnd={saveToHistory}
              >
                {emoji.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPhotoCardEditor;