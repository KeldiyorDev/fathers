import axios from "axios";

const defaultOptions = {
    baseURL: "https://95.46.96.154:5010/api",
    // baseURL: "http://api.edureyting.uz/api",
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

export const url = "https://95.46.96.154:5010/api"
// export const url = "http://api.edureyting.uz/api"