import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserInvestList.module.css";
import Pagination from "../../shared/components/Pagination";

function UserInvestList({ companyData }) {
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/investments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched data:", data); // 받아온 데이터 확인
        const sortedData = data.sort((a, b) => b.investAmount - a.investAmount);
        setData(sortedData);
      });
  }, [id]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [offset, setOffset] = useState(0); // offset을 이용해 시작 인덱스 관리
  const currentPage = Math.floor(offset / itemsPerPage) + 1; // 현재 페이지 계산

  // 현재 페이지에 표시할 데이터 슬라이스
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  return (
    <>
      {data.length === 0 ? (
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
            총 {companyData.simInvest / 100000000}억 원
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
}

export default UserInvestList;
