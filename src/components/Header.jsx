import { Menu, ChevronDown, Bell } from 'lucide-react'
export default function Header({ onMenu }) {
  return <header className="topbar">
    <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={onMenu}><Menu size={20}/></button>
    <div className="breadcrumb"><span>Workspace</span><span className="crumb-sep">/</span><strong>Overview</strong></div>
    <div className="topbar-actions"><button className="icon-button notification" aria-label="Notifications"><Bell size={18}/><i/></button><button className="profile-button" aria-label="Profile menu"><span className="avatar">L</span><ChevronDown size={15}/></button></div>
  </header>
}
