import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CompanyDetails.module.css";
import UserInvestList from "../Investment/UserInvestList";
import InvestmentButton from "./../Investment/InvestmentButton/InvestmentButton";

function CompanyDetails() {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/companies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched data:", data); // 받아온 데이터 확인
        setData(data);
      });
  }, [id]);

  return (
    <>
      <div className={styles.titleBar}>
        <img
          src={data.logo || "/img/companyLogo/codeit.png"}
          alt={`${data.name} 로고`}
          className={styles.companyLogo}
        />
        <div className={styles.titleBox}>
          <p className={styles.title}>{data.name}</p>
          <p className={styles.subTitle}>
            {data.category ? data.category.category : "정보 없음"}
          </p>
        </div>
      </div>
      <div className={styles.pointBoxBar}>
        <div className={styles.pointBox}>
          <p className={styles.pointBoxTitle}>누적 투자 금액</p>
          <p className={styles.pointBoxValue}>
            {data.actualInvest / 100000000}억 원
          </p>
        </div>
        <div className={styles.pointBox}>
          <p className={styles.pointBoxTitle}>매출액</p>
          <p className={styles.pointBoxValue}>
            {data.revenue / 100000000}억 원
          </p>
        </div>
        <div className={styles.pointBox}>
          <p className={styles.pointBoxTitle}>고용 인원</p>
          <p className={styles.pointBoxValue}>{data.employees}명</p>
        </div>
      </div>
      <div className={styles.descriptionBox}>
        <p className={styles.descriptionBoxTitle}>기업소개</p>
        <div className={styles.descriptionBoxIntro}>
          <span>{data.category ? data.category.category : "정보 없음"}</span>{" "}
          분야의 떠오르는 스타트업 <span>{data.name}</span> 입니다.
        </div>
        <p>
          {data.description} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Tenetur quos et, ut, autem nesciunt eveniet minima similique
          blanditiis reiciendis, placeat aperiam repudiandae quasi veritatis
          adipisci eligendi commodi numquam vero ratione. In quasi incidunt ad
          fugiat natus exercitationem laudantium, placeat inventore, eius velit
          totam pariatur tempora corrupti quia, possimus veniam est magni quis
          modi quisquam. Alias cupiditate quaerat rem asperiores molestias{" "}
          {data.category ? data.category.category : "정보 없음"} 스타트업
          입니다.
        </p>
      </div>
      <div className={styles.investBar}>
        <div>View My Startup에서 받은 투자</div>
        <InvestmentButton id = {id}>기업투자하기</InvestmentButton>
        {/* <div className={styles.goInvest}>기업투자하기</div> */}
      </div>
      <div className={styles.userInvest}>
        <UserInvestList companyData={data} />
      </div>
    </>
  );
}

export default CompanyDetails;
