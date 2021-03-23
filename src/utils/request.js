import axios from "axios";
import { Message, MessageBox } from "element-ui";
import cookie from "js-cookie";
import store from "../store";
// import { getToken } from "@/utils/auth";
const service = axios.create({
  baseURL: "http://121.196.59.69:9001/intelligence",
  // baseURL: "http://192.168.1.111:8081/intelligence", 
  // baseURL: "http://localhost:8081/intelligence", 
  // 超时
  timeout: 30000
});


service.interceptors.request.use(
  (config) => {
    if (cookie.get("lc_token")) {
      config.headers["token"] = cookie.get("lc_token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use((response) => {
  if (response.data.code !== 200) {
    Message({
      message: response.data.message,
      type: "error",
      duration: 5 * 1000,
    });
    return response;
  } else {
    return response;
  }
});

export default service;