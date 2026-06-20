import axios from "axios";

// Create an Axios Instance
const client = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { "Content-Type": "application/json" }
});


// Request Interceptor (Attach JWT on every request)
client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


// Response Interceptor
client.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.stattus === 401) {
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
        return Promise.reject(err)
    }
);

export default client;
