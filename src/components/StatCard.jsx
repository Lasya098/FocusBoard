import { ClipboardList, Clock3, CheckCircle2 } from 'lucide-react'
const icons = { total: ClipboardList, progress: Clock3, completed: CheckCircle2 }
export default function StatCard({ type, label, value, hint }) {
  const Icon = icons[type]
  return <article className="stat-card"><div className={`stat-icon ${type}`}><Icon size={18}/></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{hint}</small></div></article>
}
