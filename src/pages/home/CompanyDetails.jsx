import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CompanyDetails.module.css";
import UserInvestList from "../Investment/UserInvestList";
import InvestmentButton from "./../Investment/InvestmentButton/InvestmentButton";

function CompanyDetails() {
  const { id } = useParams();

  const [companyData, setCompanyData] = useState({});
  const [investData, setInvestData] = useState([]);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/companies/${id}`);
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {
      console.error("회사 데이터 오류 발생:", error);
    }
  };

  const fetchInvestData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/investments/${id}`);
      const data = await response.json();
      const sortedData = data.sort((a, b) => b.investAmount - a.investAmount);
      setInvestData(sortedData);
    } catch (error) {
      console.error("투자 데이터 오류 발생:", error);
    }
  };

  const handleInvestSuccess = () => {
    fetchCompanyData(); 
    fetchInvestData();  
  };

  useEffect(() => {
    fetchCompanyData();
    fetchInvestData();
  }, [id]);

  return (
    <>
      <div className={styles.titleBar}>
        {/* <img
          src={companyData.logo || "/img/companyLogo/codeit.png"}
          alt={`${companyData.name} 로고`}
          className={styles.companyLogo}
        /> */}
        <span className={styles.circleLogo}>
          {companyData.name ? companyData.name.charAt(0) : ""}
        </span>
        <div className={styles.titleBox}>
          <p className={styles.title}>{companyData.name}</p>
          <p className={styles.subTitle}>
            {companyData.category ? companyData.category.category : "정보 없음"}
          </p>
        </div>
      </div>
      <div className={styles.pointBoxBar}>
        <div className={styles.pointBox}>
          <p className={styles.pointBoxTitle}>누적 투자 금액</p>
          <p className={styles.pointBoxValue}>
            {companyData.actualInvest / 100000000}억 원
          </p>
        </div>
        <div className={styles.pointBox}>
          <p className={styles.pointBoxTitle}>매출액</p>
          <p className={styles.pointBoxValue}>
            {companyData.revenue / 100000000}억 원
          </p>
        </div>
        <div className={styles.pointBox}>
          <p className={styles.pointBoxTitle}>고용 인원</p>
          <p className={styles.pointBoxValue}>{companyData.employees}명</p>
        </div>
      </div>
      <div className={styles.descriptionBox}>
        <p className={styles.descriptionBoxTitle}>기업소개</p>
        <div className={styles.descriptionBoxIntro}>
          <span>{companyData.category ? companyData.category.category : "정보 없음"}</span>{" "}
          분야의 떠오르는 스타트업 <span>{companyData.name}</span> 입니다.
        </div>
        <p>
          {companyData.description} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Tenetur quos et, ut, autem nesciunt eveniet minima similique
          blanditiis reiciendis, placeat aperiam repudiandae quasi veritatis
          adipisci eligendi commodi numquam vero ratione. In quasi incidunt ad
          fugiat natus exercitationem laudantium, placeat inventore, eius velit
          totam pariatur tempora corrupti quia, possimus veniam est magni quis
          modi quisquam. Alias cupiditate quaerat rem asperiores molestias{" "}
          {companyData.category ? companyData.category.category : "정보 없음"} 스타트업
          입니다.
        </p>
      </div>
      <div className={styles.investBar}>
        <div>View My Startup에서 받은 투자</div>
        <InvestmentButton id={id} data={companyData} onSuccess={handleInvestSuccess} >
          기업투자하기
        </InvestmentButton>
      </div>
      <div className={styles.userInvest}>
        <UserInvestList investData={investData} totalSimInvest={companyData.simInvest} />
      </div>
    </>
  );
}

export default CompanyDetails;
