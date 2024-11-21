import { useNavigate } from "react-router-dom";
import "./comparemycompany.css";
import { useState } from "react";

export function CompareMyCompany() {

  const [isCompanyAdded, setIsCompanyAdded] = useState(false); // 상태 추가
  const navigate = useNavigate();

  function handleAddCompany() {
    setIsCompanyAdded(true); // 상태 변경
  }

  function handleRemoveCompany() {
    setIsCompanyAdded(false); // 상태 초기화
  }

  function handleCompare() {
    navigate("/compareResult"); // 페이지 이동

  }

  return (
    <>
  <div class="container">
    {/* <header class="header">
      <h1 class="header-title">나의 기업을 선택해 주세요!</h1>
      <p className="cancel-selection-btn">선택 취소</p>
    </header> */}
    <header className="header">
        <h1 className="header-title">나의 기업을 선택해 주세요!</h1>
        {isCompanyAdded && (
          <p
            className="cancel-selection-btn"
            onClick={handleRemoveCompany}
          >
            선택 취소
          </p>
        )}
      </header>

      {/* <section class="company-list">
            <button class="add-button">
              <img src="/img/btn_plus.png" alt="plus 버튼" width="100%"/>
            </button>
            <span class="add-button-text">기업 추가</span>
          </section>  */}

      <section className="company-list">
        {isCompanyAdded ? (
          // 기업이 추가된 경우의 화면
          <div className="added-company">
            <img
              src="/img/company_logo.png"
              alt="기업 로고"
              className="company-logo"
            />
            {/* <p className="company-name">코드잇</p> */}
          </div>
        ) : (
          // 기업이 추가되지 않은 경우의 화면
          <div className="add-company-container">
            <button className="add-button" onClick={handleAddCompany}>
            <img src="/img/btn_plus.png" alt="plus 버튼" width="100%" />
          </button>
          <span className="add-button-text">기업 추가</span>
          </div>
        )}
      </section>

      {isCompanyAdded ? (
        <div>
    <header class="inquiry-header">
      <h1 class="header-title">어떤 기업이 궁금하세요?</h1>
      <button class="inquiry-add-button">기업 추가하기</button>
    </header>

    <section class="company-list">
      <p class="inquiry-add-button-text">
        아직 추가된 기업이 없어요, <br />
        버튼을 눌러 기업을 추가해보세요!
      </p>
    </section>
    </div>) : null}

    <footer className="footer">
        <button
          className="compare-button"
          onClick={handleCompare}
          disabled={!isCompanyAdded} // 기업 추가가 안 된 경우 버튼 비활성화
        >
          <span className="compare-button-text">기업 비교하기</span>
        </button>
      </footer>
  </div>
    </>
)}

