const MyInformation =() => {

    return(
        <div className="p-4 h-[600px]">
        <h1 className="text-3xl font-bold pl-2">
            회원정보
        </h1>
        <hr className="mt-3 w-full"/>
        <div className="p-4 flex items-center bg-gray-200 gap-10">
            <p className="font-black">기본 정보</p>
            <p className="text-[14px]">회원정보를 확인해 주세요</p>
        </div>
        <div className="p-4 grid-cols-3 flex gap-20 h-full">
            <div className="font-bold flex flex-col justify-between w-35">
                <p>성명</p>
                <p>생년월일</p>
                <p>아이디</p>
                <p>비밀번호</p>
                <p>휴대폰 번호</p>
                <p>닉네임</p>
                <p className="font-thin text-sm">내새꾸 활동안내<br /> 수신동의</p>
            </div>

            <div className=" flex flex-col justify-between w-105 ">
                <p>박주찬</p>
                <p>1999년 08월 05일</p>
                <p>p990805</p>
                <button className="bg-gray-700 cursor-pointer w-30 p-2 text-white rounded text-[13px] ">비밀번호 변경</button>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                    <p>010-8508-8650</p>
                    <button className="bg-gray-700 text-white w-30 p-2 rounded text-[13px]">연락처 변경</button>
                    </div>
                <p className="text-gray-400 text-[10px]">안전한 개인정보 보호를 위해 휴대폰 번호 변경 시, 본인명의 휴대폰 인증이 반드시 필요합니다. <br />(단,14세 미만 혹은 기업/단체 후원자 휴대폰 인증 불가)</p>
                </div>
                <div className="flex gap-2">
                <input type="text" placeholder="박주찬" className="border rounded h-10 p-2" />
                <button className="bg-gray-700 text-white p-2 rounded w-20 ">변경</button>
                </div>
                <div>
                    <div>
                        
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center  gap-3">
                <img src="/assets/placeholder.png" alt="프로필사진" className="rounded" />
                <button className="bg-gray-700 text-white p-3 w-40 rounded">
                    사진변경
                </button>
                <p className="text-gray-400 text-[11px]">
                    권장 사이즈: 최소 200x200 이상<br />
                    파일형식: JPG,JPEG,PNG <br />
                    최대용량: 5MB 이하
                </p>
            </div>

           

        </div>
        <div className="flex gap-10 items-center justify-center">
                <button className="bg-red-500 text-white rounded w-50 h-12 p-2">
                    회원정보 수정
                </button>
                <button className="bg-white border rounded border-gray-400 w-50 h-12 p-2">
                    취소
                </button>
        </div>
       
      </div>
    )
}
export default MyInformation