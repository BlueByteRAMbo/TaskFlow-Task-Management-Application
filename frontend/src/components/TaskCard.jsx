const PRIORITY_STYLES = {    
  low:      { badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',  label: 'Low' },    
  medium:   { badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20', label: 'Medium' },    
  high:     { badge: 'bg-orange-500/10 text-orange-400 border border-orange-500/20', label: 'High' },    
  critical: { badge: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',       label: 'Critical' },    
};    
     
const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {    
  const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;    
     
  const isOverdue = task.dueDate && !task.isCompleted    
    && new Date(task.dueDate) < new Date();    
     
  const formatDate = (dateStr) => {    
    if (!dateStr) return null;    
    return new Date(dateStr).toLocaleDateString('en-IN', {    
      day: 'numeric', month: 'short', year: 'numeric'    
    });    
  };    
     
  return (    
    <div className={`bg-zinc-900 rounded-xl p-5 border shadow-sm transition-all duration-200 ${    
      task.isCompleted ? 'border-zinc-800 opacity-60' : 'border-zinc-800 hover:border-zinc-700 hover:shadow-md'    
    }`}>    
      <div className="flex items-start gap-4">    
        {/* custom styled checkbox for toggling */}
        <button    
          onClick={() => onToggle(task._id)}    
          className={`mt-0.5 w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${    
            task.isCompleted    
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'    
              : 'border-zinc-600 bg-zinc-800/50 hover:border-emerald-500/70'    
          }`}    
        >    
          {task.isCompleted && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}    
        </button>    
     
        {/* main text area */}
        <div className="flex-1 min-w-0">    
          <h3 className={`font-semibold text-lg tracking-tight ${    
            task.isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100'    
          }`}>    
            {task.title}    
          </h3>    
          {task.description && (    
            <p className={`text-sm mt-1.5 line-clamp-2 ${task.isCompleted ? 'text-zinc-600' : 'text-zinc-400'}`}>{task.description}</p>    
          )}    
     
          <div className="flex flex-wrap items-center gap-2 mt-3.5">    
            {/* little colored pill for priority */}
            <span className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold ${priority.badge}`}>    
              {priority.label}    
            </span>    
     
            {/* showing if it's overdue or just normal date */}
            {task.dueDate && (    
              <span className={`text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/50 ${isOverdue ? 'text-rose-400 font-semibold border-rose-500/30 bg-rose-500/10' : 'text-zinc-400 font-medium'}`}>    
                {isOverdue ? '⚠️ Overdue: ' : '📅 '}{formatDate(task.dueDate)}    
              </span>    
            )}    
     
            {/* keeping track of when they finished it */}
            {task.isCompleted && task.completedAt && (    
              <span className="text-xs text-emerald-500 font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">    
                ✅ Completed {formatDate(task.completedAt)}    
              </span>    
            )}    
          </div>    
        </div>    
     
        {/* edit and delete buttons */}
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity">    
          <button    
            onClick={() => onEdit(task)}    
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-zinc-700"    
          >    
            Edit    
          </button>    
          <button    
            onClick={() => onDelete(task._id)}    
            className="text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"    
          >    
            Delete    
          </button>    
        </div>    
      </div>    
    </div>    
  );    
};    
     
export default TaskCard;
