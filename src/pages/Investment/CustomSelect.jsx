import React, { useState } from "react";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({ onOptionChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    "View My Startup 투자 금액 높은순",
    "View My Startup 투자 금액 낮은순",
    "실제 누적 투자 금액 높은순",
    "실제 누적 투자 금액 낮은순",
  ];

  return (
    <div className={styles.selectContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.selectTitle}>
        <span
          className={`${styles.selectArrow} ${
            isOpen ? styles.selectArrowOpen : ""
          }`}
        ></span>
        <span>{selectedOption}</span>
      </button>

      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => {
                onOptionChange(option); // 부모 컴포넌트에 선택된 옵션 전달
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
