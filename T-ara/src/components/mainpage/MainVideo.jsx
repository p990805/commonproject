const MainVideo = () => {
  return (
    <div className="relative w-full max-w-[1550px] h-[700px] mx-auto">
      <video
        autoPlay
        muted
        loop
        src="/assets/two_dog.mp4"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />

      <div className="absolute z-10 w-full inset-0 flex flex-col sm:flex-row justify-between items-center">
        
        {/* 왼쪽 텍스트 영역 */}
        <div className="text-white text-center sm:text-left ml-83 mt-50">
          <h1 className="text-5xl sm:text-5xl font-bold">마음잇기 후원</h1>
          <p className="mt-2 text-lg sm:text-lg">
            아이가 성인이 될 때까지<br />
            건강한 성장을 지원해주세요.
          </p>
        </div>

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex flex-col h-full justify-between">
          {/* 첫 번째 박스 */}
          <div className="flex flex-1 border border-white w-full">
            <div className="text-white text-center sm:text-right mt-4 sm:mt-0 p-5 flex flex-col  group w-full">
              <div className="flex flex-col w-full">
                <h1 className="text-xl sm:text-2xl">정기후원</h1>
                {/* 변경: hidden -> opacity-0 + transition */}
                <p className="
                  mt-2 text-xs sm:text-sm 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300
                ">
                  유기동물의 지속적인 보호와 복지를 위해<br />
                  매일 일정 금액을 후원하여 치료, 입양 지원 등을<br />
                  꾸준히 이어갈 수 있는 나눔입니다.
                </p>
              </div>
              <button className="cursor-pointer mt-4 text-xs sm:text-sm text-white px-4 py-2 rounded border border-2 hover:bg-white hover:opacity-80 hover:text-black hover:border-0">
                정기후원 바로가기
              </button>
            </div>
          </div>

          {/* 두 번째 박스 */}
          <div className="flex flex-1 border border-white w-full">
            <div className="text-white text-center sm:text-right mt-4 sm:mt-0 p-5 flex flex-col group w-full">
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl">일시후원</h1>
                <p className="
                  mt-2 text-xs sm:text-sm 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300
                ">
                  유기동물을 위해 금액을 자유롭게 후원하여<br />
                  긴급 치료, 구조, 돌봄 등에<br />
                  직접적인 도움을 주는 나눔입니다.
                </p>
              </div>
              <button className="cursor-pointer mt-4 text-xs sm:text-sm text-white px-4 py-2 rounded border border-2 hover:bg-white hover:opacity-80 hover:text-black hover:border-0">
                일시후원 바로가기
              </button>
            </div>
          </div>

          {/* 세 번째 박스 */}
          <div className="flex flex-1 border border-white w-full">
            <div className="text-white text-center sm:text-right mt-4 sm:mt-0 p-5 flex flex-col group w-full">
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl">캠페인 후원</h1>
                <p className="
                  mt-2 text-xs sm:text-sm 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300
                ">
                  유기동물의 치료 및 재활, 보호소 환경 개선<br />
                  입양 활성화 등 다양한 캠페인으로<br />
                  삶의 질 향상을 위해 노력하고 있습니다.
                </p>
              </div>
              <button className="cursor-pointer mt-4 text-xs sm:text-sm text-white px-4 py-2 rounded border border-2 hover:bg-white hover:opacity-80 hover:text-black hover:border-0 ">
                정기후원 바로가기
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainVideo;
