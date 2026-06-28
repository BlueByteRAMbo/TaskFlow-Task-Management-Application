import { useState, useEffect } from 'react';    
import api from '../api/api';    
import { useAuth } from '../context/AuthContext';    
import { toast } from 'react-toastify';    
import Navbar from '../components/Navbar';    
import TaskStats from '../components/TaskStats';    
import TaskFilter from '../components/TaskFilter';    
import TaskForm from '../components/TaskForm';    
import TaskCard from '../components/TaskCard';    
     
const Dashboard = () => {    
  const { user } = useAuth();    
  const [tasks, setTasks] = useState([]);    
  const [isLoading, setIsLoading] = useState(true);    
  const [showForm, setShowForm] = useState(false);    
  const [editTask, setEditTask] = useState(null);    
  const [filters, setFilters] = useState({ status: 'all', priority: 'all' });    
     
  // gotta remember to fetch tasks again if they change the dropdowns
  useEffect(() => {    
    fetchTasks();    
  }, [filters]);    
     
  const fetchTasks = async () => {    
    setIsLoading(true);    
    try {    
      const params = {};    
      if (filters.status !== 'all') params.status = filters.status;    
      if (filters.priority !== 'all') params.priority = filters.priority;    
     
      const response = await api.get('/api/tasks', { params });    
      setTasks(response.data.tasks);    
    } catch (error) {    
      toast.error('Failed to load tasks');    
    } finally {    
      setIsLoading(false);    
    }    
  };    
     
  const handleCreateTask = async (taskData) => {    
    try {    
      const response = await api.post('/api/tasks', taskData);    
      setTasks(prev => [response.data.task, ...prev]);    
      setShowForm(false);    
      toast.success('Task created!');    
    } catch (error) {    
      toast.error(error.response?.data?.message || 'Failed to create task');    
    }    
  };    
     
  const handleUpdateTask = async (id, taskData) => {    
    try {    
      const response = await api.put(`/api/tasks/${id}`, taskData);    
      setTasks(prev => prev.map(t => t._id === id ? response.data.task : t));    
      setEditTask(null);    
      toast.success('Task updated!');    
    } catch (error) {    
      toast.error('Failed to update task');    
    }    
  };    
     
  const handleDeleteTask = async (id) => {    
    if (!window.confirm('Delete this task? This cannot be undone.')) return;    
    try {    
      await api.delete(`/api/tasks/${id}`);    
      setTasks(prev => prev.filter(t => t._id !== id));    
      toast.success('Task deleted');    
    } catch (error) {    
      toast.error('Failed to delete task');    
    }    
  };    
     
  const handleToggleComplete = async (id) => {    
    try {    
      const response = await api.patch(`/api/tasks/${id}/complete`);    
      setTasks(prev => prev.map(t => t._id === id ? response.data.task : t));    
    } catch (error) {    
      toast.error('Failed to update task status');    
    }    
  };    
     
  return (    
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 pb-20">    
      <Navbar />    
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">    
     
        {/* the 4 little stat blocks at the top */}
        <TaskStats tasks={tasks} />    
     
        {/* filter dropdowns and the add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8 bg-zinc-900/30 p-2 sm:pr-2 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">    
          <TaskFilter filters={filters} onFilterChange={setFilters} />    
          <button    
            onClick={() => setShowForm(true)}    
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(5,150,105,0.2)] active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"    
          >    
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Task    
          </button>    
        </div>    
     
        {/* popup modal for creating/editing tasks */}
        {(showForm || editTask) && (    
          <TaskForm    
            taskToEdit={editTask}    
            onSubmit={editTask    
              ? (data) => handleUpdateTask(editTask._id, data)    
              : handleCreateTask    
            }    
            onClose={() => { setShowForm(false); setEditTask(null); }}    
          />    
        )}    
     
        {/* mapping over the actual tasks here */}
        {isLoading ? (    
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
            <p>Loading tasks...</p>
          </div>    
        ) : tasks.length === 0 ? (    
          <div className="flex flex-col items-center justify-center py-24 text-zinc-400 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl border-dashed">    
            <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">📋</span>    
            </div>
            <p className="text-lg font-medium text-zinc-300">No tasks found</p>    
            <p className="text-sm mt-1 text-zinc-500 max-w-xs text-center">    
              {filters.status !== 'all' || filters.priority !== 'all'    
                ? 'Try clearing your filters to see more results.'    
                : 'You have no tasks yet. Create your first task to get started!'}    
            </p>    
          </div>    
        ) : (    
          <div className="space-y-3">    
            {tasks.map(task => (    
              <TaskCard    
                key={task._id}    
                task={task}    
                onToggle={handleToggleComplete}    
                onEdit={setEditTask}    
                onDelete={handleDeleteTask}    
              />    
            ))}    
          </div>    
        )}    
      </div>    
    </div>    
  );    
};    
     
export default Dashboard;
