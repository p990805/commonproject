import React from "react";

const BillingKey = () => {
  const handleBillingKey = () => {
    const { IMP } = window;
    IMP.init("imp18166354"); // 테스트용 가맹점 코드

    IMP.request_pay(
      {
        pg: "tosspayments", // ✅ 정기결제 지원되는 PG사
        pay_method: "card",
        merchant_uid: `billing_${new Date().getTime()}`, // 고유 주문번호 (빌링키 발급용)
        name: "정기결제 카드 등록",
        amount: 0, // ✅ 카드 등록이므로 0원 결제 요청
        customer_uid: "user_1234", // ✅ 고객을 구분할 수 있는 고유 ID
        buyer_email: "test@example.com",
        buyer_name: "홍길동",
        buyer_tel: "010-1234-5678",
      },
      (response) => {
        console.log(response);
        if (response.success) {
          alert(
            "✅ 카드 등록 성공! 빌링키가 발급되었습니다.\n" +
              JSON.stringify(response)
          );
        } else {
          alert("❌ 카드 등록 실패: " + response.error_msg);
        }
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>포트원 정기결제 - 카드 등록</h1>
      <button onClick={handleBillingKey}>카드 등록하기</button>
    </div>
  );
};

export default BillingKey;
