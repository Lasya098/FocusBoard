import { MoreHorizontal, Pencil, Trash2, CalendarDays, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
export default function TaskRow({ task, onEdit, onDelete, onStatus }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <article className={`task-row ${task.status === 'Completed' ? 'task-done' : ''}`}>
    <span className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`} aria-hidden="true">{task.status === 'Completed' && <CheckCircle2 size={15}/>}</span>
    <div className="task-main"><strong>{task.title}</strong><small>{task.description || 'No description added'}</small></div>
    <span className={`category-tag ${task.category.toLowerCase().replace(/\s+/g,'-')}`}>{task.category}</span>
    <span className={`priority-pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
    <label className="status-select-label"><span className="sr-only">Status for {task.title}</span><select className={`status-select ${task.status.toLowerCase().replace(/\s+/g,'-')}`} value={task.status} onChange={e => onStatus(task.id, e.target.value)}><option>To do</option><option>In progress</option><option>Completed</option></select></label>
    <span className="due-date"><CalendarDays size={13}/>{task.dueDate ? new Date(`${task.dueDate}T12:00:00`).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : 'No date'}</span>
    <div className="task-menu-wrap"><button className="icon-button task-more" aria-label={`Actions for ${task.title}`} onClick={() => setMenuOpen(v => !v)}><MoreHorizontal size={18}/></button>
      {menuOpen && <div className="task-menu"><button onClick={() => {onEdit(task);setMenuOpen(false)}}><Pencil size={14}/> Edit</button><button className="delete-action" onClick={() => {onDelete(task);setMenuOpen(false)}}><Trash2 size={14}/> Delete</button></div>}
    </div>
  </article>
}
