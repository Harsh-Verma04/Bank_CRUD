import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useAccounts } from '../hooks/useAccounts'

export default function CreateAccount() {
  const { addAccount } = useAccounts()
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const initialBalance = parseFloat(balance)
    if (!name || isNaN(initialBalance) || initialBalance < 0) return
    setLoading(true)
    try {
      await addAccount({ accountHolderName: name, balance: initialBalance })
      setName('')
      setBalance('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section max-w-2xl">
      <div className="mb-6">
        <h2 className="heading">Create Account</h2>
        <p className="subtle">Add a new bank account</p>
      </div>

      <form onSubmit={submit} className="card space-y-5 p-6 md:p-8">
        <Input label="Account Holder Name" placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Initial Balance" type="number" min="0" step="0.01" placeholder="0.00" value={balance} onChange={(e) => setBalance(e.target.value)} />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
        </div>
      </form>
    </div>
  )
}
