import styles from "./investmentModal.module.css";
import { useState } from "react";
import axios from "axios";

export default function InvestmentModal({ closeModal, id, data , onSuccess}) {
  const [formData, setFormData] = useState({
    investorName: "",
    investmentAmount: "",
    investmentComment: "",
    password: "",
    confirmPassword: "",
  });

  const formatNumberWithComma = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 투자 금액 필드 처리
    if (name === "investmentAmount") {
      // 쉼표 제거 후 숫자만 입력 받음
      const numericValue = value.replace(/,/g, "");
      if (!/^\d*$/.test(numericValue)) return; // 숫자가 아니면 무시

      // 상태 업데이트 시 쉼표 추가된 값 저장
      setFormData({
        ...formData,
        [name]: formatNumberWithComma(numericValue),
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const postData = {
      startUpId: Number(id),
      name: formData.investorName,
      investAmount: Number(formData.investmentAmount.replace(/,/g, "")), // 쉼표 제거 후 숫자로 변환
      comment: formData.investmentComment,
      password: formData.confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/investments",
        postData
      );
      if (response.status === 200 || response.status === 201) {
        alert("투자 성공!");
        onSuccess();
        closeModal();
      } else {
        alert("투자 실패");
      }
    } catch (error) {
      console.error("에러 발생", error);
      alert("통신 오류 발생");
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h1>기업에 투자하기</h1>

        <div className={styles.modal__elem}>
          <label>투자 기업 정보</label>
          <div className={styles.companyInfo}>
            <img
              src={data.logo || "/img/companyLogo/codeit.png"}
              alt={`${data.name} 로고`}
              className={styles.companyLogo}
            />
            <p className={styles.title}>{data.name}</p>
            <p className={styles.subTitle}>
              {data.category ? data.category.category : "정보 없음"}
            </p>
          </div>
        </div>

        <form onKeyDown={handleKeyDown} className={styles.form}>
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
              autoComplete="off"
            />
          </div>

          <div className={styles.modal__elem}>
            <label htmlFor="investmentAmount">투자 금액</label>
            <input
              type="text"
              id="investmentAmount"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              required
              placeholder="투자 금액을 입력해 주세요"
              autoComplete="off"
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

            <button className={styles.investButton} onClick={handleSubmit}>
              투자하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
