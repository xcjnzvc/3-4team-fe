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
  const { id } = useParams();
  const [data, setData] = useState(investData || []);
  const [selectedItemId, setSelectedItemId] = useState(null); // 선택된 항목의 ID 저장
  const [isToDeleteModalOpen, setIsToDeleteModalOpen] = useState(false);
  const [isErrorDeleteModalOpen, setIsErrorDeleteModalOpen] = useState(false);
  const [isErrorModifyModalOpen, setIsErrorModifyModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [isModifiedModalOpen, setIsModifiedModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isToModifyModalOpen, setIsToModifyModalOpen] = useState(false);
  const [itemToModify, setItemToModify] = useState(null);

  useEffect(() => {
    // `investData` prop에 대한 의존성 처리
    setData(investData);
  }, [investData]);

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
      setSelectedItemId(null); // 이미 선택된 메뉴를 다시 클릭하면 닫기
    } else {
      setSelectedItemId(itemId); // 현재 항목 ID로 메뉴 표시
    }
  };

  const handleMenuClose = () => {
    setSelectedItemId(null); // 메뉴 닫기
  };

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // 삭제할 항목 저장
    setIsToDeleteModalOpen(true); // 모달 열기
  };

  const handleModifyClick = (itemId) => {
    const selectedItem = data.find((item) => item.id === itemId);
    setItemToModify(selectedItem); // 수정할 항목 저장
    setIsAuthModalOpen(true); // 첫 번째 모달 열기
  };

  const handleModalClose = () => {
    setIsToDeleteModalOpen(false); // 모달 닫기
    setItemToDelete(null);
  };

  const handleErrorDeleteModalClose = () => {
    setIsErrorDeleteModalOpen(false); // 모달 닫기
  };

  const handleErrorModifyModalClose = () => {
    setIsErrorModifyModalOpen(false); // 모달 닫기
  };

  const handleDeletedModalClose = () => {
    setIsDeletedModalOpen(false); // 모달 닫기
  };

  const handleModifiedModalClose = () => {
    setIsModifiedModalOpen(false); // 모달 닫기
  };

  const handleDeleteConfirm = async (password) => {
    if (!itemToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/investments/${itemToDelete}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        setData((prevData) =>
          prevData.filter((item) => item.id !== itemToDelete)
        );
        setIsDeletedModalOpen(true);
      } else {
        const errorData = await response.json();
        setIsErrorDeleteModalOpen(true);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
      alert("삭제 요청 중 문제가 발생했습니다.");
    } finally {
      setSelectedItemId(null);
      setIsToDeleteModalOpen(false); // 삭제 모달 닫기
      setItemToDelete(null);
    }
  };

  const handleAuthConfirm = (password) => {
    fetch("http://localhost:8000/api/investments/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemToModify.id, password }),
    }).then((res) => {
      if (res.ok) {
        setIsAuthModalOpen(false);
        setIsToModifyModalOpen(true);
      } else {
        setIsErrorModifyModalOpen(true);
        setIsAuthModalOpen(false);
      }
    });
  };

  const handleModifyConfirm = (formData) => {
    const formattedData = {
      ...formData,
      investAmount: Number(formData.investAmount), // investAmount를 숫자로 변환
    };
    fetch(`http://localhost:8000/api/investments/${itemToModify.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    }).then(async (res) => {
      if (res.ok) {
        setIsToModifyModalOpen(false);
        setIsModifiedModalOpen(true);
      } else {
        const error = await res.json();
        alert(`수정 실패: ${error.error}`);
        console.error("수정 실패:", error);
      }
    });
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
                <div className={styles.leftAlign}>
                  {item.comment}
                  <span
                    className={styles.optionButton}
                    onClick={(e) => handleMenuToggle(e, item.id)} // 각 항목의 ID 전달
                  ></span>
                  {selectedItemId === item.id && (
                    <div className={styles.menu}>
                      <p onClick={() => handleModifyClick(item.id)}>수정하기</p>
                      <p onClick={() => handleDeleteClick(item.id)}>삭제하기</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {selectedItemId && (
              <div className={styles.overlay} onClick={handleMenuClose}></div>
            )}
            {isToDeleteModalOpen && (
              <UserInvestDeleteModal
                onClose={handleModalClose}
                onConfirm={handleDeleteConfirm}
              />
            )}
            {isAuthModalOpen && (
              <AuthToModify
                onClose={() => setIsAuthModalOpen(false)}
                onConfirm={handleAuthConfirm}
              />
            )}
            {isToModifyModalOpen && itemToModify && (
              <UserInvestModifyModal
                onClose={() => setIsToModifyModalOpen(false)}
                onConfirm={handleModifyConfirm}
                currentData={itemToModify}
              />
            )}
            {isErrorDeleteModalOpen && (
              <ErrorDeleteModal onClose={handleErrorDeleteModalClose} />
            )}
            {isErrorModifyModalOpen && (
              <ErrorModifyModal onClose={handleErrorModifyModalClose} />
            )}
            {isModifiedModalOpen && (
              <ModifiedModal onClose={handleModifiedModalClose} />
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
      {isDeletedModalOpen && <DeletedModal onClose={handleDeletedModalClose} />}
    </>
  );
};

export default UserInvestList;
