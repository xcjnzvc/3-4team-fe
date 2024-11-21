import { Prisma } from "@prisma/client";
import { getCompanyApi } from "../api/api";
import { useState } from "react";

export default function SearchComponenet({
  className,
  setCompanies,
  pageNum,
  count,
  fetchCompanies,
  searchKeyword,
  setSearchKeyword,
  setTriger,
}) {
  const searchHandle = (e) => {
    // 값이 변할때마다 api 가져옴
    setSearchKeyword(e.target.value);
    // console.log("키워드", keyword());
    // console.log("숫자", e.target.value);
    // fetchCompanies();
    setTriger(true);
  };

  const enterEvent = (e) => {
    if (e.keyCode === 13) {
      //   enter 키코드가 13이라 keydown 이벤트를 이용했음
      fetchCompanies();
    }
  };

  return (
    <div className={className}>
      <button>
        <img src="/img/ic_search.png" />
      </button>
      <input
        type="text"
        value={searchKeyword}
        name="compare_search"
        placeholder="검색어를 입력하세요"
        onChange={searchHandle}
        onKeyDown={enterEvent}
      />
    </div>
  );
}
