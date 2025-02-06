// src/components/Calendar.jsx
import React, { useState } from "react";

function CalendarModule({ onSelectDate }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // JS는 0~11이므로 +1
  const [selectedDay, setSelectedDay] = useState(null);

  // 이번 달 1일의 요일과 마지막 날짜 계산
  const firstDayDate = new Date(year, month - 1, 1);
  const firstDay = firstDayDate.getDay(); // 0=일, 6=토
  const lastDate = new Date(year, month, 0).getDate();

  // 달력에 표시할 배열 생성 (빈 칸 포함)
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= lastDate; d++) {
    daysArray.push(d);
  }

  // 7일씩 끊어서 weeks 배열 생성
  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  // 이전/다음 달 이동 (달 이동 시 선택된 날짜 초기화)
  const goToPrevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear = year - 1;
    }
    setYear(newYear);
    setMonth(newMonth);
    setSelectedDay(null);
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
    setSelectedDay(null);
  };

  // 예시로 24, 25일은 예약 불가능한 날짜로 가정
  const unavailableDays = [24, 25];

  return (
    <div className="max-w-sm mx-auto p-4">
      {/* 헤더: 연도/월, 이전/다음 버튼 */}
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

      {/* 요일 표시 */}
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
          <React.Fragment key={wi}>
            {week.map((day, di) => {
              if (!day) {
                // 빈 칸 처리
                return (
                  <div key={di} className="h-10 flex items-center justify-center">
                    <div className="w-8 h-8" />
                  </div>
                );
              }

              const isUnavailable = unavailableDays.includes(day);
              const isSelected = selectedDay === day;

              return (
                <div key={di} className="h-10 flex items-center justify-center">
                  <div
                    onClick={() => {
                      // 예약 불가능한 날짜는 클릭 불가 처리
                      if (!isUnavailable) {
                        setSelectedDay(day);
                        // 선택된 날짜 정보를 Date 객체로 부모에 전달
                        onSelectDate && onSelectDate(new Date(year, month - 1, day));
                      }
                    }}
                    className={`
                      w-8 h-8 flex items-center justify-center rounded-full cursor-pointer
                      ${isSelected ? "ring ring-offset-2 ring-blue-500" : ""}
                      ${isUnavailable ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-600"}
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

export default CalendarModule;
