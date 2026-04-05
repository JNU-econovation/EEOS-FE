import axios from "axios";

const proxy = axios.create({
  baseURL: "/api",
});

export default proxy;
