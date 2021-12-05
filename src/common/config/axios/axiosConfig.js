import axios from 'axios';

const ax = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

ax.defaults.headers.post['Content-Type'] = 'application/json';
const setApiToken = (token) => {
  ax.defaults.headers.common['Authorization'] = `bearer ${token}`;
};

export { ax, setApiToken };
