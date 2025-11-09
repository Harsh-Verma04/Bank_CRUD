export default function Button({ variant = 'primary', className = '', ...props }) {
  const base = variant === 'danger' ? 'btn-danger' : variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
  return <button className={`btn ${base} ${className}`} {...props} />
}
