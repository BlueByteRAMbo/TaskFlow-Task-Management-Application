import { useState, useEffect } from 'react';    
     
const TaskForm = ({ taskToEdit, onSubmit, onClose }) => {    
  const [formData, setFormData] = useState({    
    title: '',    
    description: '',    
    priority: 'medium',    
    dueDate: '',    
  });    
     
  // checking if we're editing an existing task, if so, fill the form with its current data
  useEffect(() => {    
    if (taskToEdit) {    
      setFormData({    
        title: taskToEdit.title || '',    
        description: taskToEdit.description || '',    
        priority: taskToEdit.priority || 'medium',    
        dueDate: taskToEdit.dueDate    
          ? new Date(taskToEdit.dueDate).toISOString().split('T')[0]    
          : '',    
      });    
    }    
  }, [taskToEdit]);    
     
  const handleChange = (e) => {    
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));    
  };    
     
  const handleSubmit = (e) => {    
    e.preventDefault();    
    if (!formData.title.trim()) return;    
     
    const data = {    
      title: formData.title.trim(),    
      description: formData.description.trim(),    
      priority: formData.priority,    
    };    
    if (formData.dueDate) {    
      data.dueDate = formData.dueDate;    
    }    
     
    onSubmit(data);    
  };    
     
  return (    
    // this div covers the whole screen behind the modal
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">    
      <div className="bg-zinc-900 rounded-2xl w-full max-w-md border border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">    
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">    
          <h2 className="text-zinc-100 font-bold text-xl tracking-tight">    
            {taskToEdit ? 'Edit Task' : 'New Task'}    
          </h2>    
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-md hover:bg-zinc-800">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>    
        </div>    
     
        <form onSubmit={handleSubmit} className="p-6 space-y-5">    
          <div>    
            <label className="block text-sm font-medium text-zinc-400 mb-2">    
              Title <span className="text-rose-500">*</span>    
            </label>    
            <input    
              type="text"    
              name="title"    
              value={formData.title}    
              onChange={handleChange}    
              required    
              maxLength={200}    
              className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors placeholder:text-zinc-600"    
              placeholder="What needs to be done?"    
            />    
          </div>    
     
          <div>    
            <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>    
            <textarea    
              name="description"    
              value={formData.description}    
              onChange={handleChange}    
              rows={3}    
              maxLength={1000}    
              className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors resize-none placeholder:text-zinc-600"    
              placeholder="Optional details..."    
            />    
          </div>    
     
          <div className="grid grid-cols-2 gap-4">    
            <div>    
              <label className="block text-sm font-medium text-zinc-400 mb-2">Priority</label>    
              <select    
                name="priority"    
                value={formData.priority}    
                onChange={handleChange}    
                className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors appearance-none"    
              >    
                <option value="low">Low</option>    
                <option value="medium">Medium</option>    
                <option value="high">High</option>    
                <option value="critical">Critical</option>    
              </select>    
            </div>    
     
            <div>    
              <label className="block text-sm font-medium text-zinc-400 mb-2">Due Date</label>    
              <input    
                type="date"    
                name="dueDate"    
                value={formData.dueDate}    
                onChange={handleChange}    
                className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors [color-scheme:dark]"    
              />    
            </div>    
          </div>    
     
          <div className="flex gap-3 pt-4">    
            <button    
              type="button"    
              onClick={onClose}    
              className="flex-1 border border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 py-3 rounded-xl font-medium transition-all active:scale-[0.98]"    
            >    
              Cancel    
            </button>    
            <button    
              type="submit"    
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-medium transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(5,150,105,0.2)]"    
            >    
              {taskToEdit ? 'Save Changes' : 'Create Task'}    
            </button>    
          </div>    
        </form>    
      </div>    
    </div>    
  );    
};    
     
export default TaskForm;
