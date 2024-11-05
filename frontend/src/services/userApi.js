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
  const response = await api.post('/login', user);
};
