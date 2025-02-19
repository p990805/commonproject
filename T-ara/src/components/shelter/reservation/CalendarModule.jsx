import React, { useState } from "react";

function CalendarModule({ onSelectDate, disabledDates = [] }) {
  const now = new Date();
  // 오늘은 자정 기준 (오늘 선택 가능)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // 최대 선택 가능 날짜: 오늘 포함 2주 (today + 13일)
  const maxSelectableDate = new Date(today);
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 13);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // JS 월은 0~11
  const [selectedDay, setSelectedDay] = useState(null);

  // 해당 연,월의 첫 날의 요일과 마지막 날짜 계산
  const firstDayDate = new Date(year, month - 1, 1);
  const firstDay = firstDayDate.getDay();
  const lastDate = new Date(year, month, 0).getDate();

  // 달력에 표시할 날짜 배열 생성 (빈 칸 포함)
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= lastDate; d++) {
    daysArray.push(d);
  }

  // 7일 단위로 week 배열 생성
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

  return (
    <div className="max-w-sm mx-auto p-4">
      {/* 헤더: 연도/월 및 이전/다음 버튼 */}
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
                // 빈 칸
                return (
                  <div key={di} className="h-10 flex items-center justify-center">
                    <div className="w-8 h-8" />
                  </div>
                );
              }
              const currentDay = new Date(year, month - 1, day);
              const dayString = currentDay.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
              const isBeforeToday = currentDay < today;
              const isAfterTwoWeeks = currentDay > maxSelectableDate;
              // disabledDates prop에 포함되면 예약 불가능 날짜 처리
              const isDisabled = isBeforeToday || isAfterTwoWeeks || disabledDates.includes(dayString);
              const isSelected = selectedDay === day;

              // 스타일 결정
              let dayClass = "";
              if (isBeforeToday || isAfterTwoWeeks) {
                dayClass = "bg-gray-300 text-gray-500";
              } else if (disabledDates.includes(dayString)) {
                dayClass = "bg-red-100 text-red-500";
              } else {
                dayClass = "bg-blue-100 text-blue-600";
              }

              return (
                <div key={di} className="h-10 flex items-center justify-center">
                  <div
                    onClick={() => {
                      if (isDisabled) return;
                      setSelectedDay(day);
                      onSelectDate && onSelectDate(currentDay);
                    }}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                      ${isSelected ? "ring ring-offset-2 ring-blue-500" : ""}
                      ${dayClass}
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
