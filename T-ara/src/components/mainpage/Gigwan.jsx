import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const Gigwan = () => {
  return (
    <div className="w-full max-w-[1500px]  my-auto mx-auto">

      {/* 섹션 1: 상단 제목 + 소개 문구 */}
      <div className="flex flex-col items-center text-center py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">사업 소개</h1>
        <p className="text-gray-700 max-w-4xl">
          100년 이상 쌓아 온 전문성과 노하우로 정직하고 투명하게
          유기동물을 위한 변화를 만들어가고 있습니다.
        </p>
      </div>

      {/* 섹션 2: 고양이 배경 + 중앙 텍스트/버튼 + 좌우 화살표 */}
      <div className="relative w-full h-[200px] md:h-[500px] lg:h-[400px] overflow-auto">
        {/* 배경 이미지 (원하는 고양이 이미지를 src로 교체) */}
        <img
          src="/assets/gigwanbanner.png"
          alt="Cat"
          className="w-full h-full object-cover brightness-70"
        />

        {/* 반투명 오버레이 & 텍스트 */}
        <div className="absolute inset-0  flex flex-col justify-center items-center mt-40 px-4 gap-10">
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
            소중한 후원금 사용 내용을 투명하게 공개합니다.
          </h2>
          <button className="flex gap-2 items-center px-6 py-2 bg-black/40  rounded-3xl shadow border border-white text-white hover:bg-white/80 hover:text-black cursor-pointer ">
            후원보고 보러가기 <LiaLongArrowAltRightSolid className="text-2xl"/>
          </button>
        </div>
      </div>

      {/* 섹션 3: 카드 목록 4개 */}
      <div className="grid grid-cols-1 w-[80%] mx-auto md:grid-cols-2 lg:grid-cols-4 gap-4 py-10 px-4">
        {/* 카드 1 */}
        <div className="bg-white rounded-xl shadow-2xl p-5 flex flex-col items-center gap-10">
          <img
            src="/assets/gigwan1.png"
            alt="icon1"
            className="mb-4 w-25 h-25"
          />
          <p className="text-center text-sm">
            UN경제사회이사회로부터 <br /> NGO 최상위 지위인<br />
            포괄적 협의지위 획득
          </p>
        </div>

        {/* 카드 2 */}
        <div className="bg-white rounded-xl shadow-2xl p-5 flex flex-col items-center gap-10">
          <img
            src="/assets/gigwan2.png"
            alt="icon2"
            className="mb-4 w-25 h-25"
          />
          <p className="text-center text-sm">
            글로벌 4대 회계법인인 <br /> 한영회계법인을 통한
            외부감사 등<br /> 철저한 내부감사 실시
          </p>
        </div>

        {/* 카드 3 */}
        <div className="bg-white rounded-xl shadow-2xl p-5 flex flex-col items-center gap-10">
          <img
            src="/assets/gigwan3.png"
            alt="icon3"
            className="mb-4 w-25 h-25"
          />
          <p className="text-center text-sm">
            NGO의 투명성과 경영성과를<br />
            객관적으로 평가해 수여하는<br />
            삼일투명경영대상 수상
          </p>
        </div>

        {/* 카드 4 */}
        <div className="bg-white rounded-xl shadow-2xl p-5 flex flex-col items-center gap-10">
          <img
            src="/assets/gigwan4.png"
            alt="icon4"
            className="mb-4 w-25 h-25"
          />
          <p className="text-center text-sm">
            기후변화대응 사업 수행 역량을<br /> 인증받은
            녹색 기후기금(GCF)의<br /> 공식 인증기관
          </p>
        </div>
      </div>

    </div>
  );
};

export default Gigwan;
