import { useState } from 'react'
import { useAccounts } from '../hooks/useAccounts'
import { Loader } from '../components/Loader'
import AccountCard from '../components/AccountCard'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Button from '../components/Button'
import { depositAmount, withdrawAmount } from '../api/accounts'
import toast from 'react-hot-toast'
import { getErrorMessage } from '../api/client'

export default function Dashboard() {
  const { data: accounts, loading, refetch, removeAccount } = useAccounts()
  const [active, setActive] = useState(null)
  const [mode, setMode] = useState(null) // 'deposit' | 'withdraw'
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const openModal = (account, m) => {
    setActive(account)
    setMode(m)
  }

  const closeModal = () => {
    setActive(null)
    setMode(null)
    setAmount('')
  }

  const submit = async () => {
    if (!active || !mode) return
    const value = parseFloat(amount)
    if (isNaN(value) || value <= 0) return toast.error('Enter a valid amount')
    setSubmitting(true)
    try {
      if (mode === 'deposit') {
        await depositAmount(active.id, value)
        toast.success('Deposit successful')
      } else {
        await withdrawAmount(active.id, value)
        toast.success('Withdrawal successful')
      }
      await refetch()
      closeModal()
    } catch (e) {
      toast.error(getErrorMessage(e))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="section">
      <div className="mb-6">
        <h2 className="heading">Dashboard</h2>
        <p className="subtle">All accounts</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <div className="grid-cards">
          {accounts?.length ? (
            accounts.map((acc) => (
              <AccountCard
                key={acc.id}
                account={acc}
                onDeposit={() => openModal(acc, 'deposit')}
                onWithdraw={() => openModal(acc, 'withdraw')}
                onDelete={() => removeAccount(acc.id)}
              />
            ))
          ) : (
            <div className="text-gray-400">No accounts found.</div>
          )}
        </div>
      )}

      <Modal
        title={`${mode === 'deposit' ? 'Deposit' : 'Withdraw'} — Account #${active?.id ?? ''}`}
        open={!!active}
        onClose={closeModal}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button onClick={submit} disabled={submitting}>{submitting ? 'Processing...' : 'Confirm'}</Button>
          </div>
        }
      >
        <Input
          label="Amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </Modal>
    </div>
  )
}
