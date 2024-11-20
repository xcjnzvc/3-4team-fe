import React, { useState } from "react";
import styles from "./WholeList.module.css";
import Pagination from "../../shared/components/Pagination";
import { useLocation } from "react-router-dom";
import resultStyle from "../compare/CompareResult/CompareResult.module.css";

function WholeList({ data, perPage = 10, isResult = false, isPagination = true}) {  // 비교결과페이지에서는 페이지네이션 X
  const itemsPerPage = perPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [offset, setOffset] = useState(0); // offset을 이용해 시작 인덱스 관리
  const currentPage = Math.floor(offset / itemsPerPage) + 1; // 현재 페이지 계산

  // 현재 페이지에 표시할 데이터 슬라이스
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };
  
  const style = isResult ? resultStyle : styles;  //비교결과 페이지에서 재사용할때(결과컴포넌트에는 순위 없음)

  return (
    <div>
      <div className={style.table}>
        <div className={`${style.row} ${style.header}`}>
          {isResult ? null : <div>순위</div>}
          <div>기업 명</div>
          <div>기업 소개</div>
          <div>카테고리</div>
          <div>누적 투자 금액</div>
          <div>매출액</div>
          <div>고용 인원</div>
        </div>
        {currentItems.map((item, index) => (
          <div className={style.row} key={index}>
            {isResult ? null : <div>{offset + index + 1}위</div>}
            <div className={style.leftAlign}>
              <img
                src={item.logo || "/img/companyLogo/codeit.png"}
                alt={`${item.name} 로고`}
                className={style.companyLogo}
              />
              {item.name}
            </div>
            <div className={style.description}>{item.description}</div>
            <div>{item.category.category}</div>
            <div>{item.actualInvest / 100000000}억 원</div>
            <div>{item.revenue / 100000000}억 원</div>
            <div>{item.employees}명</div>
          </div>
        ))}
      </div>
      {!isPagination ? null : 
        <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />}
    </div>
  );
}

export default WholeList;
