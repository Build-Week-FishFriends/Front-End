import axios from "axios";
function axiosWithAuth(url) {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: token
    }
  });
}
export default axiosWithAuth;