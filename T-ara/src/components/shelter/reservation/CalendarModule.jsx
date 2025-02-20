import React, { useState, useEffect, useRef } from "react";

// 로컬 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

function CalendarModule({ onSelectDate, disabledDates = [], resetSelection }) {
  const calendarRef = useRef(null);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const maxSelectableDate = new Date(today);
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 13);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    console.log("CalendarModule disabledDates:", disabledDates);
  }, [disabledDates]);

  // resetSelection prop로 캘린더 선택 초기화
  useEffect(() => {
    if (resetSelection) {
      setSelectedDate("");
    }
  }, [resetSelection]);

  // 밖 클릭 감지를 위해 ref 사용
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setSelectedDate("");
      onSelectDate && onSelectDate("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const firstDayDate = new Date(year, month - 1, 1);
  const firstDay = firstDayDate.getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= lastDate; d++) {
    daysArray.push(d);
  }

  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  const goToPrevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear = year - 1;
    }
    setYear(newYear);
    setMonth(newMonth);
    setSelectedDate("");
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
    setSelectedDate("");
  };

  return (
    <div className="max-w-sm mx-auto p-4" ref={calendarRef}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPrevMonth} className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
          이전
        </button>
        <div className="font-semibold">
          {year}년 {month}월
        </div>
        <button onClick={goToNextMonth} className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
          다음
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-gray-600">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center gap-y-2">
        {weeks.map((week, wi) => (
          <React.Fragment key={wi}>
            {week.map((day, di) => {
              if (!day) {
                return (
                  <div key={di} className="h-10 flex items-center justify-center">
                    <div className="w-8 h-8" />
                  </div>
                );
              }
              const currentDay = new Date(year, month - 1, day);
              const dayString = formatDate(currentDay);
              // 오늘 및 과거는 회색 처리
              const isDisabled = currentDay <= today || currentDay > maxSelectableDate || disabledDates.includes(dayString);
              const isSelected = dayString === selectedDate;

              let dayClass = "";
              if (currentDay <= today || currentDay > maxSelectableDate) {
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
                      setSelectedDate(dayString);
                      onSelectDate && onSelectDate(dayString);
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
