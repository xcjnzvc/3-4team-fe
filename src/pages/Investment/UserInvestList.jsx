import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserInvestList.module.css";
import Pagination from "../../shared/components/Pagination";

const UserInvestList = ({ companyData }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // 선택된 항목의 ID 저장

  useEffect(() => {
    fetch(`http://localhost:8000/api/investments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => b.investAmount - a.investAmount);
        setData(sortedData);
      });
  }, [id]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [offset, setOffset] = useState(0);
  const currentPage = Math.floor(offset / itemsPerPage) + 1;
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  const handleMenuToggle = (e, itemId) => {
    if (selectedItemId === itemId) {
      // 이미 선택된 메뉴를 다시 클릭하면 닫기
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId); // 현재 항목 ID로 메뉴 표시
    }
  };

  const handleMenuClose = () => {
    setSelectedItemId(null); // 메뉴 닫기
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
                <div className={styles.leftAlign}>
                  {item.comment}
                  <span
                    className={styles.optionButton}
                    onClick={(e) => handleMenuToggle(e, item.id)} // 각 항목의 ID 전달
                  ></span>
                  {selectedItemId === item.id && (
                    <div className={styles.menu}>
                      <p onClick={() => alert(`수정: ${item.id}`)}>수정하기</p>
                      <p onClick={() => alert(`삭제: ${item.id}`)}>삭제하기</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {selectedItemId && (
              <div className={styles.overlay} onClick={handleMenuClose}></div>
            )}
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
