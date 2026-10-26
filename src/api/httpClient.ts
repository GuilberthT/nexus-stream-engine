import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 'sem resposta'
      return Promise.reject(
        new Error(`Falha na API (${status}): ${error.message}`),
      )
    }
    return Promise.reject(error)
  },
)
