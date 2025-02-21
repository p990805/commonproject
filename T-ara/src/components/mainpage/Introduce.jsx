const Introduce = () => {
    return (
      <div className="relative overflow-hidden w-full max-w-[1500px] h-[700px] my-auto mx-auto">
        {/* 배경 원 1 */}
        <div
          className="
            absolute
            w-[500px] h-[500px]
            bg-gray-200 rounded-full
            -top-[250px] -left-[200px]
            opacity-50
            animate-floatUpDown
          "
        />
  
        {/* 배경 원 2 */}
        <div
          className="
            absolute
            w-[600px] h-[600px]
            bg-red-200 rounded-full
            -bottom-[250px] -right-[300px]
            opacity-50
            animate-floatUpDown
          "
        />
  
        {/* 소개 콘텐츠 */}
        <div className="relative z-10 text-center py-20 flex flex-col gap-5">
          <h1 className="text-3xl font-bold mb-4">티아라 소개</h1>
          <p className="text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
            100% 여러분의 후원으로 운영되는 비영리단체로서
            <br />
            투명하고 정직하게 활동합니다.
          </p>

          <div className="w-[80%] mx-auto">
            <img src="/assets/introduce.jpg" alt="" 
            className="w-full h-80"
            />
          </div>

          <div className="flex gap-5 items-cneter justify-center">
            <div className="flex gap-3 flex-row ">
                <p className="text-[12px] align-bottom">2025년 지원 유기 동물 
                     <span className="text-red-500 font-bold text-3xl m-2">2,739,080</span>마리</p>
            </div>

            <div className="flex gap-3 flex-row">
                <p className="text-[12px] align-bottom">사업비
                     <span className="text-red-500 font-bold text-3xl m-2">6,960,948,015</span>원</p>
            </div>

          </div>

        </div>
      </div>
    );
  };
  
  export default Introduce;
  