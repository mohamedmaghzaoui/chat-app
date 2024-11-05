import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const RegisterUser = async (user) => {
  try {
    const response = await api.post('/register', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const LoginUser = async (user) => {
  try {
    const response = await api.post('/login', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const LogoutUser = async (user) => {
  try {
    const response = await api.post('/logout', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getUsers = async (user) => {
  try {
    const response = await api.post('/users', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getUser = async (user) => {
  try {
    const response = await api.post('/user', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
