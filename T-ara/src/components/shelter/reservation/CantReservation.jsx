import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import CalendarModule from "../../reservation/Calender"; // 실제 파일 경로에 맞게 수정

const CantReservation = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // "YYYY-MM-DD" 형식
  const [existingTimes, setExistingTimes] = useState([]); // 기존에 등록된 불가능 시간 (전체 문자열, 예: "2025-02-20 16:00:00")
  const [userAddedTimes, setUserAddedTimes] = useState([]); // Calendar에서 선택한 날짜의 시간 (자동 추가)
  const [finalList, setFinalList] = useState([]); // 최종 전송할 불가능 시간 목록 (사용자가 삭제 가능)
  const nav = useNavigate();

  // 동물 리스트 GET 요청: /animal/list/shelter
  useEffect(() => {
    api
      .get("/animal/list/shelter")
      .then((response) => {
        const data = response.data;
        console.log("Fetched animal list:", data);
        if (Array.isArray(data)) {
          setAnimals(data);
        } else if (Array.isArray(data.message)) {
          setAnimals(data.message);
        } else if (Array.isArray(data.animalList)) {
          setAnimals(data.animalList);
        } else {
          console.error("Unexpected response format for animals:", data);
          setAnimals([]);
        }
      })
      .catch((error) => {
        console.error("동물 리스트 불러오기 오류:", error);
      });
  }, []);

  // 동물 선택 시 해당 동물의 기존 불가능 시간 조회 (GET /walk/not-walk/{animalId})
  useEffect(() => {
    if (selectedAnimalId) {
      api
        .get(`/walk/not-walk/${selectedAnimalId}`)
        .then((response) => {
          const data = response.data;
          console.log(
            `Fetched not-walk times for animal ${selectedAnimalId}:`,
            data
          );
          // 응답이 { notWalkList: [ ... ] } 형태라면 사용
          if (data.notWalkList && Array.isArray(data.notWalkList)) {
            setExistingTimes(data.notWalkList);
          } else {
            setExistingTimes([]);
          }
        })
        .catch((error) => {
          console.error("예약 불가 날짜 조회 오류:", error);
          setExistingTimes([]);
        });
    } else {
      setExistingTimes([]);
    }
    // 동물이 변경되면 날짜와 새로 추가한 시간도 초기화
    setSelectedDate("");
    setUserAddedTimes([]);
  }, [selectedAnimalId]);

  // CalendarModule에서 날짜 선택 시 호출되는 콜백 (Date 객체를 "YYYY-MM-DD"로 변환)
  const handleCalendarSelectDate = (date) => {
    const formatted = date.toISOString().split("T")[0];
    setSelectedDate(formatted);
  };

  // selectedDate가 변경되면 해당 날짜의 15:00:00, 16:00:00을 자동으로 추가
  useEffect(() => {
    if (selectedDate) {
      const time1 = `${selectedDate} 15:00:00`;
      const time2 = `${selectedDate} 16:00:00`;
      console.log("Selected date:", selectedDate, "=> adding times:", time1, time2);
      setUserAddedTimes([time1, time2]);
    } else {
      setUserAddedTimes([]);
    }
  }, [selectedDate]);

  // 기존 불가능 시간과 새로 추가한 시간을 합쳐 최종 목록(finalList) 생성 (중복 제거)
  useEffect(() => {
    const combined = Array.from(new Set([...existingTimes, ...userAddedTimes]));
    setFinalList(combined);
  }, [existingTimes, userAddedTimes]);

  // 동물 선택 핸들러
  const handleAnimalChange = (e) => {
    setSelectedAnimalId(e.target.value);
  };

  // 미리보기 영역에서 X 버튼 클릭 시 해당 시간을 목록에서 제거
  const handleRemoveTime = (time) => {
    setFinalList((prevList) => prevList.filter((t) => t !== time));
  };

  // POST 요청으로 불가능 시간 등록
  const handleSubmit = () => {
    if (!selectedAnimalId) {
      alert("동물을 선택해주세요.");
      return;
    }
    if (finalList.length === 0) {
      alert("예약 불가능 날짜와 시간이 선택되지 않았습니다.");
      return;
    }
    const payload = {
      animalId: Number(selectedAnimalId),
      impossibleList: finalList,
    };
    console.log("Payload to be sent:", payload);

    api
      .post("/walk/impossible", payload)
      .then((response) => {
        alert("예약 불가능 시간이 등록되었습니다.");
        console.log("POST response:", response.data);
        window.location.href = "/shelter/walk"; // 강제 새로고침 및 페이지 이동
      })
      .catch((error) => {
        console.error("등록 오류:", error);
        alert("등록에 실패하였습니다.");
      });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">예약 불가 동물 지정</h1>
      
      {/* 미리보기 영역 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">현재 예약 불가능 시간 미리보기</h3>
        {finalList.length === 0 ? (
          <p className="text-gray-500">등록된 예약 불가능 시간이 없습니다.</p>
        ) : (
          <ul className="list-disc list-inside">
            {finalList.map((dt, index) => (
              <li
                key={index}
                className="bg-gray-100 rounded px-2 py-1 my-1 flex justify-between items-center"
              >
                <span>{dt}</span>
                <button
                  onClick={() => handleRemoveTime(dt)}
                  className="text-red-500 font-bold ml-2"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 입력 폼 */}
      <div className="flex flex-col gap-5 mb-6">
        <div className="flex items-center">
          <label htmlFor="animalSelect" className="block font-medium mr-2">
            동물 선택:
          </label>
          <select
            id="animalSelect"
            value={selectedAnimalId}
            onChange={handleAnimalChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">동물을 선택하세요</option>
            {animals.map((animal) => (
              <option key={animal.animalId} value={animal.animalId}>
                {animal.animalName || animal.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* CalendarModule로 날짜 선택, disabledDates로 기존 불가능 날짜 전달 */}
        <div className="flex flex-col">
          <label className="block font-medium mb-2">예약 불가능 날짜 선택:</label>
          <CalendarModule
            onSelectDate={handleCalendarSelectDate}
            disabledDates={existingTimes.map(dt => dt.split(" ")[0])}
          />
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        등록하기
      </button>
    </div>
  );
};

export default CantReservation;
