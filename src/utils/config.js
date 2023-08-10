import axios from "axios";

const defaultOptions = {
    // baseURL: "http://localhost:9090",
    baseURL: "http://95.47.127.171:5011/api",
    headers: {
        'Content-Type': 'application/json',
    },
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers.token = user?.token ? `${user?.token}` : '';
    return config;
});

export default axiosInstance;

// export const url = "http://localhost:9090"
export const url = "http://95.47.127.171:5011/api"