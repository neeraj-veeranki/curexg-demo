import axios from "axios";

const api = axios.create({
  baseURL: "https://api.exchangeratesapi.io/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export default api;
