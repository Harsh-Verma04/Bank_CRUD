import { api } from './client'

// Backend endpoints (Spring Boot AccountController)
// POST /api/accounts -> Create account
export async function createAccount(payload) {
  const { data } = await api.post('/api/accounts', payload)
  return data
}

// GET /api/accounts -> list all
export async function getAccounts() {
  const { data } = await api.get('/api/accounts')
  return data
}

// GET /api/accounts/{id}
export async function getAccountById(id) {
  const { data } = await api.get(`/api/accounts/${id}`)
  return data
}

// POST /api/accounts/{id}/deposit  (body: double)
export async function depositAmount(id, amount) {
  const { data } = await api.post(`/api/accounts/${id}/deposit`, amount, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

// POST /api/accounts/{id}/withdraw (body: double)
export async function withdrawAmount(id, amount) {
  const { data } = await api.post(`/api/accounts/${id}/withdraw`, amount, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

// DELETE /api/accounts/{id}
export async function deleteAccountById(id) {
  const { data } = await api.delete(`/api/accounts/${id}`)
  return data
}
