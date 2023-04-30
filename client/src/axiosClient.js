import axios, { AxiosError } from 'axios';
import { AuthService } from './services/auth';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const axiosClient = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
const publicApi = [/\/product\/.*/, /\/auth\/.*/, /\/address\/.*/];
axiosClient.interceptors.request.use((config) => {
  const isPublic = publicApi.find((item) => item.test(config.url));
  if (isPublic) return config;
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axiosClient.interceptors.response.use(
//   (response) => response.data,
//   async (error) =>
//     new Promise(async (resolve, reject) => {
//       if (error.name === 'TokenNotGiven') {
//         alert(error.message);
//       }
//       if (error.response.status === 401) {
//         try {
//           const response = await AuthService.refreshToken();
//           if (!response) {
//             localStorage.removeItem('access_token');
//             reject("Can't refresh token");
//           } else {
//             localStorage.setItem('access_token', response);
//             error.config.headers.Authorization = `Bearer ${response}`;
//             resolve(axiosClient(error.config));
//           }
//         } catch (error) {
//           localStorage.removeItem('access_token');
//           reject(error);
//         }
//       }
//     }).catch((error) => {
//       console.log(error);
//     }),
// );

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response.status === 401) {
      const response = await AuthService.refreshToken();
      if (!response) {
        localStorage.removeItem('access_token');
        return Promise.reject(error);
      } else {
        localStorage.setItem('access_token', response);
        error.config.headers.Authorization = `Bearer ${response}`;
        return axiosClient(error.config);
      }
    }
    localStorage.removeItem('access_token');
    return Promise.reject(error);
  },
);
