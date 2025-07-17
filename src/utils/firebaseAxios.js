import axios from 'axios';

const secureAxios = axios.create({
  baseURL: "https://life-insurance-server.vercel.app/api",
  withCredentials: true, // only if you're using cookies or JWT in cookies
});

export default secureAxios;