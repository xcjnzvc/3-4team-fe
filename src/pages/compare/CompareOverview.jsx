import React, { useState, useEffect, useMemo } from "react";
import styles from "./CompareOverview.module.css";
import CustomSelect from "../../shared/components/CustomSelect";
import CompareList from "./CompareList";
import SearchBox from "../../shared/components/SearchBox";

function CompareOverview() {
  const [sortOption, setSortOption] = useState("myCount_desc");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const sortOptions = [
    { label: "나의 기업 선택 횟수 높은순", value: "myCount_desc" },
    { label: "나의 기업 선택 횟수 낮은순", value: "myCount_asc" },
    { label: "비교 기업 선택 횟수 높은순", value: "compareCount_desc" },
    { label: "비교 기업 선택 횟수 낮은순", value: "compareCount_asc" },
  ];

  // 데이터 가져오기
  useEffect(() => {
    fetch("http://localhost:8000/api/investments") // 백엔드 API URL
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched data:", data); // 받아온 데이터 확인
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [sortOption]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      switch (sortOption) {
        case "myCount_desc":
          return b.myCount - a.myCount;
        case "myCount_asc":
          return a.myCount - b.myCount;
        case "compareCount_desc":
          return b.compareCount - a.compareCount;
        case "compareCount_asc":
          return a.compareCount - b.compareCount;
        default:
          return 0;
      }
    });
  }, [sortOption, data]); //useEffect 비동기 호출으로 인해 data 추가

  // 검색어를 적용한 필터링된 데이터
  const filteredData = useMemo(() => {
    const searchText = searchTerm.toLowerCase();
    return sortedData.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.category.category.toLowerCase().includes(searchText)
      );
    });
  }, [searchTerm, sortedData]);

  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.title}>비교 현황</div>
        <div className={styles.search_box}>
          <SearchBox
            onSearchChange={setSearchTerm}
            debounceTime={300}
            placeholder="검색어를 입력하세요"
          />
        </div>
        <CustomSelect
          options={sortOptions} // options을 상위에서 전달
          onOptionChange={handleSortOptionChange}
          selectedOption={sortOption}
        />
      </div>
      <CompareList data={filteredData} />
    </div>
  );
}

export default CompareOverview;
