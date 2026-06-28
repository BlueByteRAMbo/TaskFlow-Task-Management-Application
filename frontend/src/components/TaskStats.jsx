const TaskStats = ({ tasks }) => {    
  const total = tasks.length;    
  const completed = tasks.filter(t => t.isCompleted).length;    
  const pending = total - completed;    
  const overdue = tasks.filter(t => {    
    if (!t.dueDate || t.isCompleted) return false;    
    return new Date(t.dueDate) < new Date();    
  }).length;    
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(0) : 0;    
     
  const stats = [    
    { label: 'Total Tasks', value: total, icon: '📋', color: 'text-zinc-100' },    
    { label: 'Completed', value: completed, icon: '✅', sub: `${completionRate}% rate`, color: 'text-emerald-400' },    
    { label: 'Pending', value: pending, icon: '⏳', color: 'text-amber-400' },    
    { label: 'Overdue', value: overdue, icon: '🔴', color: 'text-rose-400' },    
  ];    
     
  return (    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">    
      {stats.map((stat) => (    
        <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm hover:border-zinc-700 transition-colors group">    
          <div className="flex items-center justify-between mb-3">    
            <div className="text-xl p-2.5 bg-zinc-800/50 rounded-xl border border-zinc-700/50 group-hover:bg-zinc-800 transition-colors">{stat.icon}</div>    
            <span className={`text-3xl font-bold ${stat.color} tracking-tight drop-shadow-sm`}>{stat.value}</span>    
          </div>    
          <p className="text-zinc-400 text-sm font-medium">{stat.label}</p>    
          {stat.sub && <p className="text-zinc-500 text-xs mt-1">{stat.sub}</p>}    
        </div>    
      ))}    
    </div>    
  );    
};    
     
export default TaskStats;
