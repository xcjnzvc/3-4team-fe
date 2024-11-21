import React, { useState, useEffect, useMemo } from "react";
import styles from "./InvestmentOverview.module.css";
import CustomSelect from "../../shared/components/CustomSelect";
import InvestmentList from "./InvestmentList";
import SearchBox from "../../shared/components/SearchBox";

function InvestmentOverview() {
  const [sortOption, setSortOption] = useState("simInvest_desc");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const sortOptions = [
    { label: "View My Startup 투자 금액 높은순", value: "simInvest_desc" },
    { label: "View My Startup 투자 금액 낮은순", value: "simInvest_asc" },
    { label: "실제 누적 투자 금액 높은순", value: "actualInvest_desc" },
    { label: "실제 누적 투자 금액 낮은순", value: "actualInvest_asc" },
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
        case "simInvest_desc":
          return b.simInvest - a.simInvest;
        case "simInvest_asc":
          return a.simInvest - b.simInvest;
        case "actualInvest_desc":
          return b.actualInvest - a.actualInvest;
        case "actualInvest_asc":
          return a.actualInvest - b.actualInvest;
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
        <div className={styles.title}>투자 현황</div>
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
      <InvestmentList data={filteredData} />
    </div>
  );
}

export default InvestmentOverview;
