const TaskFilter = ({ filters, onFilterChange }) => {    
  const handleChange = (key, value) => {    
    onFilterChange(prev => ({ ...prev, [key]: value }));    
  };    
     
  const clearFilters = () => {    
    onFilterChange({ status: 'all', priority: 'all' });    
  };    
     
  const hasActiveFilters = filters.status !== 'all' || filters.priority !== 'all';    
     
  return (    
    <div className="flex flex-wrap gap-3 items-center bg-zinc-900/50 p-2 rounded-xl border border-zinc-800/80">    
      <select    
        value={filters.status}    
        onChange={(e) => handleChange('status', e.target.value)}    
        className="bg-zinc-800 text-zinc-200 rounded-lg px-3.5 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-zinc-700 cursor-pointer appearance-none min-w-[130px]"    
      >    
        <option value="all">All Status</option>    
        <option value="pending">Pending</option>    
        <option value="completed">Completed</option>    
      </select>    
     
      <select    
        value={filters.priority}    
        onChange={(e) => handleChange('priority', e.target.value)}    
        className="bg-zinc-800 text-zinc-200 rounded-lg px-3.5 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-zinc-700 cursor-pointer appearance-none min-w-[130px]"    
      >    
        <option value="all">All Priority</option>    
        <option value="low">Low</option>    
        <option value="medium">Medium</option>    
        <option value="high">High</option>    
        <option value="critical">Critical</option>    
      </select>    
     
      {hasActiveFilters && (    
        <button    
          onClick={clearFilters}    
          className="text-zinc-400 hover:text-zinc-200 text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-zinc-800"    
        >    
          Clear Filters    
        </button>    
      )}    
    </div>    
  );    
};    
     
export default TaskFilter;
