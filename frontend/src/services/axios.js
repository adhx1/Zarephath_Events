import axios from "axios";

const api = axios.create({
  baseURL: "https://zarephath-events.onrender.com/api",
});

export default api;