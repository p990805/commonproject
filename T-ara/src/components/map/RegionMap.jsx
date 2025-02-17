import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegionMap = () => {
  const nav = useNavigate();
  const [activeRegion, setActiveRegion] = useState(null);

  // 예시로 작성된 함수. 필요 없으면 삭제 가능
  const onhandletest = () => {
    nav("/");
  };

  const handleClickRegion = (region) => {
    setActiveRegion(region);
    // 클릭 시 원하는 로직 수행. 예: 특정 페이지 이동, 모달 띄우기 등
    console.log("Clicked region:", region);
  };

  return (
    <div className="bg-white w-full max-w-7xl relative h-full">

      {/* 광주 */}
      <div
        className="absolute top-[470px] left-[450px] w-[204.5px] h-[153px] cursor-pointer group"
        onClick={() => handleClickRegion("광주")}
      >
        {/* 기본 이미지 */}
        <img
          src="/assets/map/광주.png"
          alt="광주"
          className="w-full h-full group-hover:hidden transition-all"
        />
        {/* 호버 이미지 */}
        <img
          src="/assets/map/광주2.png"
          alt="광주(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 부산 */}
      <div
        className="absolute top-[410px] left-[622px] w-[212px] h-[156px] cursor-pointer group"
        onClick={() => handleClickRegion("부산")}
      >
        <img
          src="/assets/map/부산.png"
          alt="부산"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/부산2.png"
          alt="부산(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 전북 */}
      <div
        className="absolute top-[380px] left-[496px] w-[155px] h-[108px] cursor-pointer group"
        onClick={() => handleClickRegion("전북")}
      >
        <img
          src="/assets/map/전북.png"
          alt="전북"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/전북2.png"
          alt="전북(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 대구 */}
      <div
        className="absolute top-[233px] left-[652px] w-[193px] h-[217px] cursor-pointer group"
        onClick={() => handleClickRegion("대구")}
      >
        <img
          src="/assets/map/대구.png"
          alt="대구"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/대구2.png"
          alt="대구(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 충북 */}
      <div
        className="absolute top-[219px] left-[593.5px] w-[151px] h-[164px] cursor-pointer group"
        onClick={() => handleClickRegion("충북")}
      >
        <img
          src="/assets/map/충북.png"
          alt="충북"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/충북2.png"
          alt="충북(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 강원 */}
      <div
        className="absolute top-[29px] left-[565px] w-[252px] h-[220px] cursor-pointer group"
        onClick={() => handleClickRegion("강원")}
      >
        <img
          src="/assets/map/강원.png"
          alt="강원"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/강원2.png"
          alt="강원(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 경기 */}
      <div
        className="absolute top-[77px] left-[499px] w-[147px] h-[188px] cursor-pointer group"
        onClick={() => handleClickRegion("경기")}
      >
        <img
          src="/assets/map/경기.png"
          alt="경기"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/경기2.png"
          alt="경기(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 서울 */}
      <div
        className="absolute top-[147px] left-[526px] w-[57px] h-[46px] cursor-pointer group"
        onClick={() => handleClickRegion("서울")}
      >
        <img
          src="/assets/map/서울.png"
          alt="서울"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/서울2.png"
          alt="서울(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 인천 */}
      <div
        className="absolute top-[138px] left-[456px] w-[75px] h-[74px] cursor-pointer group"
        onClick={() => handleClickRegion("인천")}
      >
        <img
          src="/assets/map/인천.png"
          alt="인천"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/인천2.png"
          alt="인천(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 대전 */}
      <div
        className="absolute top-[251px] left-[455px] w-[170px] h-[142px] cursor-pointer group"
        onClick={() => handleClickRegion("대전")}
      >
        <img
          src="/assets/map/대전.png"
          alt="대전"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/대전2.png"
          alt="대전(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

      {/* 제주 */}
      <div
        className="absolute top-[645px] left-[455px] w-[87px] h-[48px] cursor-pointer group"
        onClick={() => handleClickRegion("제주")}
      >
        <img
          src="/assets/map/제주.png"
          alt="제주"
          className="w-full h-full group-hover:hidden transition-all"
        />
        <img
          src="/assets/map/제주2.png"
          alt="제주(호버)"
          className="w-full h-full hidden group-hover:block transition-all"
        />
      </div>

    </div>
  );
};

export default RegionMap;
