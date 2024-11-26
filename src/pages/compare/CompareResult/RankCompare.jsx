import CustomSelect from '../../../shared/components/CustomSelect';
import WholeList from '../../home/WholeList';
import otherStyle from './ResultConfirm.module.css'

import { useState,useMemo,useEffect } from 'react';

export default function RankCompare() {
  const [sortOption, setSortOption] = useState("actualInvest_desc");
  const [data, setData] = useState([]);
  
  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const sortOptions = [
    { label: "누적 투자 금액 높은순", value: "actualInvest_desc" },
    { label: "누적 투자 금액 낮은순", value: "actualInvest_asc" },
    { label: "매출액 높은순", value: "revenue_desc" },
    { label: "매출액 낮은순", value: "revenue_asc" },
    { label: "고용 인원 높은순", value: "employees_desc" },
    { label: "고용 인원 낮은순", value: "employees_asc" },
  ];

  useEffect(() => {
    fetch("http://localhost:8000/api/investments")    //Rank api로 나중에 변경
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [sortOption]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      switch (sortOption) {
        case "actualInvest_desc":
          return b.actualInvest - a.actualInvest;
        case "actualInvest_asc":
          return a.actualInvest - b.actualInvest;
        case "revenue_desc":
          return b.revenue - a.revenue;
        case "revenue_asc":
          return a.revenue - b.revenue;
        case "employees_desc":
          return b.employees - a.employees;
        case "employees_asc":
          return a.employees - b.employees;
        default:
          return 0;
      }
    });
  }, [sortOption, data]);
  
  return (
    <div className={otherStyle.container}>
      <div className={otherStyle.resultConfirm}>
        <h1 className={otherStyle.header_title}>기업 순위 확인하기</h1>
        <CustomSelect
          options={sortOptions}
          onOptionChange={handleSortOptionChange}
          selectedOption={sortOption}
        />
      </div>
      <WholeList data={sortedData} perPage={5} isPagination={false}/>
    </div>
  )
}