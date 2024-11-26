import React from "react";
import styles from "./ErrorModifyModal.module.css";

function ErrorModifyModal({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.title}>수정 권한 인증</div>
        <p className={styles.label}>잘못된 비밀번호로 수정에 실패하셨습니다.</p>
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

export default ErrorModifyModal;
