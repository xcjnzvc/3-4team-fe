import { useState, useEffect } from "react";
import { getCompanyApi } from "../../shared/api/api";
// 잠시만요 ㅠ
export const useCompanyData = (pageSize = 5) => {
  const [companies, setCompanies] = useState([]);
  const [aaa, setAaa] = useState([]);
  const [bbb, setBbb] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize,
    startPage: 1,
    endPage: 5,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectMyCompany, setSelectMyCompany] = useState(null);

  const handleClickMyCompany = () => {
    setSelectMyCompany(selectedCompanies[0]);
    // return setSelectMyCompany();
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanyApi(
        pageSize,
        pagination.currentPage - 1,
        searchKeyword
      );
      setBbb(response.data);
      const updatedCompanies = response.data.map((company) => ({
        ...company,
        isSelected: selectedCompanies.some(
          (selected) => selected.id === company.id
        ),
      }));
      setCompanies(updatedCompanies);
      console.log("원래꺼", companies);

      setPagination((prev) => ({
        ...prev,
        totalPages: Math.max(1, Math.ceil(response.totalCount / pageSize)),
        totalItems: response.totalCount,
      }));
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  // useEffect(() => {
  //   fetchCompanies();
  // }, [pagination.currentPage]);
  // useEffect(() => {
  //   fetchCompanies();
  // }, []);

  const handlePageChange = (newPage) => {
    setPagination((prev) => {
      const startPage = Math.floor((newPage - 1) / 5) * 5 + 1;
      return {
        ...prev,
        currentPage: newPage,
        startPage,
        endPage: Math.min(startPage + 4, prev.totalPages),
      };
    });
  };

  const handleCompanySelect = (company) => {
    if (selectedCompanies.length >= 5 && !company.isSelected) {
      alert("최대 5개의 기업만 선택할 수 있습니다.");
      return;
    }

    const isAlreadySelected = selectedCompanies.some(
      (selected) => selected.id === company.id
    );

    setSelectedCompanies((prev) =>
      isAlreadySelected
        ? prev.filter((c) => c.id !== company.id)
        : [...prev, company]
    );

    setCompanies((prev) =>
      prev.map((c) =>
        c.id === company.id ? { ...c, isSelected: !c.isSelected } : c
      )
    );
  };

  return {
    companies,
    aaa,
    bbb,
    pagination,
    searchKeyword,
    selectedCompanies,
    handlePageChange,
    handleCompanySelect,
    setSearchKeyword,
    setCompanies,
    setSelectedCompanies,
    setAaa,
    setBbb,
    fetchCompanies,
    handleClickMyCompany,
    selectMyCompany,
    clickabc,
  };
};
