import axios, { AxiosInstance } from "axios"

export class HttpClient {
  constructor() {}

  create() {
    const instance: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL
    })
    return instance
  }
}
