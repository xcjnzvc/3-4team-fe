import { SelectCompanyModal } from "./SelectCompanyModal";
import { CompareCompanyModal } from "./CompareCompanyModal";
import { useCompanyData } from "./useCompanyData";
import { CompareModal } from "./modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyBox } from "./CompanyBox";
import styles from "./modal.module.css";
import "./custom.css";
import "./comparemycompany.css";
import { Link } from "react-router-dom";

export const MODAL_TYPES = {
  SELECT: "SELECT",
  COMPARE: "COMPARE",
};

export function CompareMyCompany() {
  const [modalType, setModalType] = useState(null);
  const {
    companies,
    pagination,
    searchKeyword,
    selectedCompanies,
    handlePageChange,
    handleCompanySelect,
    setSearchKeyword,
    setCompanies,
    fetchCompanies,
    selectMyCompany,
    handleClickMyCompany,
    setSelectMyCompany,
  } = useCompanyData();

  const handleModalOpen = (type) => setModalType(type);
  const handleModalClose = () => setModalType(null);

  const handleConfirm = () => {
    // 선택 확인 로직
    handleClickMyCompany();
    handleModalClose();
    setIsCompanyAdded(true); // 상태 변경
  };

  const buttonStyles = {
    color: "white",
    borderColor: "white",
  };

  const buttonText = "선택 완료";

  const [isCompanyAdded, setIsCompanyAdded] = useState(false); // 상태 추가
  const navigate = useNavigate();

  // function handleAddCompany() {
  //   setIsCompanyAdded(true); // 상태 변경
  // }

  function handleRemoveCompany() {
    setIsCompanyAdded(false); // 상태 초기화
  }

  function handleCompare() {
    navigate("/compareResult"); // 페이지 이동
  }

  return (
    <>
      {modalType === MODAL_TYPES.SELECT && (
        // <CompareModal />
        <SelectCompanyModal
          onClose={handleModalClose}
          handleConfirm={handleConfirm}
          companies={companies}
          pagination={pagination}
          searchKeyword={searchKeyword}
          onSearch={setSearchKeyword}
          onSelectCompany={handleCompanySelect}
          setSearchKeyword={setSearchKeyword}
          setCompanies={setCompanies}
          fetchCompanies={fetchCompanies}
          handlePageChange={handlePageChange}
        />
      )}

      {modalType === MODAL_TYPES.COMPARE && (
        <CompareCompanyModal
          onClose={handleModalClose}
          companies={companies}
          handleConfirm={handleConfirm}
          selectedCompanies={selectedCompanies}
          pagination={pagination}
          onSearch={setSearchKeyword}
          onSelectCompany={handleCompanySelect}
          onDeselectCompany={handleCompanySelect}
          setCompanies={setCompanies}
          fetchCompanies={fetchCompanies}
          setSearchKeyword={setSearchKeyword}
        />
      )}

      <div className="container">
        <header className="header">
          <h1 className="header-title">나의 기업을 선택해 주세요!</h1>
        </header>

        {/* <section className="company-list">
          {selectMyCompany ? null : (
            <>
              <button
                className="add-button"
                onClick={() => handleModalOpen(MODAL_TYPES.SELECT)}
              >
                <img src="/img/btn_plus.png" alt="기업 추가" />
              </button>
              <span className="add-button-text">기업 추가</span>
            </>
          )}

          {selectMyCompany && (
            <div className={styles.selected_company}>
              <div className={styles.left}>
                <div className={styles.selected_img_box}>
                  <img src="" alt="" />
                </div>
                <span>{selectMyCompany.name}</span>
                <p>{selectMyCompany.category.category}</p>
              </div>
            </div>
          )}
        </section> */}

        <section className="company-list">
          {isCompanyAdded ? (
            selectMyCompany && (
              <div className={styles.selected_company}>
                <div className={styles.left}>
                  <div className={styles.selected_img_box}>
                    <img src="" alt="" />
                  </div>
                  <span>{selectMyCompany.name}</span>
                  <p>{selectMyCompany.category.category}</p>
                </div>
              </div>
            )
          ) : (
            // 기업이 추가된 경우의 화면
            // <div className="added-company">
            //   <img
            //     src="/img/company_logo.png"
            //     alt="기업 로고"
            //     className="company-logo"
            //   />
            // </div>
            // 기업이 추가되지 않은 경우의 화면
            <div className="add-company-container">
              <button
                className="add-button"
                onClick={() => handleModalOpen(MODAL_TYPES.SELECT)}
              >
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
          </div>
        ) : null}

        <footer className="footer">
          <button
            className="compare-button"
            // onClick={() => handleModalOpen(MODAL_TYPES.COMPARE)}
          >
            <Link className="compare-button-text" to="/compareResult">기업 비교하기</Link>
          </button>
        </footer>
      </div>
    </>
  );
}
