
import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-red-100 px-20 py-2 flex items-center gap-4">
        <Link to="/" className="hover:underline text-gray-800">
          Home
        </Link>
        <p className="text-2xl text-gray-800">/</p>
        <Link to="/privacy" className="text-red-600 hover:underline">
          개인정보처리방침
        </Link>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="px-20 py-8">
          <h1 className="font-black text-4xl mb-6">개인정보처리방침</h1>
          <p className="text-md text-gray-700 leading-relaxed">
            (사) 티아라(이하 'T-ara')는 개인정보보호법에 따라 이용자의 개인정보 보호 및
            권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은
            처리방침을 두고 있습니다. 티아라는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항을 통하여
            공지할 것입니다. <br />
            *본 방침은 2025년 2월 16일부터 시행합니다.
          </p>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">1. 개인정보의 처리 목적</h2>
          <p className="text-md text-gray-700 leading-relaxed">
            티아라는 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는
            사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.
          </p>
          <ol start="1" className="list-decimal ml-6 mt-2 text-gray-700">
            <li>회원가입 및 유지</li>
            <li>비정기 또는 일시 후원</li>
            <li>티아라 활동내용 공유</li>
            <li>정보 문의와 민원 상담</li>
            <li>행사와 활동 참여: 행사 정보 제공 및 참여기회 제공 등</li>
          </ol>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">2. 처리하는 개인정보 항목</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              (1) 회원 가입과 유지 <br />
              티아라는 회원 기본정보(이름, 성별, 나이, 직업), 후원정보(주민등록번호, 후원방법, 후원 약정액,
              후원 계좌 또는 신용카드 번호, 신용카드 유효기간), 연락 및 의사소통을 위한 정보(우편물 수령
              주소, 휴대전화번호, 이메일, 페이스북 계정, 트위터 계정)를 수집하고 있습니다. 단, 만 20세 미만
              미성년자는 법정대리인(보호자)의 정보를 요구할 수 있습니다.
            </p>
            <p className="mt-4">
              (2) 비정기 또는 일시 후원 <br />
              티아라에 비정기 또는 일시로 후원하는 후원자는 기본정보(이름 또는 단체명), 후원정보(주민등록번호 또는
              사업자등록번호, 후원계좌/신용카드번호/휴대전화번호, 신용카드 유효기간), 연락 및 의사소통을 위한
              정보(우편물 수령주소, 전화번호, 이메일)를 수집하고 있습니다.
            </p>
            <p className="mt-4">
              (3) 티아라 활동내용 공유 <br />
              티아라는 회원이 아니더라도 활동 소식을 정기적으로 받아보기 원하는 개인 또는 단체의 정보를 수집하고 있습니다.
              이는 이용자의 동의에 따라 자발적으로 제공한 정보에 한하며, 이름과 이메일 이외의 어떤 정보도 수집하지 않습니다.
            </p>
            <p className="mt-4">
              (4) 정보 문의와 민원 상담 <br />
              티아라는 회원과 시민들이 상담을 요청하거나 제보를 하는 경우 의사소통을 원활히 하기 위해 이름, 연락처(휴대전화번호
              또는 이메일) 등의 정보를 수집하여 처리하고 있습니다.
            </p>
            <p className="mt-4">
              (5) 행사와 활동 참여 <br />
              티아라가 주최 혹은 주관하는 행사와 설문조사와 같은 활동에 회원과 시민들이 참여를 원할 경우 내용 공유와 진행을 위해
              개인정보 수집에 대한 동의를 얻은 후 이름, 휴대전화번호, 이메일 등의 정보를 요구할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">3. 개인정보의 처리 및 보유 기간</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              ① 티아라는 관계법령의 규정에 따라 개인정보를 보존하여야 하는 의무가 있는 경우가 아닌 한,
              정보주체의 개인정보는 원칙적으로 해당 개인정보의 처리목적이 달성될 때까지 보유 및 이용되며, 그 목적이
              달성되면 지체 없이 파기됩니다.
            </p>
            <p className="mt-4">
              ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            </p>
            <p className="mt-4 font-bold">(1) 회원 정보</p>
            <p>
              보유기간: 회원 탈퇴시까지 <br />
              보유사유: 회원약관 동의
            </p>
            <p className="mt-4 font-bold">(2) 자원활동 신청시</p>
            <p>
              보유기간: 삭제 요청시까지 <br />
              보유사유: 신청자 동의
            </p>
            <p className="mt-4 font-bold">(3) 물품 후원자의 기부금영수증 발급 관련 정보</p>
            <p>
              보유기간: 5년 <br />
              보유사유: 법인세법 제112조 2에 따라 기부자별 발급명세 5년간 보존
            </p>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">4. 개인정보의 제3자 제공</h2>
          <p className="text-md text-gray-700 leading-relaxed">
            티아라는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의
            동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
          </p>
        </div>

       
        <div className="px-20 py-2 border-t border-gray-200">
        <h2 className="font-bold text-xl mb-2">5. 개인정보처리 위탁</h2>
        <div className="text-md text-gray-700 leading-relaxed">
            <p>
            ① 티아라는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            </p>
            <table className="w-full border-collapse mt-4">
            <thead>
                <tr>
                <th className="border p-2 text-left">업체명</th>
                <th className="border p-2 text-left">업무 내용</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="border p-2">㈜휴먼소프트웨어</td>
                <td className="border p-2">회원DB관리 및 후원금 결제정보 관리</td>
                </tr>
                <tr>
                <td className="border p-2">금융결제원</td>
                <td className="border p-2">정기 후원금 CMS 자동이체 납입 및 내역 관리</td>
                </tr>
                <tr>
                <td className="border p-2">㈜나이스정보통신</td>
                <td className="border p-2">신용카드, 실시간 계좌이체 후원금 결제</td>
                </tr>
                <tr>
                <td className="border p-2">로젠택배</td>
                <td className="border p-2">상품 배송</td>
                </tr>
            </tbody>
            </table>
            <p className="mt-4">
            ② 티아라는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
            </p>
            <p className="mt-4">
            ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
            </p>
        </div>
        </div>


        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">6. 정보주체의 권리, 의무 및 그 행사방법</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
            </p>
            <ol className="list-decimal ml-6 mt-2">
              <li>
                정보주체는 티아라에 대해 언제든지 개인정보 열람요구, 오류 등이 있을 경우 정정 요구, 삭제요구,
                처리정지 요구의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </li>
              <li className="mt-2">
                제1항에 따른 권리 행사는 티아라에 대해 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편,
                모사전송(FAX) 등을 통하여 하실 수 있으며 티아라는 이에 대해 지체 없이 조치하겠습니다.
              </li>
              <li className="mt-2">
                정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 티아라는 정정 또는 삭제를 완료할 때까지
                당해 개인정보를 이용하거나 제공하지 않습니다.
              </li>
              <li className="mt-2">
                제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.
                이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
              </li>
            </ol>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">7. 처리하는 개인정보의 항목</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>티아라는 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <ol className="list-decimal ml-6 mt-2">
              <li>회원/후원자/이용자 식별: 이름, 생년월일, 이메일, 휴대전화번호</li>
              <li>후원금 후원 요청: 후원계좌, 신용카드 결제 정보, 휴대전화번호</li>
              <li>
                활동내용 공유 경로 확보: 이메일, 휴대전화번호, 우편물 수령 주소, 페이스북 계정, 트위터 계정
              </li>
              <li>기부금 영수증 발급: 이름, 주민등록번호, 후원내역</li>
            </ol>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">8. 개인정보의 파기</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              티아라는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다.
              파기의 절차, 기한 및 방법은 다음과 같습니다.
            </p>
            <p className="mt-2 font-bold">○ 파기절차</p>
            <p className="mt-2">
              이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타
              관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는
              다른 목적으로 이용되지 않습니다.
            </p>
            <p className="mt-2 font-bold">○ 파기기한</p>
            <p className="mt-2">
              이용자의 개인정보는 보유기간이 만료되었거나 개인정보의 처리목적달성, 해당 업무의 폐지 등 그 개인정보가
              불필요하게 되었을 때에는 지체 없이 파기합니다.
            </p>
            <p className="mt-2 font-bold">○ 파기방법</p>
            <p className="mt-2">
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
              종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
            </p>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">9. 개인정보의 안전성 확보 조치</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              티아라는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적, 관리적, 물리적 조치를 하고 있습니다.
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>개인정보 취급 직원의 최소화 및 교육</li>
              <li>개인정보에 대한 접근 제한</li>
              <li>내부관리계획의 수립 및 시행</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보의 암호화</li>
              <li>접속기록의 보관 및 위변조 방지</li>
              <li>문서보안을 위한 잠금장치 사용</li>
              <li>비인가자에 대한 출입 통제</li>
            </ul>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">10. 개인정보 보호책임자 및 담당자</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              티아라는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <p className="mt-2">
              ○ 개인정보 보호책임자: C201(C201)
            </p>
            <p className="mt-2">
              ○ 개인정보 보호 담당 부서: C201
            </p>
            <p className="mt-2">
              정보주체께서는 티아라의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한
              사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 티아라는 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
            </p>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">11. 권익침해 구제방법</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나
              상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
            </p>
            <p className="mt-2">
              개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)
            </p>
            <p className="mt-2">
              개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)
            </p>
            <p className="mt-2">
              대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)
            </p>
            <p className="mt-2">
              경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)
            </p>
            <p className="mt-2">
              「개인정보보호법」제35조, 제36조, 제37조에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.
            </p>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">12. 영상정보처리기기 설치․운영</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>티아라는 아래와 같이 영상정보처리기기를 설치․운영하고 있습니다.</p>
            <p className="mt-2">
              1. 영상정보처리기기 설치근거․목적: 티아라의 시설안전․화재예방
            </p>
            <p className="mt-2">
              2. 설치 대수, 설치 위치, 촬영 범위: [사옥 로비 등 주요시설물]에 49대 설치, 촬영범위는 주요시설물의 전 공간을 촬영
            </p>
            <p className="mt-2">
              3. 관리책임자, 담당부서 및 영상정보에 대한 접근권한자: C201 (그룹장, 인사총무팀)
            </p>
            <p className="mt-2">
              4. 영상정보 촬영시간, 보관기간, 보관장소, 처리방법:
              <br />
              촬영시간: 24시간 촬영
              <br />
              보관기간: 촬영시부터 30일
              <br />
              보관장소 및 처리방법: C201 영상정보처리기기 통제실에 보관․처리
            </p>
            <p className="mt-2">
              5. 영상정보 확인 방법 및 장소: 관리책임자에 요구 (C201장)
            </p>
            <p className="mt-2">
              6. 정보주체의 영상정보 열람 등 요구에 대한 조치: 개인영상정보 열람․존재확인 청구서로 신청하여야 하며,
              정보주체 자신이 촬영된 경우 또는 명백히 정보주체의 생명․신체․재산 이익을 위해 필요한 경우에 한해 열람을 허용합니다.
            </p>
            <p className="mt-2">
              7. 영상정보 보호를 위한 기술적․관리적․물리적 조치: 내부관리계획 수립, 접근통제 및 접근권한 제한, 영상정보의 안전한 저장․전송기술 적용, 처리기록 보관 및 위․변조 방지조치, 보관시설 마련 및 잠금장치 설치
            </p>
          </div>
        </div>

        <div className="px-20 py-2 border-t border-gray-200">
          <h2 className="font-bold text-xl mb-2">13. 개인정보처리방침의 변경</h2>
          <div className="text-md text-gray-700 leading-relaxed">
            <p>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는
              홈페이지의 '공지사항'을 통해 이전의 개인정보 처리방침을 고지할 것입니다.
            </p>
            <p className="mt-2 font-bold">
              - 공고일자: 2025년 2월 16일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
