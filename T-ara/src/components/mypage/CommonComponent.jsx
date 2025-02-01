import { useNavigate } from "react-router-dom";

const CommonComponent = () => {
  const nav = useNavigate();

  const goDonate = () => {
    nav("/donate");
  };

  return (
    <div className="relative w-full border border-gray-200 shadow bg-white flex items-center justify-center h-[250px]">
      {/* 왼쪽 박스: 프로필 정보 */}
      <div className="absolute right-165 top-27 transform -translate-y-1/2 flex flex-col gap-4 items-center justify-center border-2 border-red-500 rounded-2xl w-[340px] h-[250px] p-5 bg-white shadow-lg">
        <p className="border-2 rounded-2xl border-red-500 w-20 text-center flex items-center justify-center">
          개인
        </p>
        <div className="flex gap-3">
          <img
            src="/assets/cats.png"
            alt="프로필이미지"
            className="w-16 h-16 rounded-full object-cover"
          />
          <h1 className="text-[20px] font-black">
            박주찬님, <br />
            반갑습니다.
          </h1>
        </div>
        <p>
          내새꾸와 함께한지 <span className="font-bold">100</span>일
        </p>
      </div>

      {/* 오른쪽 박스: 후원 메시지 */}
      <div className="ml-72">
        <h1 className="text-[20px] font-black leading-snug text-center">
          유기동물의 행복을 위한 작은 실천, <br /> 지금, 티아라 후원자가 되어
          주세요!
        </h1>
        <button
          onClick={goDonate}
          className="text-gray-700 hover:text-black transition font-bold border-2 px-6 py-2 rounded-2xl mt-4 flex items-center justify-center border-red-500"
        >
          후원하기
        </button>
      </div>
    </div>
  );
};

export default CommonComponent;
