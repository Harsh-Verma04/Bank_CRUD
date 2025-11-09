import { motion } from 'framer-motion'

export default function Modal({ title, open, onClose, children, footer }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        className="relative w-full max-w-md card"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="py-4">{children}</div>
        {footer && <div className="pt-3 border-t border-white/10">{footer}</div>}
      </motion.div>
    </div>
  )
}
