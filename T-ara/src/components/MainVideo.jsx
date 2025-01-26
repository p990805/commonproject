import "./styles/MainVideo.css";

const MainVideo = () => {
  return (
    <div className="main-container">
      <video autoPlay muted loop className="video-element">
        <source src="/assets/two_dog.mp4" type="video/mp4" />
      </video>

      <div className="text-overlay">
        <div className="main-text">
          <h1 className="font-bold">마음잇기 후원</h1>
          <p>
            아이가 성인이 될 때까지
            <br />
            건강한 성장을 지원해주세요
          </p>
        </div>

        <div className="support-options">
          <div className="support-box w-[300px] h-[225px] flex flex-col items-center justify-center">
            <h2>정기후원</h2>
            <button >정기후원 바로가기</button>
          </div>
          <div className="support-box w-[300px] h-[225px] flex flex-col items-center justify-center">
            <h2>일시후원</h2>
            <button>일시후원 바로가기</button>
          </div>
          <div className="support-box w-[300px] h-[225px] flex flex-col items-center justify-center">
            <h2>프로젝트 후원</h2>
            <button>캠페인 후원 바로가기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainVideo;
