const CheckPassword = ({ onPasswordChecked }) => {
    const handleCheck = () => {
      // 비밀번호 확인 로직 (예: API 호출 후 성공 시)
      const isPasswordCorrect = true; // 실제로는 API 결과에 따라 설정해야 함
      if (isPasswordCorrect) {
        onPasswordChecked(); // 성공 시 원래 가려던 페이지로 이동
      }
    };
  
    return (
      <div className="p-4 h-100%">
        <h1 className="text-3xl font-bold pl-2">
            회원정보
        </h1>
        <hr className="mt-3 w-full"/>
        <div className="h-180  flex flex-col items-center justify-center gap-10">
            <p className="text-xl">
                회원정보 조회를 위해서는 인증이 필요합니다. <br />
                보안을 위해 비밀번호를 한번 더 입력해 주세요.
            </p>
            <input type="text" placeholder="비밀번호를 입력하세요" className="border border-gray-400 rounded-lg p-2 w-[550px] h-[50px]" />
            <button className="bg-red-500 text-white font-bold w-[200px] h-[50px] ">
                확인
            </button>
        </div>
      </div>
    );
  };
  
  export default CheckPassword;
  