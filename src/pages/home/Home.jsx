import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import styles from "./Home.module.css";
import CustomSelect from "../../shared/components/CustomSelect";
import WholeList from "./WholeList";

export function Home() {
  const [sortOption, setSortOption] = useState("actualInvest_desc");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  // 디바운싱 처리: searchTerm이 변경될 때마다 setDebouncedSearchTerm을 호출
  useEffect(() => {
    const debounced = debounce((value) => {
      setDebouncedSearchTerm(value);
    }, 300);

    debounced(searchTerm);

    // cleanup 함수로 debounced 함수의 타이머를 정리
    return () => {
      debounced.cancel();
    };
  }, [searchTerm]); // searchTerm에 의존하여 업데이트

  const sortOptions = [
    { label: "누적 투자 금액 높은순", value: "actualInvest_desc" },
    { label: "누적 투자 금액 낮은순", value: "actualInvest_asc" },
    { label: "매출액 높은순", value: "revenue_desc" },
    { label: "매출액 낮은순", value: "revenue_asc" },
    { label: "고용 인원 높은순", value: "employees_desc" },
    { label: "고용 인원 낮은순", value: "employees_asc" },
  ];

  useEffect(() => {
    fetch("http://localhost:8000/api/investments")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [sortOption]);

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

  const filteredData = useMemo(() => {
    const searchText = debouncedSearchTerm.toLowerCase();
    return sortedData.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.category.category.toLowerCase().includes(searchText)
      );
    });
  }, [debouncedSearchTerm, sortedData]);

  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.title}>전체 스타트업 목록</div>
        <div className={styles.search_box}>
          <button>
            <img src="/img/ic_search.png" alt="돋보기" />
          </button>
          <input
            type="text"
            name="compare_search"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 실시간 입력값을 저장
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
