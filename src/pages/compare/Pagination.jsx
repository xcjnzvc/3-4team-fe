import styles from "../../shared/components/Pagination.module.css";

export function Pagination() {
  return (
    <ul>
      <li>전</li>
      {Array.mpa((v, index) => {
        if (v <= totalLength) {
          let onColor = v === page ? "on_color" : "";
          return <li>{v}</li>;
        }
      })}
      <li>후</li>
    </ul>
  );
}
