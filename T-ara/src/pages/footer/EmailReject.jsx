// src/components/EmailReject.jsx
import { Link } from "react-router-dom";

const EmailReject = () => {
  return (
    <div className="w-full h-[73.2vh] bg-white m-0">
        <div className="bg-red-100 px-20 py-2 flex items-center align-middle gap-4">
            <Link to="/" className="hover:underline">
                Home
            </Link>
            <p className="text-2xl">/</p>
            <Link to="/emailreject" className="text-red-600 hover:underline">
                이메일 무단수집 거부
            </Link>
        </div>
        <div className="px-20 py-8 flex flex-col">
            <h1 className="font-black text-4xl">이메일 무단수집 거부</h1>
        </div>

        <div className="px-20 py-2 flex flex-col gap-6 text-md">
            <p>웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, <br />
            이를 위반 시 정보통신망법에 의해 형사 처벌됨을 유념하시기 바랍니다.
            </p>
            <p>
                이메일을 기술적 장치를 사용하여 무단으로 수집, 판매, 유통하거나 이를 이용한 자는「정보통신망이용촉진 및 정보보호 등에 관한 법률」<br/>
                제50조의 2 규정에 의하여 1천만원 이하의 벌금형에 처해집니다.
            </p>
        </div>

    </div>
  );
};

export default EmailReject;
