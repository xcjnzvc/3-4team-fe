import React, { useState, useEffect, useMemo } from "react";
import styles from "./Home.module.css";
import CustomSelect from "../../shared/components/CustomSelect";
import WholeList from "./WholeList";
import SearchBox from "../../shared/components/SearchBox";

export function Home() {
  const [sortOption, setSortOption] = useState("actualInvest_desc");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 정렬 옵션 변경 핸들러
  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetch("http://localhost:8000/api/investments")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 정렬된 데이터 생성
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      switch (sortOption) {
        case "actualInvest_desc":
          return b.actualInvest - a.actualInvest;
        case "actualInvest_asc":
          return a.actualInvest - b.actualInvest;
        case "revenue_desc":
          return b.revenue - a.revenue;
        case "revenue_asc":
          return a.revenue - b.revenue;
        case "employees_desc":
          return b.employees - a.employees;
        case "employees_asc":
          return a.employees - b.employees;
        default:
          return 0;
      }
    });
  }, [sortOption, data]);

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

  // 정렬 옵션
  const sortOptions = [
    { label: "누적 투자 금액 높은순", value: "actualInvest_desc" },
    { label: "누적 투자 금액 낮은순", value: "actualInvest_asc" },
    { label: "매출액 높은순", value: "revenue_desc" },
    { label: "매출액 낮은순", value: "revenue_asc" },
    { label: "고용 인원 높은순", value: "employees_desc" },
    { label: "고용 인원 낮은순", value: "employees_asc" },
  ];

  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.title}>전체 스타트업 목록</div>
        <div className={styles.search_box}>
          <SearchBox
            onSearchChange={setSearchTerm}
            debounceTime={300}
            placeholder="검색어를 입력하세요"
          />
        </div>
        <CustomSelect
          options={sortOptions}
          onOptionChange={handleSortOptionChange}
          selectedOption={sortOption}
        />
      </div>
      <WholeList data={filteredData} />
    </div>
  );
}
