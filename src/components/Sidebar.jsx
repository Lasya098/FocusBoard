import { LayoutDashboard, ListTodo, CalendarDays, Settings, X } from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My tasks', icon: ListTodo },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Settings', icon: Settings }
]

export default function Sidebar({ active, onSelect, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-mark"><LayoutDashboard size={18} /></span><span>FocusBoard</span>
        <button className="sidebar-close icon-button" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={18}/></button>
      </div>
      <p className="nav-caption">WORKSPACE</p>
      <nav aria-label="Main navigation">
        {navItems.map(({label, icon: Icon}) => <button key={label} className={`nav-link ${active === label ? 'active' : ''}`} onClick={() => { onSelect(label); setMobileOpen(false) }}>
          <Icon size={17} strokeWidth={1.8}/><span>{label}</span>
        </button>)}
      </nav>
      <div className="sidebar-bottom"><div className="mini-avatar">L</div><div><strong>My workspace</strong><small>Personal account</small></div></div>
    </aside>
  </>
}
