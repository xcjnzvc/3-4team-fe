import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CompanyDetails.module.css";

function CompanyDetails() {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/companies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // 받아온 데이터 확인
        setData(data);
      });
  }, [id]);

  return (
    <>
      <div>
        <h1>기업 상세 정보</h1>
        <p>기업명: {data.name}</p>
        <p>설명: {data.description}</p>
        <p>카테고리: {data.category ? data.category.category : "정보 없음"}</p>
        <p>투자금액: {data.actualInvest / 100000000}억 원</p>
        <p>매출: {data.revenue / 100000000}억 원</p>
        <p>직원수: {data.employees}명</p>
      </div>
    </>
  );
}

export default CompanyDetails;
