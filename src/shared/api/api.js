import axios from "axios";

// export const backendUrl = “”  <- 이렇게 주소 관리하라심

//기업 비교
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // baseURL을 설정하세요
  headers: { "Content-Type": "application/json" },
});

export async function getCompanyApi(limit, offset, keyword = "", id) {
  let uri = `/api/companies?limit=${limit}&offset=${offset}&keyword=${keyword}&id={id}`;
  const respnse = await axiosInstance.get(uri);

  return respnse.data;
}
