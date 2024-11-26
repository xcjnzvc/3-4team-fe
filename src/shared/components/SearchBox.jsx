import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import styles from "./SearchBox.module.css";

function SearchBox({
  onSearchChange,
  debounceTime = 300,
  placeholder = "검색어를 입력하세요",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTime);

  // 부모로 디바운싱된 값을 전달
  React.useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  return (
    <div className={styles.search_box}>
      <button>
        <img src="/img/ic_search.png" alt="돋보기" />
      </button>
      <input
        type="text"
        name="compare_search"
        placeholder="검색어를 입력하세요"
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 실시간 입력값을 저장
      />
    </div>
  );
}

export default SearchBox;
