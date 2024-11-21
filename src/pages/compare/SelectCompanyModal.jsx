import styles from "./modal.module.css";
import SearchBox from "../../shared/components/SearchComponenet";
import { SmallPagenation } from "./smallPagenation";
import { CompanyBox } from "./CompanyBox";
import "./custom.css";

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
}) => {
  return (
    <div className={styles.m_inner}>
      <div className={styles.top_inner}>
        <h2>나의 기업 선택하기</h2>
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
        {searchKeyword === "" ? (
          <p className={styles.select_text}>기업을 검색해주세요</p>
        ) : (
          <>
            <h3>검색 결과 ({pagination.totalItems})</h3>
            {companies.map((company) => {
              console.log(company);
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
              onPageChange={pagination.handlePageChange}
            />

            <button onClick={handleConfirm}>확인</button>
          </>
        )}
      </div>
    </div>
  );
};
