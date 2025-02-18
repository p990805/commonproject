const BannerSection = () => (
  <div
    className="relative h-72 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e')",
    }}
  >
    <div className="absolute inset-0 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
        <h1 className="text-3xl font-bold mb-2">보호중인 동물</h1>
        <p className="text-sm">
          현재 대한민국에서 보호 중인 동물들을 소개합니다.
          <br />
          당신의 작은 관심이 큰 힘이 됩니다.
        </p>
      </div>
    </div>
  </div>
);

export default BannerSection;
