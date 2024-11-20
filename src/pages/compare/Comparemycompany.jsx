import { useNavigate } from "react-router-dom";
import "./comparemycompany.css";

export function CompareMyCompany() {
  const navigate = useNavigate();
  
  function handleClick() {
    navigate('/compareResult');
  }

  return (
    <>
  <div class="container">
    <header class="header">
      <h1 class="header-title">나의 기업을 선택해 주세요!</h1>
    </header>

    <section class="company-list">
      <button class="add-button">
        <img src="/img/btn_plus.png" alt="plus 버튼"/>
      </button>
      <span class="add-button-text">기업 추가</span>
    </section>

    <footer class="footer">
      <button class="compare-button" onClick={handleClick}>
        <span class="compare-button-text">기업 비교하기</span>
      </button>
    </footer>
  </div>
    </>
)}
