import "../styles/IndividualSignup.css";

const Individual = () => {
  return (
    <div className="container">
      <div className="form-box">
        <h1 className="title">회원가입</h1>
        <p className="subtitle">회원정보를 입력해 주세요.</p>

        <form>
          {/* 이름 */}
          <div className="form-group">
            <label className="label">
              이름 <span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" className="input" placeholder="이름" />
          </div>

          {/* 생년월일 */}
          <div className="form-group">
            <label className="label">
              생년월일 <span style={{ color: "red" }}>*</span>
            </label>
            <input type="date" className="input" />
          </div>

          {/* 닉네임 */}
          <div className="form-group">
            <label className="label">
              닉네임 <span style={{ color: "red" }}>*</span>
            </label>
            <div className="flex">
              <input type="text" className="input" placeholder="닉네임" />
              <button type="button" className="button button-secondary">
                중복확인
              </button>
            </div>
          </div>

            {/* 휴대폰 번호호 */}
            <div className="form-group">
            <label className="label">
                휴대폰 번호 <span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" className="input" placeholder="'-'를 제외하고 숫자만 입력" />
            </div>
          

          {/* 이메일 */}
          <div className="form-group">
            <label className="label">
              이메일 <span style={{ color: "red" }}>*</span>
            </label>
            <div className="flex">
              <input type="email" className="input" placeholder="이메일" />
              <p>@</p>
              <input type="email" className="input"  />
              <select className="input">
                <option>직접입력</option>
                <option>@gmail.com</option>
                <option>@naver.com</option>
              </select>
            </div>
            <p className="infor_message">해당 이메일로 알람 및 후원 관련 안내가 발송됩니다.</p>
          </div>

          {/* 아이디 */}
          <div className="form-group">
            <label className="label">
              아이디 <span style={{ color: "red" }}>*</span>
            </label>
            <div className="flex">
              <input type="text" className="input" placeholder="아이디" />
              <button type="button" className="button button-secondary">
                중복확인
              </button>
            </div>
            <p className="infor_message">아이디는 5~10 자리 영문 소문자와 숫자로 입력해 주세요.</p>
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label className="label">
              비밀번호 <span style={{ color: "red" }}>*</span>
            </label>
            <input type="password" className="input" placeholder="비밀번호" />
            <p className="infor_message">비밀번호는 영문, 숫자 소문자와 숫자로 입력해주세요.</p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group">
            <label className="label">
              비밀번호 확인 <span style={{ color: "red" }}>*</span>
            </label>
            <input type="password" className="input" placeholder="비밀번호 확인" />
          </div>

          {/* 사진 업로드 */}
          <div className="form-group">
            <label className="label">사진</label>
            <div className="photo-container">
              <img src="/placeholder.png" alt="프로필" className="photo" />
              <div className="text-container">
              <h3>사진 업로드 가이드</h3>
              <p>권장 사이즈 : 최소 200 x 200 이상</p>
              <p>파일형식 : JPG,JPEG,PNG</p>
              <p>최대 용량: 5MB 이하</p>
              <button type="button" className="button button-secondary">
                사진등록
              </button>
              </div>
            </div>
          </div>
        </form>
        </div>
        <div className="form-box">
          {/* 약관 동의 */}
          <div className="form-group">
            <label className="flex">
              <input type="checkbox" style={{ marginRight: "8px" }} />
              이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
            </label>
          </div>
          <hr />

          <label className="flex">
              <input type="checkbox" style={{ marginRight: "8px" }} />
                <span>(필수)</span>서비스 이용약관에 동의합니다.
                
            </label>

            <label className="flex">
              <input type="checkbox" style={{ marginRight: "8px" }} />
                <span>(필수)</span>개인정보 수집 및 이용에 동의합니다.
                
            </label>
        </div>

        {/* 버튼 */}
          <div className="button-container">
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <button type="button" className="cancel-button">
              이전
            </button>
            <button type="submit" className="submit-button">
              회원가입 완료
            </button>
          </div>    
        </div>  
    </div>
  );
};

export default Individual;
