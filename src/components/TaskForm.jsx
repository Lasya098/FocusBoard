import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const empty = { title: '', description: '', category: 'Design', status: 'To do', priority: 'Medium', dueDate: '' }
export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  useEffect(() => { setForm(task ? { ...empty, ...task } : empty); setError('') }, [task])
  const update = (event) => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) { setError('Please enter a task title.'); return }
    if (!form.status || !form.priority || !form.dueDate) { setError('Please complete status, priority and due date.'); return }
    onSave({ ...form, title: form.title.trim(), description: form.description.trim(), category: form.category.trim() || 'General' })
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
      <div className="modal-heading"><div><h2 id="task-modal-title">{task ? 'Edit task' : 'Create new task'}</h2><p>Add your task details to stay on top of your work.</p></div><button className="icon-button" aria-label="Close form" onClick={onClose}><X size={18}/></button></div>
      <form onSubmit={submit}>
        <label>Task title <span className="required">*</span><input autoFocus name="title" value={form.title} onChange={update} placeholder="e.g. Update project page" maxLength="120" /></label>
        <label>Description<textarea name="description" value={form.description} onChange={update} placeholder="Add notes about this task..." rows="3"/></label>
        <label>Category<input name="category" value={form.category} onChange={update} placeholder="e.g. Design"/></label>
        <div className="form-two"><label>Status <span className="required">*</span><select name="status" value={form.status} onChange={update}><option>To do</option><option>In progress</option><option>Completed</option></select></label>
          <label>Priority <span className="required">*</span><select name="priority" value={form.priority} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></label></div>
        <label>Due date <span className="required">*</span><input type="date" name="dueDate" value={form.dueDate} onChange={update}/></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{task ? 'Save changes' : 'Create task'}</button></div>
      </form>
    </section>
  </div>
}
