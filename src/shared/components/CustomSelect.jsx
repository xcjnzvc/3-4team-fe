import React, { useState } from "react";
import styles from "./CustomSelect.module.css";

/** 여러분 사용예시 입니다. 더 자세한 구조는 Investment 폴더를 참조해주세요 ㅠㅠ 더 잘 설명해드리지 못해 죄송합니다.
 *
 * CustomSelect 컴포넌트는 전달된 옵션 목록 중에서 하나를 선택할 수 있는 드롭다운 메뉴입니다.
 * 사용자가 옵션을 선택하면 onOptionChange 핸들러가 호출되어 선택한 값이 상위 컴포넌트로 전달됩니다.
 *
 * @param {Array} options - 선택 가능한 옵션 배열. 각 항목은 { label: string, value: string } 형식이어야 합니다.
 * 예시:
 *  const sortOptions = [
 *    { label: "View My Startup 투자 금액 높은순", value: "simInvest_desc" },
 *    { label: "View My Startup 투자 금액 낮은순", value: "simInvest_asc" },
 *    { label: "실제 누적 투자 금액 높은순", value: "actualInvest_desc" },
 *    { label: "실제 누적 투자 금액 낮은순", value: "actualInvest_asc" },
 *  ];
 *
 * @param {Function} onOptionChange - 옵션이 변경될 때 호출되는 함수로, 선택한 값이 전달됩니다.
 * @param {string} selectedOption - 현재 선택된 옵션의 값
 */

const CustomSelect = ({ options, onOptionChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

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

// 기본 props 설정 - 필요에 따라 기본 옵션 세트 제공 가능
// 현재는 사용안하지만 혹시 몰라서 주석 처리할께요
// CustomSelect.defaultProps = {
//   options: [
//     { label: "옵션 1", value: "option1" },
//     { label: "옵션 2", value: "option2" },
//   ],
// };

export default CustomSelect;
