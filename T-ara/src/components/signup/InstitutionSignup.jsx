const Institution =() =>{

    return(
        <div className="flex-grow">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center mb-2">회원가입</h1>
                <p className="text-gray-600 text-center mb-8">보호소 정보를 알려주세요</p>

                <div className="max-w-3xl mx-auto mx-auto bg-white p-8 rounded shadow">
                    <form className="space-y-6">

                        <div>
                            <label className="block font-medium mb-1">
                                보호소 이름 <span className="text-red-500">*</span>
                            </label>
                            <input
                             type="text"
                              className="w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring focus:ring-orange-200"
                              placeholder="보호소 이름을 입력해주세요."
                              required
                              />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                고유번호호 <span className="text-red-500">*</span>
                            </label>
                            <input
                             type="text"
                              className="w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring focus:ring-orange-200"
                              placeholder="고유번호를 입력해주세요."
                              required
                              />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                지역 <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-200"
                            required
                            >
                                <option value="">지역선택</option>
                                <option value="인천">인천</option>
                                <option value="서울">서울</option>
                                <option value="경기">경기</option>
                                <option value="강원">강원</option>
                                <option value="충북">충북</option>
                                <option value="대전/충남/세종">대전/충남/세종</option>
                                <option value="대구/경북">대구/경북</option>
                                <option value="전북">전북</option>
                                <option value="광주/전남">광주/전남</option>
                                <option value="부산/울산/경남">부산/울산/경남</option>
                                <option value="제주">제주주</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                이메일 <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-2">
                                <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring focus:ring-orange-200"
                                placeholder="이메일을 입력해주세요."
                                required
                                />
                                <span className="py-2 text-black-500">
                                    @
                                </span>

                                <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring focus:ring-orange-200"
                                placeholder="이메일을 입력해주세요."
                                required
                                />

                            </div>
                        
                        </div>


                        <div>
                            <label className="block font-medium mb-1">
                                아이디 <span className="text-red-500">*</span>
                            </label>

                            <div className="flex">
                                <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring focus:ring-orange-200"
                                placeholder="아이디를 입력해주세요."
                                required
                                />

                                <button className="whitespace-nowrap bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
                                    중복확인
                                </button>
                            </div>
                            <span className="text-sm text-gray-400 block">
                                    5~10자 영문 소문자/숫자 조합
                            </span>

                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                비밀번호 <span className="text-red-500">*</span>
                            </label>

                            <input type="password" 
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ouline-none focus:ring focus:ring-orange-200"
                            placeholder="비밀번호를 입력해주세요."
                            required
                            />
                            <span className="text-sm text-gray-400 block">영문,숫자,특수문자 조합 8~15자</span>

                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                비밀번호 확인 <span className="text-red-500">*</span>
                            </label>

                            <input type="password" 
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ouline-none focus:ring focus:ring-orange-200"
                            placeholder="비밀번호 확인을 위해 한번 더 입력해주세요."
                            required
                            />

                        </div>

                        {/*주소는 잠시 패스 귀찮아서 */}

                        <div>
                            <label className="block font-medium mb-1">프로필 사진</label>
                            <div className="flex item-center space-x-4">
                                <div className="w-30 h-35 border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
                                    <span>No Image</span>
                                </div>
                                <div className="flex flex-col ">
                                    <h3 className="font-bold">사진 업로드 가이드</h3>
                                    <p className="text-gray-400 text-[12px]">
                                        권장 해상도: 200 x 200(px)<br/>
                                        파일 양식: JPG,JPEG,PNG<br/>
                                        최대 용량: 5MB 이하
                                    </p>
                                    <button className="whitespace-nowrap bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 mt-[5px]  cursor-pointer">
                                    사진 업로드
                                    </button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
                <label className="inline-flex items-center space-x-2">
                    <input type="checkbox"
                    className="form-checkbox h-5 w-5 text-orange-500"
                    />
                    <span className="font-bold text-[14px]">이용약관,개인정보 수정 및 이용,세이브더칠드런 활동 안내 수신에 모두 동의합니다.</span>
                   </label>
                   <hr />


                   <label className="inline-flex items-center space-x-2 mt-3">
                    <input type="checkbox"
                    className="form-checkbox h-5 w-5 text-orange-500"
                    />
                    <p className="flex text-[13px]">
                        <span className="text-red-500 text-[13px]">(필수)</span>
                        서비스 이용약관에 동의합니다.
                    </p>
                   </label>
                   <br/>

                   <label className="inline-flex items-center space-x-2 mt-3">
                    <input type="checkbox"
                    className="form-checkbox h-5 w-5 text-orange-500"
                    />
                    <p className="flex text-[13px]">
                        <span className="text-red-500 text-[13px]">(필수)</span>
                        개인정보 수집 및 이용에 동의합니다.
                    </p>
                   </label>
                </div>


                <div className="flex justify-between">
                <button
                  type="button"
                  className="w-70 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-600 cursor-pointer"
                >
                  이전
                </button>
                <button
                  type="submit"
                  className="w-70 bg-red-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                >
                  회원가입 완료
                </button>
              </div>
               
            </div>
        </div>
    )
}
export default Institution