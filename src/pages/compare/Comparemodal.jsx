import { useEffect } from "react";
import { useState } from "react";
import { getCompanyApi } from "../../shared/api/api";
import Pagination from "../../shared/components/Pagination";
import "./comparemodal.css";

function CompanyBox({ name, category }) {
  return (
    <div className="company_box">
      <div className="left">
        <div className="img_box">
          <img src="" />
        </div>
        <span>{name}</span>
        <p>{category}</p>
      </div>
      <button>선택 해제</button>
    </div>
  );
}

export function CompareModal() {
  //api에서 데이터 불러오기
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getCompanyApi(5, (currentPage - 1) * 5).then((res) => {
      setData(res.data);
    });
  }, [currentPage]);
  // const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  // const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  //페이지네이션
  // const [company, setCompany] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalLength, setTotalLength] = useState(0);
  // const [sellCount, setSellCount] = useState(5);

  // useEffect(() => {
  //   const settingCompany = async () => {
  //     const itemPage = 10;
  //     const data = await getCompanyApi(5, 0);
  //     console.log("데이터1", data.data);
  //     console.log("데이터길이", data.totalCount);

  //     setCompany(data);
  //   };
  //   settingCompany();
  // }, []);

  return (
    <div className="m_inner">
      <div className="top_inner">
        <h2>비교할 기업 선택하기</h2>
        <span>x</span>
      </div>
      <div className="search_box">
        <button>
          <img src="/img/ic_search.png" />
        </button>
        <input
          type="text"
          name="compare_search"
          placeholder="검색어를 입력하세요"
        />
      </div>
      <div className="select_company">
        <h3>선택한 기업 (5)</h3>
        {data.map((value, index) => {
          return (
            <CompanyBox
              key={index}
              name={value.name}
              category={value.category.category}
            />
          );
        })}
        <Pagination
          currentPage={currentPage} // 현재 페이지
          totalPages={5} // 전체 보이는 페이지
          onPageChange={() => {
            setCurrentPage(currentPage + 1);
          }}
          // onPageChange={6}
          itemsPerPage={20} //
        />
      </div>
    </div>
  );
}
