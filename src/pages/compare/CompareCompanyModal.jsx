import { CompanyBox } from "./CompanyBox";
import { SmallPagenation } from "./smallPagenation";
import { useState } from "react";
import SearchBox from "../../shared/components/SearchComponenet";
import styles from "./modal.module.css";
import "./custom.css";
import SearchComponenet from "../../shared/components/SearchComponenet";

export const CompareCompanyModal = ({
  onClose,
  companies,
  aaa,
  selectAaa,
  selectedCompanies,
  pagination,
  onSearch,
  onSelectCompany,
  setSearchKeyword,
  searchKeyword,
  onDeselectCompany,
  setCompanies,
  setAaa,
  setSelectaaa,
  fetchCompanies,
  clickabc,
  clickcba,
  handleAaa,
}) => {
  const [triger, setTriget] = useState(false);

  return (
    <div className={styles.modal_bg}>
      <div className={styles.m_inner}>
        <div className={styles.top_inner}>
          <h2>비교할 기업 선택하기</h2>
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
          <h3>선택한 기업 ({selectAaa.length})</h3>
          {selectAaa.length === 0 ? (
            <p className={styles.select_text}>기업을 선택 해주세요</p>
          ) : (
            selectAaa.map((company) => (
              <CompanyBox
                key={company.id}
                {...company}
                variant="deselect"
                // onClick={() => onDeselectCompany(company)}
                onClick={() => clickcba(company)}
              />
            ))
          )}
        </div>

        <div className={styles.select_company}>
          <h3>검색 결과 ({!triger ? 0 : aaa.length})</h3>
          {!triger ? (
            <p className={styles.select_text}>기업을 검색해주세요</p>
          ) : (
            aaa.map((company) => {
              // console.log("..?", company);
              return (
                <CompanyBox
                  key={company.id}
                  {...company}
                  onClick={() => clickabc(company)}
                />
              );
            })
          )}
        </div>

        <SmallPagenation
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          startPage={pagination.startPage}
          endPage={pagination.endPage}
          onPageChange={pagination.handlePageChange}
        />
      </div>
    </div>
  );
};
