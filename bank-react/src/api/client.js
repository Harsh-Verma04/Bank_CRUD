import axios from 'axios'

const baseURL = 'https://bankcrud-production.up.railway.app'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Simple helpers for errors
export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message || error.response?.data?.error || error.message
    return msg || 'Unexpected error occurred'
  }
  return 'Unexpected error occurred'
}
