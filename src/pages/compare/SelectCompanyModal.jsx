import styles from "./modal.module.css";
import SearchComponenet from "../../shared/components/SearchComponenet";
import { SmallPagenation } from "./smallPagenation";
import { CompanyBox } from "./CompanyBox";
import "./custom.css";
import { useState } from "react";

export const SelectCompanyModal = ({
  onClose,
  handleConfirm,
  companies,
  pagination,
  searchKeyword,
  onSearch,
  onSelectCompany,
  setSearchKeyword,
  setCompanies,
  fetchCompanies,
  handlePageChange,
  aaa,
  setAaa,
  selectAaa,
  setSelectaaa,
}) => {
  const [triger, setTriget] = useState(false);
  return (
    <div className={styles.modal_bg}>
      <div className={styles.m_inner}>
        <div className={styles.top_inner}>
          <h2>나의 기업 선택하기</h2>
          <span onClick={onClose}>x</span>
        </div>
        <SearchComponenet
          className={styles.search_box}
          onSearch={onSearch}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          setCompanies={setCompanies}
          fetchCompanies={fetchCompanies}
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword}
          setTriger={setTriget}
        />
        <div className={styles.select_company}>
          {!triger ? (
            <p className={styles.select_text}>기업을 검색해주세요</p>
          ) : (
            <>
              <h3>검색 결과 ({pagination.totalItems})</h3>
              {companies.map((company) => {
                // console.log("?", company);
                return (
                  <CompanyBox
                    key={company.id}
                    category={company.category}
                    {...company}
                    onClick={() => onSelectCompany(company)}
                  />
                );
              })}
              <SmallPagenation
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                startPage={pagination.startPage}
                endPage={pagination.endPage}
                handlePageChange={handlePageChange}
              />
              <button className={styles.ok_bt} onClick={handleConfirm}>
                확인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
