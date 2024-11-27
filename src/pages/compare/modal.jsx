import { useState, useEffect } from "react";
import { getCompanyApi } from "../../shared/api/api";
import { SmallPagenation } from "./smallPagenation";
import SearchBox from "../../shared/components/SearchComponenet";
import styles from "./modal.module.css";
import "./custom.css";

//ㅇㅣ거 이제 안 쓰는 것 같은데

function CompanyBox({
  name,
  category,
  onClick,
  btnStyle = {},
  btnText = "선택하기",
  imgDisplay = false,
}) {
  // console.log("asd", onClick);
  return (
    <div className={styles.company_box}>
      <div className={styles.left}>
        <div className={styles.img_box}>
          <img src="" />
        </div>
        <span>{name}</span>
        <p>{category}</p>
      </div>
      <button style={btnStyle} onClick={onClick}>
        {/** true ? 이거 해라 : 이거 하지 마라 */}
        {imgDisplay ? <img src="/img/ic_check.png" /> : null}
        {btnText}
      </button>
    </div>
  );
}

export function MyModal({
  closeModal,
  setPagenumber,
  setPage,
  page,
  startPage,
  lastPage,
  setData,
  setKeyword,
  setTotalLength,
  sellCount,
  keyword,
  totalLength,
  data,
  selectHandle,
  pageNumber,
  goodClick,
  goodClick2,
}) {
  return (
    <div className={styles.m_inner}>
      <div className={styles.top_inner}>
        <h2>나의 기업 선택하기</h2>
        <span onClick={closeModal}>x</span>
      </div>
      <SearchBox
        className={styles.search_box}
        keyword={setKeyword}
        data={setData}
        totalLength={setTotalLength}
        count={sellCount}
        pageNum={setPagenumber}
      />
      <div className={styles.select_company}>
        {keyword === "" ? (
          <p className={styles.select_text}>기업을 검색해주세요</p>
        ) : (
          <>
            <h3>최근 선택된 기업 ({totalLength})</h3>
            {data.map((value, index) => {
              return (
                <CompanyBox
                  key={index}
                  id={value.id}
                  name={value.name}
                  category={value.category.category}
                  btnText={value.isSelect ? "선택 완료" : "선택하기"}
                  onClick={() => selectHandle(value)}
                  btnStyle={{
                    color: value.isSelect ? "white" : "#EB5230",
                    borderColor: value.isSelect ? "white" : "#EB5230",
                  }}
                  imgDisplay={value.isSelect}
                />
              );
            })}
            <SmallPagenation
              page={page}
              setPage={setPage}
              pageNumber={pageNumber}
              startPage={startPage}
              lastPage={lastPage}
            />
            <button onClick={goodClick2}>확인</button>
          </>
        )}
      </div>
    </div>
  );
}

export function CompareModal({ closeModal }) {
  //api에서 데이터 불러오기
  const [data, setData] = useState([]);
  // 데이터 전체 길이
  const [totalLength, setTotalLength] = useState(0);
  //현재 페이지
  const [page, setPage] = useState(1);
  // 전체 데이터 갯수를 받아와서 셀카운터랑 나누고 페이지네이션 갯수를 설정하기 위해 사용 ( 19/5를 하기위해)
  const [pageNumber, setPagenumber] = useState(0);
  // 전체 데이터 갯수를 몇으로 나눌지 사용(지금은 5개씩 보이니까 5로 나눔)
  const [sellCount, setSellCount] = useState(5);
  // 시작 페이지
  const [startPage, setStartpage] = useState(1);
  // 마지막 페이지
  const [lastPage, setLastpage] = useState(5);
  // 검색 ㅏ
  const [keyword, setKeyword] = useState("");
  //id 선택값
  const [selectedIds, setSelectedIds] = useState([]);

  // 선택해제 버튼
  const deselectHandle = (selectid) => {
    const newArry = selectedIds.filter((row) => row.id !== selectid.id);
    // console.log(
    //   "if",
    //   selectedIds.filter((row) => row.id !== selectid.id)
    // );
    // console.log("newArry", newArry);
    setSelectedIds(newArry);
  };

  //선택하기 버튼
  const selectHandle = (selectId) => {
    if (selectedIds.length > 4) {
      alert("돌아가");
      return;
    }

    if (selectedIds.find((v) => v.id === selectId.id)) return;

    setSelectedIds([...selectedIds, selectId]);
    const newData = data.map((row) => {
      if (row.id === selectId.id) {
        return {
          ...row,
          isSelect: true,
        };
      } else {
        return row;
      }
    });
    // console.log(selectId.id);
    setData(newData);
  };

  useEffect(() => {
    const settingCompany = async () => {
      const _data = await getCompanyApi(5, page - 1, keyword);
      //api로 받아온 데이터에 선택 상태 반영
      const updatedData = _data.data.map((item) => ({
        ...item,
        isSelect: selectedIds.some((selected) => selected.id === item.id),
      }));
      setData(updatedData);
      setPagenumber(
        Math.ceil(_data.totalCount / sellCount) < 1
          ? 1
          : Math.ceil(_data.totalCount / sellCount)
      );
      setTotalLength(_data.totalCount);
    };
    settingCompany();
  }, [page, selectedIds]);

  const arr = [];
  for (let i = startPage; i <= lastPage; i++) {
    arr.push(i);
  }

  //후
  const nextHandle = () => {
    if (page < pageNumber) {
      setPage(page + 1);
      if (page % 5 === 0) {
        setStartpage(page + 5);
        setLastpage(page + 5);
      }
    }
  };

  //전
  const beforeHandle = () => {
    if (page > 1) {
      setPage(page - 1);
      if (page % 5 === 1) {
        setStartpage(page - 5);
        setLastpage(page - 5);
      }
    }
  };

  const onClickHandle = (event) => {
    // console.log(event.target);
    setPage(Number(event.target.textContent));
  };

  // useEffect(() => {
  //   console.log("키워드", keyword);
  //   console.log("데이터", data);
  //   console.log("토탈길이", totalLength);
  // }, [keyword]);

  return (
    <div className={styles.m_inner}>
      <div className={styles.top_inner}>
        <h2>비교할 기업 선택하기</h2>
        <span onClick={closeModal}>x</span>
      </div>
      <SearchBox
        className={styles.search_box}
        keyword={setKeyword}
        data={setData}
        totalLength={setTotalLength}
        count={sellCount}
        pageNum={setPagenumber}
      />
      <div className={styles.select_company}>
        <h3>선택한 기업 ({selectedIds.length})</h3>
        {selectedIds.length === 0 ? (
          <p className={styles.select_text}>기업을 선택 해주세요</p>
        ) : (
          selectedIds.map((value, index) => {
            return (
              <CompanyBox
                key={index}
                name={value.name}
                category={value.category.category}
                btnText="선택 해제"
                onClick={() => deselectHandle(value)}
              />
            );
          })
        )}
      </div>
      <div className={styles.select_company}>
        <h3>검색 결과 ({totalLength})</h3>
        {data.map((value, index) => {
          return (
            <CompanyBox
              key={index}
              id={value.id}
              name={value.name}
              category={value.category.category}
              btnText={value.isSelect ? "선택 완료" : "선택하기"}
              onClick={() => selectHandle(value)}
              btnStyle={{
                color: value.isSelect ? "white" : "#EB5230",
                borderColor: value.isSelect ? "white" : "#EB5230",
              }}
              imgDisplay={value.isSelect}
            />
          );
        })}
      </div>
      <ul className={styles.pagination}>
        <li onClick={beforeHandle} className={styles.arrowButton}>
          {/* 전 */}
        </li>
        {arr.map((num, index) => {
          if (num <= pageNumber) {
            let onColor =
              num === page
                ? {
                    backgroundColor: "#eb5230",
                    color: "#fff",
                    borderColor: "#eb5230",
                  }
                : {};
            return (
              <li
                key={index}
                className={styles.pageNumber}
                onClick={onClickHandle}
                style={onColor}
              >
                {num}
              </li>
            );
          }
        })}
        <li
          onClick={nextHandle}
          className={`${styles.arrowButton} ${styles.right}`}
        >
          {/* 후 */}
        </li>
      </ul>
    </div>
  );
}
