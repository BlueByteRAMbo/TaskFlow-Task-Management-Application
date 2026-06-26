const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,    
            ref: 'User',            
            required: true,    
            index: true
        },
        title: {    
            type: String,    
            required: [true, 'Task title is required'],    
            trim: true,    
            maxlength: [200, 'Title cannot exceed 200 characters']    
        },    
        description: {
            type: String,    
            trim: true,    
            maxlength: [1000, 'Description cannot exceed 1000 characters'], 
            default: ""
        },
        priority: {
            type: String,    
            enum: {    
                values: ['low', 'medium', 'high', 'critical'],    
                message: '{VALUE} is not a valid priority'    
            },    
            default: 'medium'    
        },
        status: {    
            type: String,    
            enum: ['pending', 'completed'],    
            default: 'pending'    
        },    
        isCompleted: {    
            type: Boolean,    
            default: false    
        },    
        dueDate: {    
            type: Date,    
            default: null    
        },    
        completedAt: {    
            type: Date,    
            default: null    
        }   
    },
    {
        timestamps: true
    }
);

taskSchema.index({ user: 1, priority: 1 });    
taskSchema.index({ user: 1, status: 1 });    
taskSchema.index({ user: 1, dueDate: 1 });    

taskSchema.virtual('isOverdue').get(function () {    
    if (!this.dueDate || this.isCompleted) return false;    
    return new Date(this.dueDate) < new Date();    
});    

module.exports = mongoose.model('Task',taskSchema);