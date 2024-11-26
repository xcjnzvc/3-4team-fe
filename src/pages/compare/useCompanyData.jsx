import { useState, useEffect } from "react";
import { getCompanyApi } from "../../shared/api/api";
// 잠시만요 ㅠ
export const useCompanyData = (pageSize = 5) => {
  const [companies, setCompanies] = useState([]);
  const [aaa, setAaa] = useState([]);
  const [selectAaa, setSelectaaa] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize,
    startPage: 1,
    endPage: 5,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeyword2, setSearchKeyword2] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectMyCompany, setSelectMyCompany] = useState(null);
  const [selectMyAaa, setSelectMyAaa] = useState([]);

  const handleClickMyCompany = () => {
    // console.log("??", selectedCompanies[0]);
    if (selectedCompanies[0] === undefined) {
      return false;
    }
    setSelectMyCompany(selectedCompanies[0]);
    return true;
    // return setSelectMyCompany();
  };

  const handleAaa = () => {
    console.log(selectAaa);
    setSelectMyAaa([...selectAaa]);
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanyApi(
        pageSize,
        pagination.currentPage - 1,
        searchKeyword
      );

      // setBbb(response.data);
      const updatedCompanies = response.data.map((company) => ({
        ...company,
        isSelected: selectedCompanies.some((selected) => {
          return selected.id === company.id;
        }),
      }));
      setCompanies(updatedCompanies);
      const response2 = await getCompanyApi(
        pageSize,
        pagination.currentPage - 1,
        searchKeyword2
      );

      const updatedAaa = response2.data.map((company) => ({
        ...company,
        isSelected: selectAaa.some((selected) => selected.id === company.id),
      }));
      setAaa(updatedAaa);

      console.log("response.data", response.data);

      setPagination((prev) => ({
        ...prev,
        totalPages: Math.max(1, Math.ceil(response.totalCount / pageSize)),
        totalItems: response.totalCount,
      }));
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  //이거 뭔데 켜면 다 뜨는거냐?
  // useEffect(() => {
  //   fetchCompanies();
  // }, [pagination.currentPage]);
  // useEffect(() => {
  //   fetchCompanies();
  // }, [aaa]);

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

  const clickabc = (company) => {
    if (selectAaa.length >= 5 && !company.isSelected) {
      alert("최대 5개의 기업만 선택할 수 있습니다.");
      return;
    }

    const isAlreadySelected2 = selectAaa.some(
      (selected) => selected.id === company.id
    );

    setSelectaaa((prev) =>
      isAlreadySelected2
        ? prev.filter((c) => c.id !== company.id)
        : [...prev, company]
    );

    setAaa((prev) =>
      prev.map((c) => {
        //추가하거나 바꾸고싶은게 있으면 이런코드 객체안에서
        const result =
          c.id === company.id
            ? {
                ...c,
                isSelected: !c.isSelected,
              }
            : c;
        console.log(result);
        return result;
      })
    );
  };

  return {
    companies,
    aaa,
    selectAaa,
    pagination,
    searchKeyword,
    searchKeyword2,
    selectedCompanies,
    handlePageChange,
    handleCompanySelect,
    setSearchKeyword,
    setSearchKeyword2,
    setCompanies,
    setSelectedCompanies,
    setAaa,
    setSelectaaa,
    fetchCompanies,
    handleClickMyCompany,
    selectMyCompany,
    selectMyAaa,
    clickabc,
    handleAaa,
  };
};
