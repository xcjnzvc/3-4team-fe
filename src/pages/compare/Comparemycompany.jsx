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
    searchKeyword2,
    selectedCompanies,
    handlePageChange,
    handleCompanySelect,
    setSearchKeyword,
    setSearchKeyword2,
    setCompanies,
    fetchCompanies,
    selectMyCompany,
    handleClickMyCompany,
    setSelectMyCompany,
    aaa,
    selectAaa,
    setAaa,
    setSelectaaa,
    clickabc,
    handleAaa,
    selectMyAaa,
    select,
  } = useCompanyData();

  const handleModalOpen = (type) => setModalType(type);
  const handleModalClose = () => {
    handleAaa();
    setModalType(null);
  };

  const handleConfirm = () => {
    // 선택 확인 로직
    // console.log("너가문제?", handleClickMyCompany());
    if (!handleClickMyCompany()) {
      alert("기업을 선택해주세요.");
      return;
    }
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

  function handleRemoveCompany() {
    setIsCompanyAdded(false); // 상태 초기화
  }

  function handleCompare() {
    navigate("/compareResult"); // 페이지 이동
  }

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
          onSearch={setSearchKeyword2}
          onSelectCompany={handleCompanySelect}
          onDeselectCompany={handleCompanySelect}
          setCompanies={setCompanies}
          fetchCompanies={fetchCompanies}
          setSearchKeyword={setSearchKeyword2}
          aaa={aaa}
          selectAaa={selectAaa}
          clickabc={clickabc}
          clickcba={clickabc}
        />
      )}

      <div className="container">
        <div className="company-selection-container">
          <h1 className="header-title">나의 기업을 선택해 주세요!</h1>
          {isCompanyAdded && (
            <p className="cancel-selection-btn" onClick={handleRemoveCompany}>
              선택 취소
            </p>
          )}
        </div>
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
            <header className="inquiry-header">
              <h1 className="header-title">어떤 기업이 궁금하세요?</h1>
              <button
                className="inquiry-add-button"
                onClick={() => handleModalOpen(MODAL_TYPES.COMPARE)}
              >
                기업 추가하기
              </button>
            </header>
            <section
              className="company-list"
              style={{ dispaly: "flex", flexDirection: "row" }}
            >
              {selectMyAaa.length === 0 ? (
                <p class="inquiry-add-button-text">
                  아직 추가된 기업이 없어요, <br />
                  버튼을 눌러 기업을 추가해보세요!
                </p>
              ) : (
                selectMyAaa.length !== 0 &&
                selectAaa.map((v, i) => {
                  return (
                    <div className={styles.selected_company} key={v.name}>
                      <div className={styles.left}>
                        <div className={styles.selected_img_box}>
                          <img src="" alt="" />
                        </div>
                        <span>{v.name}</span>
                        <p>{v.category.category}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        ) : null}

        <footer className="footer">
          <button className="compare-button">
            <Link className="compare-button-text" to="/compareResult">
              기업 비교하기
            </Link>
          </button>
        </footer>
      </div>
    </>
  );
}
