import styles from './CompareResult.module.css';
import MySelected from './MySelected';
import '../../../shared/css/com.css';
import ResultConfirm from './ResultConfirm';
import RankCompare from './RankCompare';

export default function CompareResult() {
  return (
    <>
      <MySelected/>
      <ResultConfirm/>
      <RankCompare/>
    </>
  )
}