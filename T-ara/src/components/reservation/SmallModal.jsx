const SmallModal =({ isOpen,onClose,title,message,onConfirm})=>{
    
    if(!isOpen){
        return null;
    }

    return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      />
      {/* 실제 알림창 컨테이너 */}
      <div className="relative z-10 max-w-sm w-full bg-white p-5 rounded shadow-lg">
        {/* 제목 */}
        {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
        {/* 본문 메시지 */}
        <p className="text-gray-700 mb-4">{message}</p>
        {/* 버튼 영역 */}
        <div className="flex justify-center items-center gap-2 w-full">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="px-4 py-2 w-40 bg-white border hover:bg-neutral-500 hover:text-white rounded"
          >
            취소
          </button>
          {/* 확인 버튼 */}
          <button
            onClick={() => {
              // 필요하다면 onConfirm에서 추가 로직 수행
              if (onConfirm) onConfirm();
              // 확인 후에도 닫고 싶다면 onClose 호출
              onClose();
            }}
            className="px-4 py-2 w-40 bg-neutral-700 hover:bg-neutral-500 text-white rounded"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
export default SmallModal;