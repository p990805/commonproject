import { useState } from 'react';
import MyCampaignSpon from "../components/mypage/MyCampaignSpon";
import MyHome from "../components/mypage/MyHome";
import MyInformation from "../components/mypage/MyInformation";
import MyPhotoCard from "../components/mypage/MyPhotoCard";
import MyRegularSpon from "../components/mypage/MyRegularSpon";
import MyTemporarySpon from "../components/mypage/MyTemporarySpon";
import MyWorkJournal from "../components/mypage/MyWorkJournal";
import Withdraw from "../components/mypage/Withdraw";
import CheckPassword from '../components/mypage/CheckPassword';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('myhome');
  const [pendingTab, setPendingTab] = useState(null); // 비밀번호 확인 후 이동할 탭

  const components = {
    myhome: MyHome,
    myinformation: MyInformation,
    myphotocard: MyPhotoCard,
    myworkjournal: MyWorkJournal,
    mycampaignspon: MyCampaignSpon,
    myregularspon: MyRegularSpon,
    mytemporaryspon: MyTemporarySpon,
    withdraw: Withdraw,
    checkpassword: CheckPassword,
  };

  const menuItems = [
    { id: 'myhome', label: '마이홈' },
    { id: 'myinformation', label: '내 정보 관리' },
    { id: 'myphotocard', label: '내 포토카드' },
    { id: 'myworkjournal', label: '작업일지' },
    { id: 'mycampaignspon', label: '캠페인 후원 내역' },
    { id: 'myregularspon', label: '정기후원 내역' },
    { id: 'mytemporaryspon', label: '일시후원 내역' },
    { id: 'withdraw', label: '회원탈퇴' },
  ];

  // 특정 탭 이동 전에 비밀번호 확인 필요 여부를 체크하는 함수
  // 지금은 빼놨는데 나중에는 넣어야함
  //  tab === 'myinformation' || 
  //************************************************************************
  // **************************************************************************
  // *
  // ***
  // *
  // *
  // * */
  const handleTabChange = (tab) => {
    if (tab === 'withdraw') {
      setPendingTab(tab); // 확인 후 이동할 탭 저장
      setActiveTab('checkpassword'); // 비밀번호 확인 화면으로 전환
    } else {
      setActiveTab(tab); // 일반적인 탭 변경
    }
  };

  // 비밀번호 확인 성공 후 실행될 함수
  const handlePasswordCheckSuccess = () => {
    if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null); // 확인 완료 후 초기화
    }
  };

  const CurrentComponent = components[activeTab];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-90 h-[890px] bg-white shadow-lg p-5 m-6">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">마이페이지</h2>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-red-500 text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-8 bg-gray-100 rounded-lg m-6">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'checkpassword' ? (
              <CheckPassword onPasswordChecked={handlePasswordCheckSuccess} />
            ) : (
              <CurrentComponent />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;
