import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ searchValue, setSearchValue, onSearch }) => {
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e) => {
    // composition 중이 아닐 때만 Enter 키 이벤트 처리
    if (!isComposing && e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="w-full h-10 px-4 pr-10 border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={onSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
      >
        <IoSearchOutline className="text-2xl" />
      </button>
    </div>
  );
};

export default SearchBar;
