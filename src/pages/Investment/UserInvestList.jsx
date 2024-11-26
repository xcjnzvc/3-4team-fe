import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserInvestList.module.css";
import Pagination from "../../shared/components/Pagination";
import UserInvestDeleteModal from "./UserInvestListModal/UserInvestDeleteModal";
import ErrorDeleteModal from "./UserInvestListModal/ErrorDeleteModal";
import ErrorModifyModal from "./UserInvestListModal/ErrorModifyModal";
import DeletedModal from "./UserInvestListModal/DeletedModal";
import ModifiedModal from "./UserInvestListModal/ModifiedModal";
import UserInvestModifyModal from "./UserInvestListModal/UserInvestModifyModal";
import AuthToModify from "./UserInvestListModal/AuthToModify";

const UserInvestList = ({ investData, totalSimInvest }) => {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(investData.length / itemsPerPage);
  const [offset, setOffset] = useState(0);
  const currentPage = Math.floor(offset / itemsPerPage) + 1;
  const currentItems = investData.slice(offset, offset + itemsPerPage);

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  return (
    <>
      {investData.length === 0 ? (
        <div className={styles.noData}>
          <p>
            아직 투자한 기업이 없어요,
            <br />
            버튼을 눌러 기업에 투자해보세요!
          </p>
        </div>
      ) : (
        <div>
          <div className={styles.totalSimIvest}>
            총 {totalSimInvest / 100000000}억 원
          </div>
          <div className={styles.table}>
            <div className={`${styles.row} ${styles.header}`}>
              <div>투자자 이름</div>
              <div>순위</div>
              <div>투자 금액</div>
              <div>투자 코멘트</div>
            </div>
            {currentItems.map((item, index) => (
              <div className={styles.row} key={index}>
                <div>{item.name}</div>
                <div>{offset + index + 1}위</div>
                <div>{item.investAmount / 100000000}억 원</div>
                <div className={styles.leftAlign}>{item.comment}</div>
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
      )}
    </>
  );
};

export default UserInvestList;
