const InquiryHeader = ({ onAddInquiry }) => (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">1대1 문의 내역</h1>
      <button
        onClick={onAddInquiry}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        문의 작성하기
      </button>
    </div>
  );
  export default InquiryHeader;