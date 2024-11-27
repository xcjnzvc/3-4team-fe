import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const PAGES_PER_GROUP = 5; // 한 그룹당 표시할 페이지 수

  const handleGroupChange = (direction) => {
    const newGroup = currentGroup + direction;
    if (newGroup >= 0 && newGroup * PAGES_PER_GROUP < totalPages) {
      setCurrentGroup(newGroup);

      // 이동할 페이지를 계산: 이전 그룹의 마지막 페이지 또는 다음 그룹의 첫 번째 페이지
      const targetPage =
        direction === -1
          ? (newGroup + 1) * PAGES_PER_GROUP
          : newGroup * PAGES_PER_GROUP + 1;

      const newOffset = (targetPage - 1) * itemsPerPage;
      onPageChange(newOffset);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange((pageNumber - 1) * itemsPerPage);
    }
  };

  const renderPageNumbers = () => {
    const startPage = currentGroup * PAGES_PER_GROUP + 1;
    const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      const pageNumber = startPage + i;
      return (
        <button
          key={pageNumber}
          className={`${styles.pageNumber} ${
            currentPage === pageNumber ? styles.active : ""
          }`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={() => handleGroupChange(-1)}
        disabled={currentGroup === 0}
      ></button>
      {renderPageNumbers()}
      <button
        className={`${styles.arrowButton} ${styles.right}`}
        onClick={() => handleGroupChange(1)}
        disabled={(currentGroup + 1) * PAGES_PER_GROUP >= totalPages}
      ></button>
    </div>
  );
};

export default Pagination;
