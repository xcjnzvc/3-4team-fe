import React, { useState } from "react";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({ onOptionChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "View My Startup 투자 금액 높은순", value: "simInvest_desc" },
    { label: "View My Startup 투자 금액 낮은순", value: "simInvest_asc" },
    { label: "실제 누적 투자 금액 높은순", value: "actualInvest_desc" },
    { label: "실제 누적 투자 금액 낮은순", value: "actualInvest_asc" },
  ];

  /**
   * options라는 배열에서
   * selectedOption과 같은 value 값을 가진 항목을 찾고
   * 해당 항목의 label 값을 변수에 저장.
   */
  const selectedLabel = options.find(
    (option) => option.value === selectedOption
  )?.label;

  return (
    <div className={styles.selectContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.selectTitle}>
        <span
          className={`${styles.selectArrow} ${
            isOpen ? styles.selectArrowOpen : ""
          }`}
        ></span>
        <span>{selectedLabel}</span>
      </button>

      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => {
                onOptionChange(option.value); // 부모 컴포넌트에 선택된 옵션 전달
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
