import { SelectCompanyModal } from "./SelectCompanyModal";
import { CompareCompanyModal } from "./CompareCompanyModal";
import { useCompanyData } from "./useCompanyData";
import { useState } from "react";
import styles from "./modal.module.css";
import "./custom.css";
import "./comparemycompany.css";

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
    // handleModalClose();
  };

  const buttonStyles = {
    color: "white",
    borderColor: "white",
  };

  const buttonText = "선택 완료";

  return (
    <>
      {modalType === MODAL_TYPES.SELECT && (
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

        <section className="company-list">
          <button
            className="add-button"
            onClick={() => handleModalOpen(MODAL_TYPES.SELECT)}
          >
            <img src="/img/btn_plus.png" alt="기업 추가" />
          </button>

          {selectMyCompany && (
            <div className={styles.company_box}>
              <div className={styles.left}>
                <div className={styles.img_box}>
                  <img src="" alt="" />
                </div>
                <span>{selectMyCompany.name}</span>
                <p>{selectMyCompany.category.category}</p>
              </div>
              <button style={buttonStyles} onClick={handleCompanySelect}>
                <img src="/img/ic_check.png" alt="selected" />
                {buttonText}
              </button>
            </div>
          )}

          <span className="add-button-text">기업 추가</span>
        </section>

        <footer className="footer">
          <button
            className="compare-button"
            onClick={() => handleModalOpen(MODAL_TYPES.COMPARE)}
          >
            <span className="compare-button-text">기업 비교하기</span>
          </button>
        </footer>
      </div>
    </>
  );
}
