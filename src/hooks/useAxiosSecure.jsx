import axios from "axios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "https://server-nine-tau-39.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();
  const token = user?.accessToken;

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.status === 401 || error.status === 403) {
        logoutUser()
          .then(() => {
            Swal.fire({
              icon: "error",
              title: "Unauthorized",
              text: "Your session has expired. Please login again.",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: "Something went wrong during logout. Please try again.",
            });
          });
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxiosSecure;
