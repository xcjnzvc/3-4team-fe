import React, { useState, useMemo } from "react";
import styles from "./InvestmentOverview.module.css";
import CustomSelect from "./CustomSelect";
import InvestmentList from "./InvestmentList";
import data from "./tempData";

function InvestmentOverview() {
  const [sortOption, setSortOption] = useState("simInvest_desc");

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

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
          onOptionChange={handleSortOptionChange}
          selectedOption={sortOption}
        />
      </div>
      <InvestmentList data={sortedData} />
    </div>
  );
}

export default InvestmentOverview;
