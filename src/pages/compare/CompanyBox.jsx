import styles from "./modal.module.css";
import "./custom.css";

// CompanyBox.js
export const CompanyBox = ({
  name,
  category,
  onClick,
  isSelected,
  variant = "select", // 'select' | 'deselect'
}) => {
  const buttonStyles = {
    color: isSelected ? "white" : "#EB5230",
    borderColor: isSelected ? "white" : "#EB5230",
  };

  const buttonText =
    variant === "select"
      ? isSelected
        ? "선택 완료"
        : "선택하기"
      : "선택 해제";

  return (
    <div className={styles.company_box}>
      <div className={styles.left}>
        <div className={styles.img_box}>
          <img src="" alt="" />
        </div>
        <span>{name}</span>
        <p>{category.category}</p>
      </div>
      <button style={buttonStyles} onClick={onClick}>
        {isSelected && variant === "select" && (
          <img src="/img/ic_check.png" alt="selected" />
        )}
        {buttonText}
      </button>
    </div>
  );
};
