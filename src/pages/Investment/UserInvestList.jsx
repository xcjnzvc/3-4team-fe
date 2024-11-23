import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserInvestList.module.css";
import Pagination from "../../shared/components/Pagination";
import UserInvestDeleteModal from "./UserInvestListModal/UserInvestDeleteModal";
import ErrorModal from "./UserInvestListModal/ErrorModal";
import DeletedModal from "./UserInvestListModal/DeletedModal";

const UserInvestList = ({ companyData }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // 선택된 항목의 ID 저장
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // 삭제할 항목 저장
    setIsModalOpen(true); // 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
    setItemToDelete(null);
  };

  const handleErrorModalClose = () => {
    setIsErrorModalOpen(false); // 모달 닫기
  };

  const handleDeletedModalClose = () => {
    setIsDeletedModalOpen(false); // 모달 닫기
    window.location.reload();
  };

  const handleDeleteConfirm = async (password) => {
    if (!itemToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/investments/${itemToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }), // 비밀번호를 body에 포함
        }
      );

      if (response.ok) {
        setIsDeletedModalOpen(true);
        // alert("삭제가 완료되었습니다.");
      } else {
        const errorData = await response.json();
        setIsErrorModalOpen(true);
        // alert(`삭제 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
      alert("삭제 요청 중 문제가 발생했습니다.");
    } finally {
      setSelectedItemId(null);
      setIsModalOpen(false);
      setItemToDelete(null);
    }
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
                      <p onClick={() => handleDeleteClick(item.id)}>삭제하기</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {selectedItemId && (
              <div className={styles.overlay} onClick={handleMenuClose}></div>
            )}

            {isModalOpen && (
              <UserInvestDeleteModal
                onClose={handleModalClose}
                onConfirm={handleDeleteConfirm}
              />
            )}

            {isErrorModalOpen && <ErrorModal onClose={handleErrorModalClose} />}

            {isDeletedModalOpen && (
              <DeletedModal onClose={handleDeletedModalClose} />
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
