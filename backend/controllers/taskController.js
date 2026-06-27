const Task = require('../models/Task');

//API EndPoint 3 GET /api/tasks 
const getTasks = async (req,res) => {
    try{
        const query = { user: req.user._id };
           
        if (req.query.status && req.query.status !== 'all') {    
            query.status = req.query.status;    
        }    
        if (req.query.priority && req.query.priority !== 'all') {    
            query.priority = req.query.priority;    
        }   
           
        const sortField = req.query.sortBy || 'createdAt';    
        const sortOrder = req.query.order === 'asc' ? 1 : -1;    
         
        const tasks = await Task.find(query).sort({ [sortField]: sortOrder });    

        res.json({ success: true, count: tasks.length, tasks }); 
    } catch(error){
        console.error('Get tasks error:', error);    
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch tasks' 
        });    
    }
};

//API EndPOint 4 POST /api/tasks 
const createTask = async (req, res) => {    
    try {    
        const { title, description, priority, dueDate } = req.body;    
        
        if (!title || title.trim() === '') {    
            return res.status(400).json({ 
                success: false, 
                message: 'Task title is required' 
            });    
        }    

        const taskData = {    
            user: req.user._id,  
            title: title.trim(),    
            description: description?.trim() || '',    
            priority: priority || 'medium',    
        };    

        if (dueDate) {    
            taskData.dueDate = new Date(dueDate);    
        }    

        const task = await Task.create(taskData);    
        res.status(201).json({ success: true, task });    
    } catch (error) {    
        if (error.name === 'ValidationError') {    
          const messages = Object.values(error.errors).map(e => e.message);    
          return res.status(400).json({ success: false, message: messages.join(', ') });    
        }    
        console.error('Create task error:', error);    
        res.status(500).json({ success: false, message: 'Failed to create task' });    
    }    
}; 

//API EndPoint 5 PUT /api/tasks/:id 
const updateTask = async (req, res) => {    
    try {    
        const task = await Task.findById(req.params.id);    
        
        if (!task) {    
            return res.status(404).json({ success: false, message: 'Task not found' });    
        }    

        if (task.user.toString() !== req.user._id.toString()) {    
            return res.status(403).json({ success: false, message: 'Not authorized to update this task' });    
        }    

        const { title, description, priority, dueDate, status } = req.body;    
        const updates = {};    
        if (title !== undefined) updates.title = title.trim();    
        if (description !== undefined) updates.description = description.trim();    
        if (priority !== undefined) updates.priority = priority;    
        if (dueDate !== undefined) updates.dueDate = dueDate ? new Date(dueDate) : null;    
        if (status !== undefined) {    
            updates.status = status;    
            updates.isCompleted = status === 'completed';    
            updates.completedAt = status === 'completed' ? new Date() : null;    
        }    

        const updatedTask = await Task.findByIdAndUpdate(    
            req.params.id,    
            { $set: updates },    
            { new: true, runValidators: true }    
        );    

        res.json({ success: true, task: updatedTask });    
    } catch (error) {    
        if (error.name === 'CastError') {    
            return res.status(400).json({ success: false, message: 'Invalid task ID' });    
        }    
        console.error('Update task error:', error);    
        res.status(500).json({ success: false, message: 'Failed to update task' });    
    }    
};

//API EndPoint 6    DELETE /api/tasks/:id 
const deleteTask = async (req, res) => {    
    try {    
        const task = await Task.findById(req.params.id);    
        
        if (!task) {    
            return res.status(404).json({ success: false, message: 'Task not found' });    
        }    

        if (task.user.toString() !== req.user._id.toString()) {    
            return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });    
        }    

        await task.deleteOne();    
        res.json({ success: true, message: 'Task deleted successfully' });    
    } catch (error) {    
        console.error('Delete task error:', error);    
        res.status(500).json({ success: false, message: 'Failed to delete task' });    
    }    
};

//API ENdPoint 7 PATCH /api/tasks/:id/complete 
const toggleComplete = async (req, res) => {    
    try {    
        const task = await Task.findById(req.params.id);    
        
        if (!task) {    
            return res.status(404).json({ success: false, message: 'Task not found' });    
        }    

        if (task.user.toString() !== req.user._id.toString()) {    
            return res.status(403).json({ success: false, message: 'Not authorized' });    
        }    

        task.isCompleted = !task.isCompleted;    
        task.status = task.isCompleted ? 'completed' : 'pending';    
        task.completedAt = task.isCompleted ? new Date() : null;    

        await task.save();    
        res.json({ success: true, task });    
    } catch (error) {    
        res.status(500).json({ success: false, message: 'Failed to toggle task' });    
    }    
};   

//API Endpoint 8 GET /api/tasks/stats
const getStats = async (req, res) => {    
    try {    
        const userId = req.user._id;    
        const now = new Date();    
        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);    
        
        const [total, completed, overdue, dueSoon, byPriority] = await Promise.all([    
            Task.countDocuments({ user: userId }),    
            Task.countDocuments({ user: userId, isCompleted: true }),    
            Task.countDocuments({    
                user: userId,    
                isCompleted: false,    
                dueDate: { $lt: now, $ne: null }    
            }),    
            Task.countDocuments({    
                user: userId,    
                isCompleted: false,    
                dueDate: { $gte: now, $lte: threeDaysFromNow }    
            }),    
            Task.aggregate([    
                { $match: { user: userId } },    
                { $group: { _id: '$priority', count: { $sum: 1 } } }    
            ])    
        ]);    

        const pending = total - completed;    
        const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;    

        const priorityBreakdown = { low: 0, medium: 0, high: 0, critical: 0 };    
        byPriority.forEach(item => {    
            if (item._id) priorityBreakdown[item._id] = item.count;    
        });    

        res.json({    
            success: true,    
            stats: { total, completed, pending, overdue, dueSoon, completionRate: parseFloat(completionRate), byPriority: priorityBreakdown }    
        });    
    } catch (error) {    
        console.error('Stats error:', error);    
        res.status(500).json({ success: false, message: 'Failed to fetch statistics' });    
    }    
}; 

module.exports = { getTasks, createTask, updateTask, deleteTask, toggleComplete, getStats };