import { useState } from 'react';
import MyCampaignSpon from "../components/mypage/MyCampaignSpon";
import MyHome from "../components/mypage/MyHome";
import MyInformation from "../components/mypage/MyInformation";
import MyPhotoCard from "../components/mypage/MyPhotoCard";
import MyRegularSpon from "../components/mypage/MyRegularSpon";
import MyTemporarySpon from "../components/mypage/MyTemporarySpon";
import MyWorkJournal from "../components/mypage/MyWorkJournal";
import Withdraw from "../components/mypage/Withdraw";

const MyPage = () => {
  // 현재 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState('myhome');

  // 탭별 컴포넌트 매핑 객체
  const components = {
    myhome: MyHome,
    myinformation: MyInformation,
    myphotocard: MyPhotoCard,
    myworkjournal: MyWorkJournal,
    mycampaignspon: MyCampaignSpon,
    myregularspon: MyRegularSpon,
    mytemporaryspon: MyTemporarySpon,
    withdraw: Withdraw
  };

  // 사이드바 메뉴 데이터
  const menuItems = [
    { id: 'myhome', label: '마이홈' },
    { id: 'myinformation', label: '내 정보 관리' },
    { id: 'myphotocard', label: '내 포토카드' },
    { id: 'myworkjournal', label: '작업일지' },
    { id: 'mycampaignspon', label: '캠페인 후원 내역' },
    { id: 'myregularspon', label: '정기후원 내역' },
    { id: 'mytemporaryspon', label: '일시후원 내역' },
    { id: 'withdraw', label: '회원탈퇴' }
  ];

  // 현재 표시할 컴포넌트 선택
  const CurrentComponent = components[activeTab];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex">
        {/* 사이드바 영역 */}
        <aside className="w-64 min-h-screen bg-white border-r">
          <nav className="p-4">
            <h2 className="mb-4 text-xl font-bold text-gray-700">마이페이지</h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-red-500 font-semibold'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* 메인 컨텐츠 영역 */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <CurrentComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;