import React from "react";
import styles from "./ErrorDeleteModal.module.css";

function ErrorDeleteModal({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.title}>삭제 권한 인증</div>
        <p className={styles.label}>잘못된 비밀번호로 삭제에 실패하셨습니다.</p>
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

export default ErrorDeleteModal;
