import { getCompanyApi } from "../../shared/api/api";
import styles from "../../pages/compare/comparemodal.module.css";

export default function SelectBox({
  className,
  keyword,
  data,
  totalLength,
  pageNum,
  count,
}) {
  const searchHandle = (e) => {
    // 값이 변할때마다 api 가져옴
    keyword(e.target.value);
    getCompanyApi(5, 0, e.target.value).then((res) => {
      data(res.data);
      totalLength(res.totalCount); //데이터의 전체 갯수(19개)
      pageNum(
        Math.ceil(res.totalCount / count) < 1
          ? 1
          : Math.ceil(res.totalCount / count)
      );
    });
  };
  const enterEvent = (e) => {
    if (e.keyCode === 13) {
      //   enter 키코드가 13이라 keydown 이벤트를 이용했음
      getCompanyApi(5, 0, keyword).then((res) => {
        data(res.data);
        totalLength(res.totalCount); //데이터의 전체 갯수(19개)
        pageNum(
          Math.ceil(res.totalCount / count) < 1
            ? 1
            : Math.ceil(res.totalCount / count)
        );
      });
    }
  };
  return (
    <div className={className}>
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
  );
}
