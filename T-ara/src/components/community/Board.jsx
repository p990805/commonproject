const Board =() => {

    return(
        <div className="w-full bg-white rounded-md shadow-md">
            <div className="px-6 py-4 border-y">
                <p className="text-lg font-bold text-gray-900">자유 게시판</p>
            </div>

            
            <ul role="list" className="divide-y divide-black">
                
                <li className="flex justify-between items-start gap-x-6 px-6 py-5">
                
                <div className="flex flex-col gap-4 w-full">
                    
                    <div className="flex items-center gap-x-4">
                    <img
                        src="/assets/nanum1.png"
                        alt="작성자 프로필"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-bold text-gray-900">광주 동물보호센터</p>
                        <p className="text-xs text-gray-500">2시간 전</p>
                    </div>
                    </div>

                    
                    <div>
                    <h2 className="text-base font-bold text-gray-900 mb-2">
                        내 사랑스러운 고양이 자랑 : 다미의 일상!
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        고양이 카페에 갔다가 다미를 만났는데, 그 큰 눈과 부드러운 털에
                        반해버렸어요! 보호소에서 처음 왔을 때, 진짜 "이건 운명이다!" 싶었답니다.
                        다미는 장난감과가 친구예요. 하루 종일 놀아나며, 벽에 있는 그림을
                        차단하면서 지저귀며 고개를 좌우로 흔드는 모습이 너무 귀여워요.{" "}
                        <span className="text-gray-500">#해시태그</span>
                    </p>
                    </div>

                    
                    <div className="flex items-center gap-x-6 text-xs text-gray-500">
                    <span>조회수 190</span>
                    <span>좋아요 12</span>
                    <span>댓글 8</span>
                    </div>
                </div>

                
                <img
                    src="/assets/nanum2.png"
                    alt="게시글 이미지"
                    className="w-40 h-45 object-cover rounded-md"
                />
                </li>

                
                <li className="flex justify-between items-start gap-x-6 px-6 py-5">
                
                <p>테스트 게시글2</p>
                </li>
            </ul>
            </div>

    )
}
export default Board;