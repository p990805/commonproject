import { useNavigate } from "react-router-dom";

const AnimalDonationSuccess = () => {
  const nav = useNavigate();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 text-center">
      {/* 메인 문구 */}
      <h1 className="text-2xl md:text-3xl font-bold leading-relaxed">
        <span className="text-orange-500"> 소중한 후원 감사합니다.</span>
      </h1>
      <p className="mt-6 text-gray-600">
        따뜻한 마음으로 함께해 주셔서 감사합니다.
        <br />
        반려동물에게 새로운 희망을 선물하는 여정에 함께 해주신 것을 진심으로
        환영합니다.
        <br />
        앞으로도 유기동물 보호와 입양 확대를 위해 소중한 동반자가 되어 주세요!
      </p>

      {/* 이미지 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* 첫 번째 열 */}
        <div className="space-y-4">
          <img
            className="w-full h-60 object-cover rounded-lg"
            src="/assets/cats.png"
          />
        </div>

        {/* 두 번째 열: margin-top으로 세로 위치 조절 */}
        <div className="mt-15 space-y-4">
          <img
            className="w-full h-60 object-cover rounded-lg"
            src="/assets/person-and-dog.png"
          />
        </div>

        {/* 세 번째 열 */}
        <div className="space-y-4">
          <img
            className="w-full h-60 object-cover rounded-lg"
            src="/assets/corgi.png"
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-10 flex justify-center gap-6">
        <button
          type="button"
          className="w-[200px] h-12 flex items-center cursor-pointer hover:bg-gray-100 justify-center bg-white border border-[#E0E0E0] rounded-lg font-medium text-base text-black"
          onClick={() => nav("/animal")}
        >
          후원하기 더보기
        </button>
        <button
          type="button"
          className="w-[200px] h-12 flex items-center cursor-pointer hover:bg-red-400 justify-center bg-[#FF4427] border border-[#E0E0E0] rounded-lg font-bold text-base text-[#F5F5F5]"
          onClick={() => nav("/mypage")}
        >
          내 후원내역 보러가기
        </button>
      </div>
    </main>
  );
};

export default AnimalDonationSuccess;
