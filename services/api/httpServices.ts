import axios from "axios";
import { toast } from "react-hot-toast";
import Env from "@/config/env";

const axiosInstance = axios.create({
  baseURL: Env.serverEndpoint,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 500) {
      toast.error("Internal server error");
    }

    const message =
      error.response?.data?.error ?? error.message ?? "Request failed";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
