import React, { useState } from "react";
import styles from "./CompareList.module.css";
import Pagination from "../../shared/component/Pagination";

function CompareList({ data }) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [offset, setOffset] = useState(0); // offset을 이용해 시작 인덱스 관리
  const currentPage = Math.floor(offset / itemsPerPage) + 1; // 현재 페이지 계산

  // 현재 페이지에 표시할 데이터 슬라이스
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  return (
    <div>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.header}`}>
          <div>순위</div>
          <div>기업 명</div>
          <div>기업 소개</div>
          <div>카테고리</div>
          <div>나의 기업 선택 횟수</div>
          <div>비교 기업 선택 횟수</div>
        </div>
        {currentItems.map((item, index) => (
          <div className={styles.row} key={index}>
            <div>{offset + index + 1}위</div>
            <div className={styles.leftAlign}>
              <img
                src={item.logo || "img/companyLogo/codeit.png"}
                alt={`${item.name} 로고`}
                className={styles.companyLogo}
              />
              {item.name}
            </div>
            <div className={styles.description}>{item.description}</div>
            <div>{item.category.category}</div>
            <div>{item.myCount}</div>
            <div>{item.compareCount}</div>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default CompareList;
