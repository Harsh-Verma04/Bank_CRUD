import { motion } from 'framer-motion'
import Button from './Button'
import { Link } from 'react-router-dom'

export default function AccountCard({ account, onDeposit, onWithdraw, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm text-gray-400">Account #{account?.id}</div>
          <div className="mt-1 text-xl font-semibold text-white">{account?.accountHolderName ?? 'Unnamed Account'}</div>
          <div className="mt-2 text-[--color-primary]">Balance: ₹{Number(account?.balance ?? 0).toFixed(2)}</div>
        </div>
        <Link to={`/accounts/${account?.id}`} className="text-xs text-blue-300 hover:underline">Details</Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button onClick={onDeposit}>Deposit</Button>
        <Button variant="secondary" onClick={onWithdraw}>Withdraw</Button>
        <Button variant="danger" onClick={onDelete}>Delete</Button>
      </div>
    </motion.div>
  )
}
