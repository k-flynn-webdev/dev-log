import axios from "axios";
import { getStorageAccessToken } from "../helpers/authentication";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getStorageAccessToken()}`,
    "Accept-Version": "v1",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const authSet = (accessToken) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
};

export const authRemove = () => {
  axiosInstance.defaults.headers["Authorization"] = null;
};

export const get = (url, params) => {
  return axiosInstance.get(url, params);
};

export const post = (url, params) => {
  return axiosInstance.post(url, params);
};

export const put = (url, params) => {
  return axiosInstance.put(url, params);
};

export const patch = (url, params) => {
  return axiosInstance.patch(url, params);
};

export const remove = (url, params) => {
  return axiosInstance.delete(url, params);
};