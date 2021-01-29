import axios, { AxiosInstance } from 'axios'
export const baseAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  timeout: 15000,
})
