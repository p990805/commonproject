import "../styles/ChooseSignup.css"
import { useNavigate } from "react-router-dom";

const ChooseSignup=()=>{

    const nav = useNavigate();

    const navIndividual = () => {
        nav("/signup/individual");
    }

    const navInstitution =() => {
        nav("/signup/institution")
    }

    return(
        <div className="signup-container">
            <div className="context-container">
                <h1>회원가입</h1>
                <p>해당하는 회원 유형을 선택해 주세요</p>
            </div>
            <div className="choosebox-container">
                <div className="choosebox-option">
                    <p>개별 회원만 가입</p>
                    <h3>개인회원</h3>
                    <button onClick={navIndividual}>
                        <img src="./assets/signup-icon.png" className="icon"/>                     
                        회원 가입하기</button>
                </div>

                <div className="choosebox-option">
                    <p>개인 . 법인 사업자 및 2인 이상의 단체</p>
                    <h3>보호소(개인,법인), 단체 회원</h3>
                    <button onClick={navInstitution}>
                        <img src="./assets/signup-icon.png" className="icon"/>                     
                        회원 가입하기</button>
                </div>
            </div>

        </div>
    )
}
export default ChooseSignup;