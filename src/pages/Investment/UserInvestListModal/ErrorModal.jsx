import React from "react";
import styles from "./ErrorModal.module.css";

function ErrorModal({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p className={styles.text}>잘못된 비밀번호로 삭제에 실패하셨습니다.</p>
        <button onClick={onClose} className={styles.closeModal}>
          창 닫기
        </button>
        <button onClick={onClose} className={styles.confirmButton}>
          확인
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
