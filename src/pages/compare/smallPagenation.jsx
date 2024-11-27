import { useState } from "react";
import styles from "./modal.module.css";

export function SmallPagenation({
  currentPage,
  totalPages,
  startPage,
  endPage,
  handlePageChange,
}) {
  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage && i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 이전 페이지 그룹으로 이동
  const handlePrevGroup = () => {
    if (startPage > 1) {
      handlePageChange(startPage - 1);
    }
  };

  // 다음 페이지 그룹으로 이동
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      handlePageChange(endPage + 1);
    }
  };

  // 특정 페이지로 이동
  const handlePageClick = (pageNumber) => {
    handlePageChange(pageNumber);
  };

  return (
    <ul className={styles.pagination}>
      <li
        onClick={handlePrevGroup}
        className={`${styles.arrowButton} ${
          startPage <= 1 ? styles.disabled : ""
        }`}
      >
        {/* &lt; */}
      </li>

      {pageNumbers.map((pageNum) => (
        <li
          key={pageNum}
          className={styles.pageNumber}
          onClick={() => handlePageClick(pageNum)}
          style={{
            backgroundColor: pageNum === currentPage ? "#eb5230" : "",
            color: pageNum === currentPage ? "#fff" : "",
            borderColor: pageNum === currentPage ? "#eb5230" : "",
          }}
        >
          {pageNum}
        </li>
      ))}

      <li
        onClick={handleNextGroup}
        className={`${styles.arrowButton} ${styles.right} ${
          endPage >= totalPages ? styles.disabled : ""
        }`}
      >
        {/* &gt; */}
      </li>
    </ul>
  );
}
