// import styles from "../component/headerModule.css";
import "../components/header.css";
import "../css/com.css";
import { Link, NavLink } from "react-router-dom";

const activeStyle = {
  color: "#fff",
  textDecoration: "none",
};

const defaultColor = {
  color: "#747474",
};

export function Header() {
  return (
    <header>
      <div className="gnb">
        <Link to="/" className="logo">
          <img src="/img/img_logo.png" alt="logo" />
        </Link>
        <ul className="nav">
          <li>
            <NavLink
              to="compare"
              style={({ isActive }) => {
                return isActive ? activeStyle : defaultColor;
              }}
            >
              나의 기업 비교
            </NavLink>
          </li>
          <li>
            {/* 임시경로입니다 수정해야해요! */}
            <NavLink
              to="/compareoverview"
              style={({ isActive }) => {
                return isActive ? activeStyle : defaultColor;
              }}
            >
              비교 현황
            </NavLink>
          </li>

          <li>
            {/* 임시경로입니다 수정해야해요! */}
            <NavLink
              to="/investment"
              style={({ isActive }) => {
                return isActive ? activeStyle : defaultColor;
              }}
            >
              투자 현황
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
