import styles from './MySelected.module.css'

export default function MySelected() {
  return (
      <div className={styles.container}>
        <div className={styles.mySelected}>
          <h1 className={styles.header_title}>내가 선택한 기업</h1>
          <button>다른 기업 비교하기</button>
        </div>

        <section className={styles.company_list}>
          <img src="/img/companyLogo/codeit.png" alt="내가 선택한 기업 이미지" />
          <p>코드잇</p>
          <p>에듀테크</p>
        </section>
      </div>
  );
}
