import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const secureAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

// This ensures the token is only requested when auth is ready
let currentUserPromise = new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    resolve(user);
    unsubscribe(); // Unsubscribe after first fire
  });
});

secureAxios.interceptors.request.use(async (config) => {
  const user = await currentUserPromise;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default secureAxios;
