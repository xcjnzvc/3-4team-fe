import React, { useState, useMemo } from "react";
import styles from "./InvestmentOverview.module.css";
import CustomSelect from "./CustomSelect";
import InvestmentList from "./InvestmentList";
import data from "./tempData";

function InvestmentOverview() {
  const [sortOption, setSortOption] = useState(
    "View My Startup 투자 금액 높은순"
  );

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      switch (sortOption) {
        case "View My Startup 투자 금액 높은순":
          return b.simInvest - a.simInvest;
        case "View My Startup 투자 금액 낮은순":
          return a.simInvest - b.simInvest;
        case "실제 누적 투자 금액 높은순":
          return b.actualInvest - a.actualInvest;
        case "실제 누적 투자 금액 낮은순":
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
          onOptionChange={handleSortOptionChange}
          selectedOption={sortOption}
        />
      </div>
      <InvestmentList data={sortedData} />
    </div>
  );
}

export default InvestmentOverview;
