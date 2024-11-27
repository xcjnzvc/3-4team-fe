import React, { useState } from "react";
import styles from "./UserInvestDeleteModal.module.css";

const UserInvestDeleteModal = ({ onClose, onConfirm }) => {
  const [password, setPassword] = useState(""); // 비밀번호 상태 추가
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // 비밀번호 상태 업데이트
  };

  const handleConfirmClick = () => {
    onConfirm(password); // 비밀번호 전달
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.title}>삭제 권한 인증</div>
        <p className={styles.label}>비밀번호</p>
        <input
          type="password"
          placeholder="패스워드를 입력해주세요"
          className={styles.passwordInput}
          value={password}
          onChange={handlePasswordChange} // 입력값 변경 처리
        />
        <button onClick={onClose} className={styles.closeModal}>
          창 닫기
        </button>
        <button onClick={handleConfirmClick} className={styles.deleteButton}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default UserInvestDeleteModal;
