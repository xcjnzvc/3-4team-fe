import React, { useState, useMemo } from "react";
import styles from "./InvestmentOverview.module.css";
import CustomSelect from "../../shared/component/CustomSelect";
import InvestmentList from "./InvestmentList";
import data from "./tempData";

function InvestmentOverview() {
  const [sortOption, setSortOption] = useState("simInvest_desc");

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const sortOptions = [
    { label: "View My Startup 투자 금액 높은순", value: "simInvest_desc" },
    { label: "View My Startup 투자 금액 낮은순", value: "simInvest_asc" },
    { label: "실제 누적 투자 금액 높은순", value: "actualInvest_desc" },
    { label: "실제 누적 투자 금액 낮은순", value: "actualInvest_asc" },
  ];

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
  }, [sortOption]);

  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.title}>투자 현황</div>
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

export default InvestmentOverview;
