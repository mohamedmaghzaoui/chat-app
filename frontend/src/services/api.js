import axios from "axios";
//test

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getData = async () => {
  const response = await api.get("/data");

  return response.data;
};
