import styles from "./investmentModal.module.css";
import { useState } from "react";

export default function InvestmentModal({ closeModal }) {
  const [formData, setFormData] = useState({
    investorName: "",
    investmentAmount: "",
    investmentComment: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("Form Data:", formData);
    alert("투자 정보가 제출되었습니다!");
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h1>기업에 투자하기</h1>

        <div className={styles.modal__elem}>
          <label>투자 기업 정보</label>
          <div>기업 정보 나타낼 부분</div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.modal__elem}>
            <label htmlFor="investorName">투자자 이름</label>
            <input
              type="text"
              id="investorName"
              name="investorName"
              value={formData.investorName}
              onChange={handleChange}
              required
              placeholder="투자자 이름을 입력해 주세요"
              autoComplete="username"
            />
          </div>

          <div className={styles.modal__elem}>
            <label htmlFor="investmentAmount">투자 금액</label>
            <input
              type="number"
              id="investmentAmount"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              required
              placeholder="투자 금액을 입력해 주세요"
            />
          </div>

          <div className={styles.modal__elem}>
            <label htmlFor="investmentComment">투자 코멘트</label>
            <textarea
              id="investmentComment"
              name="investmentComment"
              value={formData.investmentComment}
              onChange={handleChange}
              rows="4"
              required
              placeholder="투자에 대한 코멘트를 입력해 주세요"
            />
          </div>

          <div className={styles.modal__elem}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="new-password"
            />
          </div>

          <div className={styles.modal__elem}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              autoComplete="new-password"
            />
          </div>

          <div className={styles.modal__buttonList}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeModal}
            >
              취소
            </button>
            <button className={styles.investButton}>투자하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
