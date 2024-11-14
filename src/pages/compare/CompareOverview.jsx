import React, { useState, useEffect, useMemo } from "react";
import styles from "./CompareOverview.module.css";
import CustomSelect from "../../shared/components/CustomSelect";
import InvestmentList from "./CompareList";
// import data from "./tempData";

function CompareOverview() {
  const [sortOption, setSortOption] = useState("simInvest_desc");
  const [data, setData] = useState([]); // 백엔드에서 가져온 데이터를 저장할 상태

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const sortOptions = [
    { label: "나의 기업 선택 횟수 높은순", value: "simInvest_desc" },
    { label: "나의 기업 선택 횟수 낮은순", value: "simInvest_asc" },
    { label: "비교 기업 선택 횟수 높은순", value: "actualInvest_desc" },
    { label: "비교 기업 선택 횟수 낮은순", value: "actualInvest_asc" },
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

  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.title}>비교 현황</div>
        <CustomSelect
          options={sortOptions} // options을 상위에서 전달
          onOptionChange={handleSortOptionChange}
          selectedOption={sortOption}
        />
      </div>
      <InvestmentList data={sortedData} />
    </div>
  );
}

export default CompareOverview;
