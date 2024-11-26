import React from "react";
import styles from "./ModifiedModal.module.css";

function ModifiedModal({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p className={styles.text}>투자내역이 정상적으로 수정되었습니다.</p>
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

export default ModifiedModal;
