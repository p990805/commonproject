const Withdraw =() => {

    return(
        <div >
            <div className="w-full bg-white mt-5 p-5">
                <h1 className="font-black text-3xl p-7">회원탈퇴</h1>
                <hr />
                <div className="flex flex-col gap-5 items-center justify-center my-10">
                    <img src="/assets/withdraw.png" alt="주의" className="w-15 h-15" />

                    <p className="text-2xl font-bold text-center">티아라 회원 탈퇴 신청에 앞서 <br />아래 사항을 반드시 확인해 주시기 바랍니다.</p>
                    
                </div>

                <div className="flex items-center justify-center flex-col mb-10">
                   <img src="/assets/withdraw2.png" alt="탈퇴 유의사항" />
                   <div className="flex flex-col gap-15">

                        <div className="flex gap-5 items-center justify-center">
                            <h1 className="text-5xl font-bold">01</h1>
                            <div className="flex flex-col">
                                <p className="font-bold bg-amber-100">회원탈퇴는 "티아라 홈페이지 탈퇴" 를 의미하며 <span className="text-amber-900 ">홈페이지 회원탈퇴로 후원종료가 이루어지지 않습니다.</span></p>
                                <p>진행중인 후원이 있는 경우, 탈퇴 전 후원 중지 여부를 명확히 확인 하여 모든 후원을 모두 취소 완료한 후 탈퇴해야 합니다.</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-center justify-center">
                            <h1 className="text-5xl font-bold">02</h1>
                            <div className="flex flex-col">
                                <p>후원회원이 아닌 경우, 홈페이지 회원탈퇴 후 7일간 개인정보를 보유하며 이후 홈페이지 탈퇴 회원의 별도 요청이 없는 경우<br />홈페이지 회원정보는 모두 삭제합니다.</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-center justify-center">
                            <h1 className="text-5xl font-bold ">03</h1>
                            <div className="flex flex-col">
                                <p>홈페이지 회원이면서 후원회원인 경우, 홈페이지 탈퇴와 후원종료를 요청하는 경우에도 개인정보는 추후 각종 증명서 발급<br />
                                또는 회원관리 업무를 위해 계속 보유합니다. 다만, 홈페이지 회원 혹은 후원자가 개인정보 삭제를 요청할 경우 등록되어 있는 <br />
                                개인정보를 폐기하며, 개인정보 폐기 후에는 추후 발생될 수 있는 각종 증명서 발급 또는 회원관리 업무를 지원하지 않습니다.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-center">
                            <h1 className="text-5xl font-bold">04</h1>
                            <p>회원 탈퇴 후 개인정보는 30일 내에</p>
                        </div>
                   </div>
                   <img src="/assets/withdraw3.png" alt="유의사항 아래부분분" />
                </div>
               

                <div className="bg-white p-5 border-b">
                    <h1 className="font-black text-3xl p-5">회원정보</h1>
                </div>

                <div className="flex flex-col p-4 gap-10">
                    <div className="p-3 flex items-center gap-50">
                        <p>이름</p>
                        <input type="text" placeholder="이름"  className="p-2 border border-gray-300 w-[20%]"/>
                    </div>

                    <div className="p-3 flex items-center gap-46">
                        <p>아이디</p>
                        <input type="text" placeholder="아이디"  className="p-2 border border-gray-300 w-[20%]"/>
                    </div>
                    
                    <div className="p-3 flex items-center gap-42">
                        <p>비밀번호</p>
                        <input type="text" placeholder="비밀번호"  className="p-2 border border-gray-300 w-[20%]"/>
                    </div>

                    <div className="p-3 flex gap-42 items-start">
                        <p className="mt-2 text-gray-700">탈퇴사유</p>
                        <textarea
                            placeholder="탈퇴 사유를 작성해 주세요."
                            className="p-3 border border-gray-300 rounded w-[50%] h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>


                </div>

                <hr />

                <div className="flex items-center justify-center py-10 gap-2">
                    <input type="checkbox" id="custom-checkbox" className="hidden peer" />
                    <label htmlFor="custom-checkbox"
                    className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-400 hover:border-red-500 hover:text-red-500 peer-checked:border-red-500 peer-checked:bg-white peer-checked:text-red-500 transition"
                    >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                    </svg>
                    </label>

                    <p className="font-black text-[20px]">위 유의사항을 모두 확인하였고, 회원 탈퇴에 동의합니다.</p>

                </div>

                <div className="flex items-center justify-center my-5 gap-5">
                    <button className="px-3 py-2 bg-red-500 text-white w-[400px] h-[60px] rounded cursor-pointer">웹회원 탈퇴</button>
                    <button className="px-3 py-2 border border-gray-400 rounded w-[400px] h-[60px] cursor-pointer">취소</button>
                </div>
                
            </div>

           
        </div>
    )
}
export default Withdraw;