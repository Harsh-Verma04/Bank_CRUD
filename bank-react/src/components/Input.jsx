export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <input className="input" {...props} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
