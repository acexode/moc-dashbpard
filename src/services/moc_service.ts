import axios from "axios";
import tokenService from "../services/tokenService"
import { MOC_BASE_URL} from "./baseurl";

let headers:any = {};
const token = localStorage.getItem("moc-token");

if (token) {
    headers.Authorization = `${token}`;
}

const MocAxiosInstance = axios.create({
    baseURL:MOC_BASE_URL,
});
MocAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("moc-token");
    if (!token) {
        throw new axios.Cancel("Token is not available. Do login, please.");
    } else {
        config.headers.Authorization = token;
        return config;
    }
});
MocAxiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.response.status === 401) {
            console.log(error);
            tokenService.removeMOCToken();

            // @ts-ignore
            window.location = "/auth/login";
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
);

export default MocAxiosInstance;
