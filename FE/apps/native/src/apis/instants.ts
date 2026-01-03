import axios from "axios";
// const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "";

const https = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { https };
