import { useState } from "react";
import styles from "./investmentButton.module.css";
import InvestmentModal from "../InvestmentModal/InvestmentModal";

export default function InvestmentButton({ children, id, data }) {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <button className={styles.styledButton} onClick={openModal}>
        {/* 나의 기업에 투자하기 */}
        {children}
      </button>

      {isModal && (
        <InvestmentModal closeModal={closeModal} id={id} data={data} />
      )}
    </>
  );
}
