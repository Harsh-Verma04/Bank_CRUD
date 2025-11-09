import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getAccounts, createAccount, deleteAccountById } from '../api/accounts'
import { getErrorMessage } from '../api/client'

export function useAccounts() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAccounts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getAccounts()
      setData(res)
    } catch (e) {
      const msg = getErrorMessage(e)
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  const addAccount = async (payload) => {
    try {
      const res = await createAccount(payload)
      toast.success('Account created')
      await fetchAccounts()
      return res
    } catch (e) {
      const msg = getErrorMessage(e)
      toast.error(msg)
      throw e
    }
  }

  const removeAccount = async (id) => {
    try {
      await deleteAccountById(id)
      toast.success('Account deleted')
      await fetchAccounts()
    } catch (e) {
      toast.error(getErrorMessage(e))
    }
  }

  return { data, loading, error, refetch: fetchAccounts, addAccount, removeAccount }
}
