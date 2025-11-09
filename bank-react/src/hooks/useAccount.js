import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getAccountById, depositAmount, withdrawAmount } from '../api/accounts'
import { getErrorMessage } from '../api/client'

export function useAccount(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAccount = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const res = await getAccountById(id)
      setData(res)
    } catch (e) {
      const msg = getErrorMessage(e)
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchAccount()
  }, [fetchAccount])

  const deposit = async (amount) => {
    try {
      await depositAmount(id, amount)
      toast.success('Deposit successful')
      await fetchAccount()
    } catch (e) {
      toast.error(getErrorMessage(e))
    }
  }

  const withdraw = async (amount) => {
    try {
      await withdrawAmount(id, amount)
      toast.success('Withdrawal successful')
      await fetchAccount()
    } catch (e) {
      toast.error(getErrorMessage(e))
    }
  }

  return { data, loading, error, refetch: fetchAccount, deposit, withdraw }
}
