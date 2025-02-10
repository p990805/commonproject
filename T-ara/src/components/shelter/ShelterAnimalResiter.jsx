import SidebarNavigation from "./SidebarNavigation";
import { useNavigate } from "react-router-dom";

const ShelterAnimalRegister = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-[1200px] mx-auto p-8">
          <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed mb-6 text-center">
            유기동물 등록
          </h1>

          {/* Registration Form */}
          <div className="bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7">
            <div className="max-w-3xl mx-auto">
              {/* Image Upload Section */}
              <div className="mb-8">
                {/* Main Image Section */}
                <div className="mb-6">
                  <label className="text-sm mb-2 block">대표 사진</label>
                  <div className="flex items-start gap-4">
                    <div className="w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">No Image</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        <div>권장 사이즈 : 최소 200 X 200 이상</div>
                        <div>파일형식 : JPG, JPEG, PNG</div>
                        <div>최대 용량 : 5MB 이하</div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="main-image"
                      />
                      <label
                        htmlFor="main-image"
                        className="px-4 py-2 bg-gray-200 text-sm rounded cursor-pointer inline-block hover:bg-gray-300"
                      >
                        사진등록
                      </label>
                    </div>
                  </div>
                </div>

                {/* Additional Images Section */}
                <div>
                  <label className="text-sm mb-2 block">추가 사진</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                      {/* Image thumbnails will be displayed here */}
                      <div className="w-24 h-24 border border-gray-200 rounded flex items-center justify-center">
                        <div className="text-gray-400 text-xs">No Image</div>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="additional-images"
                    />
                    <label
                      htmlFor="additional-images"
                      className="px-4 py-2 bg-gray-200 text-sm rounded cursor-pointer inline-block hover:bg-gray-300"
                    >
                      사진등록
                    </label>
                  </div>
                </div>
              </div>

              {/* Input Fields Container */}
              <div className="flex justify-between mb-6">
                {/* Left Column */}
                <div className="w-[300px] space-y-4">
                  <div>
                    <label className="text-sm block mb-1">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="이름"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      생년월일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="생년월일 8자리"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      종 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="종"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      중성화 여부 <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full h-10 px-3 border border-[#dee1e8] rounded">
                      <option value="">중성화 여부</option>
                      <option value="yes">예</option>
                      <option value="no">아니오</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      보호소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="광주 동물보호센터"
                      disabled
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded bg-gray-50"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-[300px] space-y-4">
                  <div>
                    <label className="text-sm block mb-1">
                      성별 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="성별"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      등록일시 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="등록일시"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      품종 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="품종"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      몸무게 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="몸무게"
                        className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        kg
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      털색 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="털색"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div className="mt-6">
                <label className="text-sm block mb-1">
                  설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="유기동물 설명을 작성해주세요."
                  className="w-full h-40 p-3 border border-[#dee1e8] rounded resize-none"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => navigate("/shelter/animal")}
                  className="w-40 h-12 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  이전
                </button>
                <button className="w-40 h-12 bg-[#4763E4] text-white rounded hover:bg-[#3951d3]">
                  등록 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterAnimalRegister;
