// src/components/Calendar.jsx
import React, { useState } from "react";

function Calendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // JS는 0~11이므로 +1

  // 이번 달 1일, 요일, 마지막 날짜 계산
  const firstDayDate = new Date(year, month - 1, 1);
  const firstDay = firstDayDate.getDay(); // 0=일, 6=토
  const lastDate = new Date(year, month, 0).getDate();

  // 달력 배열 만들기
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= lastDate; d++) {
    daysArray.push(d);
  }

  // 7일씩 끊어서 weeks 생성
  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  // 이전/다음 달 이동
  const goToPrevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear = year - 1;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  const goToNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear = year + 1;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  // 예시: 24, 25일은 예약 불가능(빨간색), 나머지는 가능(파란색)이라고 가정
  // 실제로는 props나 API 데이터로 받아서 처리하시면 됩니다.
  const unavailableDays = [24, 25];

  return (
    <div className="max-w-sm mx-auto p-4">
      {/* 헤더 (년/월, 이전/다음 버튼) */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrevMonth}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          이전
        </button>
        <div className="font-semibold">
          {year}년 {month}월
        </div>
        <button
          onClick={goToNextMonth}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          다음
        </button>
      </div>

      {/* 요일 표기 */}
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 영역 */}
      <div className="grid grid-cols-7 text-center gap-y-2">
        {weeks.map((week, wi) => (
          // React.Fragment 대신 <> 짧은 문법 사용
          <React.Fragment key={wi}>
            {week.map((day, di) => {
              if (!day) {
                // 빈 칸(null)
                return (
                  <div key={di} className="h-10 flex items-center justify-center">
                    <div className="w-8 h-8" />
                  </div>
                );
              }

              const isUnavailable = unavailableDays.includes(day);

              return (
                <div key={di} className="h-10 flex items-center justify-center">
                  <div
                    className={`
                      w-8 h-8 flex items-center justify-center rounded-full
                      ${
                        isUnavailable
                          ? "bg-red-100 text-red-500"
                          : "bg-blue-100 text-blue-600"
                      }
                    `}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
