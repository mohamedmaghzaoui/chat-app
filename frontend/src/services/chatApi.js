import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const addConversation = async (chatUserId) => {
  const response = await api.post('/conversation', {
    user_id: chatUserId, // Send user_id: chatUserId
  });
  return response.data;
};
