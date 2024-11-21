import { CompanyBox } from "./CompanyBox";
import { SmallPagenation } from "./smallPagenation";
import SearchBox from "../../shared/components/SearchComponenet";
import styles from "./modal.module.css";
import "./custom.css";

export const CompareCompanyModal = ({
  onClose,
  companies,
  selectedCompanies,
  pagination,
  onSearch,
  onSelectCompany,
  setSearchKeyword,
  searchKeyword,
  onDeselectCompany,
  setCompanies,
  fetchCompanies,
}) => {
  return (
    <div className={styles.m_inner}>
      <div className={styles.top_inner}>
        <h2>비교할 기업 선택하기</h2>
        <span onClick={onClose}>x</span>
      </div>

      <SearchBox
        className={styles.search_box}
        onSearch={onSearch}
        totalItems={pagination.totalItems}
        pageSize={pagination.pageSize}
        setCompanies={setCompanies}
        fetchCompanies={fetchCompanies}
        setSearchKeyword={setSearchKeyword}
        searchKeyword={searchKeyword}
      />

      <div className={styles.select_company}>
        <h3>선택한 기업 ({selectedCompanies.length})</h3>
        {selectedCompanies.length === 0 ? (
          <p className={styles.select_text}>기업을 선택 해주세요</p>
        ) : (
          selectedCompanies.map((company) => (
            <CompanyBox
              key={company.id}
              {...company}
              variant="deselect"
              onClick={() => onDeselectCompany(company)}
            />
          ))
        )}
      </div>

      <div className={styles.select_company}>
        <h3>검색 결과 ({pagination.totalItems})</h3>
        {companies.map((company) => (
          <CompanyBox
            key={company.id}
            {...company}
            onClick={() => onSelectCompany(company)}
          />
        ))}
      </div>

      <SmallPagenation
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        startPage={pagination.startPage}
        endPage={pagination.endPage}
        onPageChange={pagination.handlePageChange}
      />
    </div>
  );
};
