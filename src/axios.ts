import axios, { AxiosResponse } from 'axios';
import { CustomResponse } from "../api/api";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (res: AxiosResponse<CustomResponse>) => {
        if (res.data.code !== '200') {
            console.log(res)
        }

        return res;
    },
);

export default axiosInstance;
