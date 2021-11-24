import axios from 'axios';

const ax = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

ax.defaults.headers.post['Content-Type'] = 'application/json';

export default ax;
