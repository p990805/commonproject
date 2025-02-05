import React from "react";

const Payment = () => {
  const handlePayment = () => {
    const { IMP } = window;
    IMP.init("imp18166354"); // 테스트용 가맹점 코드

    IMP.request_pay(
      {
        pg: "uplus", // PG사
        pay_method: "card", // 결제 방법
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        name: "테스트 상품",
        amount: 10000, // 가격
        buyer_email: "test@example.com",
        buyer_name: "홍길동",
        buyer_tel: "010-1234-5678",
      },
      (response) => {
        console.log(response);
        if (response.success) {
          alert("✅ 결제 성공!\n" + JSON.stringify(response));
        } else {
          alert("❌ 결제 실패: " + response.error_msg);
        }
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>포트원 일반 결제 테스트</h1>
      <button onClick={handlePayment}>테스트 결제하기</button>
    </div>
  );
};

export default Payment;
