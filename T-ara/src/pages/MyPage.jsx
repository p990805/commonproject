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
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "myhome";
  });
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
    if (tab === 'Needfix') {
      setPendingTab(tab);
      setActiveTab('checkpassword');
    } else {
      setActiveTab(tab);
      localStorage.setItem("activeTab", tab); // 🔥 새로고침 시 유지하도록 저장
    }
  };

  // 비밀번호 확인 성공 후 실행될 함수
  const handlePasswordCheckSuccess = () => {
    if (pendingTab) {
      setActiveTab(pendingTab);
      localStorage.setItem("activeTab", pendingTab);
      setPendingTab(null);
    }
  };

  const CurrentComponent = components[activeTab];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="flex px-5">
        {/* Sidebar */}
        <aside className="w-80 h-[890px] bg-white shadow-md p-5 m-6">
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-700 mb-6">마이페이지</h2>
    <ul className="space-y-3">
      {/* MY 홈 */}
      <li>
        <button
          onClick={() => handleTabChange('myhome')}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'myhome'
              ? 'bg-red-500 text-white'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          MY 홈
        </button>
      </li>

      {/* 나의 정보 */}
      <li>
        <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">나의 정보</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleTabChange('myinformation')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'myinformation'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              회원정보
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('withdraw')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'withdraw'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              회원탈퇴
            </button>
          </li>
        </ul>
      </li>

      {/* 나의 후원내역 */}
      <li>
        <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">나의 후원내역</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleTabChange('myregularspon')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'myregularspon'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              정기후원
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('mytemporaryspon')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'mytemporaryspon'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              일시후원
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('mycampaignspon')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'mycampaignspon'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              캠페인 후원
            </button>
          </li>
        </ul>
      </li>

      {/* 나의 후원동물 */}
      <li>
        <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">나의 후원동물</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleTabChange('myworkjournal')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'myworkjournal'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              활동일지
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('myphotocard')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'myphotocard'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              포토카드
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
        </aside>


        {/* Main Section */}
        <main className="flex-1 p-5 bg-gray-100 rounded-lg max-w-full">
          <div>
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
