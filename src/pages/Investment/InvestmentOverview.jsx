import React from "react";
import styles from "./InvestmentOverview.module.css";

function InvestmentOverview() {
  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.title}>투자 현황</div>
        <label for="sortOptions" aria-label="정렬 옵션 선택"></label>
        <select name="sortOptions" id="sortOptions" className={styles.select}>
          <option className={styles.option} value="high_to_low_investment">
            View My Startup 투자 금액 높은순
          </option>
          <option className={styles.option} value="low_to_high_investment">
            View My Startup 투자 금액 낮은순
          </option>
          <option className={styles.option} value="high_to_low_total">
            실제 누적 투자 금액 높은순
          </option>
          <option className={styles.option} value="low_to_high_total">
            실제 누적 투자 금액 낮은순
          </option>
        </select>
      </div>
    </div>
  );
}

export default InvestmentOverview;
