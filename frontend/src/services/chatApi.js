import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const addConversation = async (chatUserId) => {
  const response = await api.post('/conversations', {
    user_id: chatUserId, // Send user_id: chatUserId
  });
  return response.data;
};
export const sendMessage = async (content, conversationId) => {
  try {
    const response = await api.post(
      `/conversations/${conversationId}/messages`,
      {
        content: content,
      }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getMessages = async (conversationId) => {
  const response = await api.get(`/conversations/${conversationId}/messages`);
  console.log(response);
  return response.data;
};
export const deleteMessageEndpoint = async (messageId) => {
  const response = await api.delete(`messages/${messageId}`);
  return response;
};
