import TaskRow from './TaskRow'
import { ListTodo } from 'lucide-react'
export default function TaskList({ tasks, onEdit, onDelete, onStatus }) {
  if (!tasks.length) return <div className="empty-state"><span><ListTodo size={24}/></span><strong>No tasks found</strong><p>Try changing your search or filters, or create a new task.</p></div>
  return <div className="task-list">{tasks.map(task => <TaskRow key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus}/>)}</div>
}
