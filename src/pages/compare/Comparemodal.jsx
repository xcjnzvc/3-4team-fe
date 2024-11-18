import { useEffect } from "react";
import { useState } from "react";
import { getCompanyApi } from "../../shared/api/api";
import styles from "./comparemodal.module.css";
// import "./comparemodal.css";
import "./custom.css";

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

export function CompareModal() {
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

  //선택 기업
  const [select, setSelect] = useState([]);

  // 검색 ㅏ
  const [keyword, setKeyword] = useState("");

  //id 선택값
  const [selectedIds, setSelectedIds] = useState([]);

  //이전 배열값
  const [arr1, setArr1] = useState([]);

  // 선택해제 버튼
  const exHandle = (selectid) => {
    const newArry = selectedIds.filter((row) => row.id !== selectid.id);
    console.log(newArry);
    setSelectedIds(newArry);
    const newData = data.map((row) => {
      if (row.id === selectid.id) {
        return {
          ...row,
          isSelect: false,
        };
      } else {
        return row;
      }
    });
    // console.log(selectId.id);
    setData(newData);
  };

  //선택하기 버튼
  const selHandle = (selectId) => {
    if (selectedIds.length > 4) {
      alert(`"ㅗ"`);
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
    // console.log(data, selectedIds);
    const d = selectedIds.filter((v) => {
      setArr1(data);
      if (arr1.find((x) => x.id === v.id)) {
        return arr1;
      }
    });
    if (d) {
      const aa = d.map((v) => {
        return {
          ...v,
          isSelect: true,
        };
      });
      setData(aa);
      console.log("dddd", aa);
    }
    const settingCompany = async () => {
      const _data = await getCompanyApi(5, page - 1, keyword);
      setData(_data.data);
      setPagenumber(
        Math.ceil(_data.totalCount / sellCount) < 1
          ? 1
          : Math.ceil(_data.totalCount / sellCount)
      );
      setTotalLength(_data.totalCount);
    };
    settingCompany();
  }, [page]);

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
  const searchHandle = (e) => {
    // 값이 변할때마다 api 가져옴
    setKeyword(e.target.value);
    getCompanyApi(5, 0, e.target.value).then((res) => {
      setData(res.data);
      setTotalLength(res.totalCount);
      setPagenumber(
        Math.ceil(res.totalCount / sellCount) < 1
          ? 1
          : Math.ceil(res.totalCount / sellCount)
      );
    });
  };

  const enterEvent = (e) => {
    if (e.keyCode === 13) {
      // enter 키코드가 13이라 keydown 이벤트를 이용했음
      getCompanyApi(5, 0, keyword).then((res) => {
        setData(res.data);
        setTotalLength(res.totalCount);
        setPagenumber(
          Math.ceil(res.totalCount / sellCount) < 1
            ? 1
            : Math.ceil(res.totalCount / sellCount)
        );
      });
    }
  };
  return (
    <div className={styles.m_inner}>
      <div className={styles.top_inner}>
        <h2>비교할 기업 선택하기</h2>
        <span>x</span>
      </div>
      <div className={styles.search_box}>
        <button>
          <img src="/img/ic_search.png" />
        </button>
        <input
          type="text"
          name="compare_search"
          placeholder="검색어를 입력하세요"
          onChange={searchHandle}
          onKeyDown={enterEvent}
        />
      </div>
      <div className={styles.select_company}>
        <h3>선택한 기업 ({selectedIds.length})</h3>
        {selectedIds.length === 0 ? (
          <p className="">기업을 선택 해주세요</p>
        ) : (
          selectedIds.map((value, index) => {
            return (
              <CompanyBox
                key={index}
                name={value.name}
                category={value.category.category}
                btnText="선택 해제"
                onClick={() => exHandle(value)}
                // onClick={outListHandle}
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
              // onClick={selectHandle}
              btnText={value.isSelect ? "선택 완료" : "선택하기"}
              onClick={() => selHandle(value)}
              btnStyle={{
                color: value.isSelect ? "white" : "#EB5230",
                borderColor: value.isSelect ? "white" : "#EB5230",
                // backgroundImage: value.isSelect ? "/img/ic_check.png" : "",
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
