import axios from 'axios';

const secureAxios = axios.create({
  baseURL: "https://life-insurance-server.vercel.app/api",
  withCredentials: true, 
});

export default secureAxios;