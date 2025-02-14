const ReservationDetail = ({ onClose }) => {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* 배경 오버레이 - 클릭 시 모달 닫힘 */}
        <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
        <div className="relative z-10 max-w-sm w-full bg-white p-5 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">예약 상세내역</h1>
          <div className="flex mb-4">
            <div className="mr-4">
              <img src="/assets/corgi.png" alt="동물 이미지" className="w-24 h-24 rounded" />
            </div>
            <div className="flex flex-col text-sm">
              <p>
                예약동물 <span className="font-semibold">맥스</span>
              </p>
              <p>
                보호소 <span className="font-semibold">광주 동물보호센터</span>
              </p>
              <p>
                예약일 <span className="font-semibold">2025.02.06 목 오후 5:00</span>
              </p>
              <p>
                승인여부 <span className="font-semibold">거절</span>
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold mb-1">거절사유</p>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              placeholder="테스트트"
              readOnly
            />
          </div>
          <div className="text-center">
            <button
              className="bg-neutral-700 text-white p-2 w-40 rounded"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ReservationDetail;
  