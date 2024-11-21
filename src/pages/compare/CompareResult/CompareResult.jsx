import styles from './CompareResult.module.css';
import MySelected from './MySelected';
import '../../../shared/css/com.css';
import ResultConfirm from './ResultConfirm';
import RankCompare from './RankCompare';
import InvestmentButton from '../../Investment/InvestmentButton/InvestmentButton';

export default function CompareResult() {
  return (
    <div className={styles.container}>
      <MySelected/>
      <ResultConfirm/>
      <RankCompare/>
      <InvestmentButton/>
    </div>
  )
}