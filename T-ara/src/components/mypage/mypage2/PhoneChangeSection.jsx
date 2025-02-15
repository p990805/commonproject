// src/components/mypage/mypage2/PhoneChangeSection.jsx
const PhoneChangeSection = ({ phone, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-10">
        <p className="w-32 font-black text-lg">휴대폰 번호</p>
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={phone || ''}
              onChange={onChange}
              className="border rounded px-4 py-2 w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneChangeSection;
