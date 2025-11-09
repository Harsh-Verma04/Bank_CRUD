import { useParams } from 'react-router-dom'
import { useAccount } from '../hooks/useAccount'
import { Loader } from '../components/Loader'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import { useState } from 'react'

export default function AccountDetails() {
  const { id } = useParams()
  const { data: account, loading, deposit, withdraw, refetch } = useAccount(id)
  const [mode, setMode] = useState(null)
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const close = () => { setMode(null); setAmount('') }

  const submit = async () => {
    const value = parseFloat(amount)
    if (isNaN(value) || value <= 0) return
    setSubmitting(true)
    try {
      if (mode === 'deposit') await deposit(value)
      else await withdraw(value)
      close()
    } finally {
      setSubmitting(false)
      refetch()
    }
  }

  if (loading) return <Loader />

  return (
    <div className="section max-w-3xl">
      <div className="mb-6">
        <h2 className="heading">Account Details</h2>
        <p className="subtle">ID: {id}</p>
      </div>

      <div className="grid gap-4 md:gap-6">
        <div className="card">
          <div className="text-sm text-gray-400">Account Holder</div>
          <div className="text-lg text-white">{account?.accountHolderName ?? 'Unnamed Account'}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-400">Balance</div>
          <div className="text-lg text-[--color-primary]">₹{Number(account?.balance ?? 0).toFixed(2)}</div>
        </div>
        <div className="card flex gap-2">
          <Button onClick={() => setMode('deposit')}>Deposit</Button>
          <Button variant="secondary" onClick={() => setMode('withdraw')}>Withdraw</Button>
        </div>
      </div>

      <Modal
        title={`${mode === 'deposit' ? 'Deposit' : 'Withdraw'} — Account #${id}`}
        open={!!mode}
        onClose={close}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={close}>Cancel</Button>
            <Button onClick={submit} disabled={submitting}>{submitting ? 'Processing...' : 'Confirm'}</Button>
          </div>
        }
      >
        <Input label="Amount" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Modal>
    </div>
  )
}
