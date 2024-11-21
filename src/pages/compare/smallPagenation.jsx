import { useState } from "react";
import styles from "./modal.module.css";
// import "./custom.css";

export function SmallPagenation({
  page,
  setPage,
  pageNumber,
  startPage,
  lastPage,
}) {
  //   console.log("page", page);
  //   console.log("pageNumber", pageNumber);
  const onClickHandle = (event) => {
    // console.log(event.target);
    setPage(Number(event.target.textContent));
  };
  //후
  const nextHandle = () => {
    if (page < pageNumber) {
      setPage(page + 1);
      if (page % 5 === 0) {
        startPage(page + 5);
        lastPage(page + 5);
      }
    }
  };

  //전
  const beforeHandle = () => {
    if (page > 1) {
      setPage(page - 1);
      if (page % 5 === 1) {
        startPage(page - 5);
        lastPage(page - 5);
      }
    }
  };
  const arr = [];
  for (let i = startPage; i <= lastPage; i++) {
    arr.push(i);
  }
  //   console.log("왜 안나와", arr);

  return (
    <ul className={styles.pagination}>
      <li onClick={beforeHandle} className={styles.arrowButton}>
        {/* 전 */}
      </li>
      {arr.map((num, index) => {
        if (num <= pageNumber) {
          let onColor =
            num === page
              ? {
                  backgroundColor: "#eb5230",
                  color: "#fff",
                  borderColor: "#eb5230",
                }
              : {};
          return (
            <li
              key={index}
              className={styles.pageNumber}
              onClick={onClickHandle}
              style={onColor}
            >
              {num}
            </li>
          );
        }
      })}
      <li
        onClick={nextHandle}
        className={`${styles.arrowButton} ${styles.right}`}
      >
        {/* 후 */}
      </li>
    </ul>
  );
}
