import React from "react";
import styles from "./InvestmentList.module.css";

function InvestmentList({ data }) {
  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.header}`}>
        <div>순위</div>
        <div>기업 명</div>
        <div>기업 소개</div>
        <div>카테고리</div>
        <div>View My Startup 투자 금액</div>
        <div>실제 누적 투자 금액</div>
      </div>
      {data.map((item, index) => (
        <div className={styles.row} key={index}>
          <div>{index + 1}위</div>
          <div className={styles.leftAlign}>
            <img
              src={item.logo}
              alt={`${item.name} 로고`}
              className={styles.companyLogo}
            />
            {item.name}
          </div>
          <div>{item.description}</div>
          <div>{item.category}</div>
          <div>{item.simInvest}억 원</div>
          <div>{item.actualInvest}억 원</div>
        </div>
      ))}
    </div>
  );
}

export default InvestmentList;
