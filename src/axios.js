import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3500",
  // baseURL: "https://shopsavvy-backend-production.up.railway.app",
});

export default instance;
