import { useMemo, useState } from 'react'
import { Plus, Search, SlidersHorizontal, ArrowUpRight, Check, CalendarDays } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import FocusNotes from './components/FocusNotes'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { sampleTasks } from './data/sampleTasks'
import { useLocalStorage } from './hooks/useLocalStorage'

const tabs = ['All tasks', 'To do', 'In progress', 'Completed']
export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('All tasks')
  const [priority, setPriority] = useState('All')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Overview')

  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === 'In progress').length
  const completed = tasks.filter(t => t.status === 'Completed').length
  const percentage = total ? Math.round(completed / total * 100) : 0
  const visibleTasks = useMemo(() => tasks.filter(task => {
    const matchesQuery = task.title.toLowerCase().includes(query.trim().toLowerCase())
    const matchesTab = tab === 'All tasks' || task.status === tab
    const matchesPriority = priority === 'All' || task.priority === priority
    return matchesQuery && matchesTab && matchesPriority
  }), [tasks, query, tab, priority])

  const openCreate = () => { setEditing(null); setFormOpen(true) }
  const openEdit = task => { setEditing(task); setFormOpen(true) }
  const saveTask = data => {
    if (editing) setTasks(current => current.map(task => task.id === editing.id ? { ...task, ...data } : task))
    else setTasks(current => [{ ...data, id: globalThis.crypto?.randomUUID?.() || `task-${Date.now()}` }, ...current])
    setFormOpen(false); setEditing(null)
  }
  const deleteTask = task => {
    if (window.confirm(`Delete “${task.title}”? This task will be permanently removed.`)) setTasks(current => current.filter(item => item.id !== task.id))
  }
  const updateStatus = (id, status) => setTasks(current => current.map(task => task.id === id ? { ...task, status } : task))

  return <div className="app-shell">
    <Sidebar active={activeNav} onSelect={setActiveNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    <main className="main-area"><Header onMenu={() => setMobileOpen(true)}/>
      <div className="page-content">
        <div className="page-heading"><div><div className="eyebrow">YOUR WORKSPACE</div><h1>Your work, in focus.</h1><p>Plan your day, stay organised, and celebrate small wins.</p></div><button className="button button-primary create-button" onClick={openCreate}><Plus size={17}/> New task</button></div>
        <FocusNotes/>
        <section className="stats-grid" aria-label="Task overview">
          <StatCard type="total" label="Total tasks" value={total} hint="Across all projects"/>
          <StatCard type="progress" label="In progress" value={inProgress} hint="Keep the momentum"/>
          <StatCard type="completed" label="Completed" value={completed} hint="Great work this week"/>
        </section>
        <section className="tasks-section">
          <div className="section-heading"><div><h2>My tasks</h2><p>Manage and track everything in one place.</p></div><button className="text-button" onClick={() => {setTab('All tasks');setPriority('All');setQuery('')}}>View all tasks <ArrowUpRight size={14}/></button></div>
          <div className="task-toolbar">
            <div className="tabs" role="tablist" aria-label="Filter tasks by status">{tabs.map(item => <button role="tab" aria-selected={tab === item} className={tab === item ? 'tab-active' : ''} key={item} onClick={() => setTab(item)}>{item}{item === 'All tasks' && <span>{total}</span>}</button>)}</div>
            <div className="toolbar-controls"><label className="search-field"><Search size={15}/><span className="sr-only">Search tasks by title</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a task..."/></label><label className="priority-filter"><SlidersHorizontal size={14}/><span className="sr-only">Filter by priority</span><select value={priority} onChange={e => setPriority(e.target.value)}><option value="All">Priority: All</option><option>High</option><option>Medium</option><option>Low</option></select></label></div>
          </div>
          <div className="task-table-header"><span>Task</span><span>Category</span><span>Priority</span><span>Status</span><span>Due date</span><span/></div>
          <TaskList tasks={visibleTasks} onEdit={openEdit} onDelete={deleteTask} onStatus={updateStatus}/>
          <div className="task-footer"><span>Showing <b>{visibleTasks.length}</b> of <b>{total}</b> tasks</span><span className="footer-progress"><Check size={13}/> {percentage}% complete</span></div>
        </section>
        <footer className="page-footer"><span>© 2026 FocusBoard</span><span>Made for focused work <span className="footer-heart">✦</span></span></footer>
      </div>
    </main>
    {formOpen && <TaskForm task={editing} onSave={saveTask} onClose={() => {setFormOpen(false);setEditing(null)}}/>}
  </div>
}
