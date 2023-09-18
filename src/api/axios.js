import axios from "axios";

const instance = axios.create({
  // configurations
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "api-key": process.env.REACT_APP_API_KEY,//non c'è!!!! da agigungere?
  },
});

export default instance;
