import React, { useState, useEffect } from "react";
import styles from "./UserInvestModifyModal.module.css";

const UserInvestModifyModal = ({ onClose, onConfirm, currentData }) => {
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    investAmount: "",
    comment: "",
  });

  // currentData가 변경될 때 formData 초기값 설정
  useEffect(() => {
    if (currentData) {
      setFormData({
        name: currentData.name || "",
        investAmount: currentData.investAmount || "",
        comment: currentData.comment || "",
      });
    }
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "investAmount" ? value.replace(/,/g, "") : value, // 쉼표 제거 후 저장
    }));
  };

  const formatNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 세 자리마다 쉼표 추가
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    onConfirm({
      ...formData,
      investAmount: Number(formData.investAmount), // 숫자로 변환하여 전달
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modifyModal}>
        <form onKeyDown={handleKeyDown}>
          <div className={styles.title}>투자 정보 수정</div>
          <label className={styles.label}>투자자 이름</label>
          <input
            type="text"
            name="name"
            placeholder="투자자 이름"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label className={styles.label}>투자 금액</label>
          <input
            type="text" // 텍스트로 변경하여 쉼표 형식 허용
            name="investAmount"
            placeholder="투자 금액"
            value={formatNumber(formData.investAmount)} // 쉼표 형식으로 표시
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label className={styles.label}>투자 코멘트</label>
          <textarea
            name="comment"
            placeholder="투자 코멘트"
            value={formData.comment}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <button onClick={onClose} className={styles.closeModal}>
            취소
          </button>
          <button onClick={handleConfirmClick} className={styles.modifyButton}>
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInvestModifyModal;
