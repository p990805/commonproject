import React from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const ShelterDetailPage = () => {
  const { id } = useParams();

  const incomeData = [
    { name: "일시후원", value: 100, color: "#4B89DC" },
    { name: "정기후원", value: 62, color: "#37B24D" },
    { name: "캠페인후원", value: 50, color: "#FAB005" },
    { name: "기타", value: 28, color: "#15AABF" },
  ];

  const expenseData = [
    { name: "식비", value: 71, color: "#4B89DC" },
    { name: "위생/미용", value: 49, color: "#37B24D" },
    { name: "건강용품", value: 48, color: "#FAB005" },
    { name: "놀이용품", value: 34, color: "#15AABF" },
    { name: "기타", value: 39, color: "#7950F2" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">광주 동물보호센터</h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">고유번호</p>
            <p className="font-bold">62-613-6770121</p>
          </div>
          <div>
            <p className="text-gray-600">전화번호</p>
            <p className="font-bold">062-764-3708</p>
          </div>
          <div>
            <p className="text-gray-600">관리기관</p>
            <p className="font-bold">광주광역시 북구</p>
          </div>
          <div>
            <p className="text-gray-600">이메일</p>
            <p className="font-bold">gwangjuanimals@gmail.com</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">보호센터주소</p>
          <p className="font-bold">광주광역시 북구 본촌마을길 25-1(본촌동)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">수입내역</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>기부금 수입</span>
              <span>2,410,000</span>
            </div>
            <div className="flex justify-between">
              <span>정기 후원</span>
              <span>800,000</span>
            </div>
            <div className="flex justify-between">
              <span>일시 후원</span>
              <span>1,200,000</span>
            </div>
            <div className="flex justify-between">
              <span>캠페인 후원</span>
              <span>410,000</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>후원합계</span>
              <span>2,400,000</span>
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    value="240"
                    position="center"
                    fill="#000000"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4">
              {incomeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">지출내역</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>식비</span>
              <span>710,000</span>
            </div>
            <div className="flex justify-between">
              <span>위생/미용</span>
              <span>490,000</span>
            </div>
            <div className="flex justify-between">
              <span>건강용품</span>
              <span>480,000</span>
            </div>
            <div className="flex justify-between">
              <span>놀이용품</span>
              <span>340,000</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>지출합계</span>
              <span>2,020,000</span>
            </div>
          </div>
          <div className="h-64 mt-4 mb-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    value="202"
                    position="center"
                    fill="#000000"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4">
              {expenseData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDetailPage;
