const express = require('express');    
    const router = express.Router();    
    const { protect } = require('../middleware/authMiddleware');    
    const { 
        getTasks, createTask, updateTask, deleteTask, toggleComplete, getStats    
    } = require('../controllers/taskController');    
    const { taskValidation } = require('../middleware/validationMiddleware');


router.get('/stats', protect, getStats);    

router.route('/')    
      .get(protect, getTasks)    
      .post(protect, taskValidation, createTask);    
         
router.route('/:id')    
      .put(protect, taskValidation, updateTask)    
      .delete(protect, deleteTask);    
     
router.patch('/:id/complete', protect, toggleComplete);    
     
module.exports = router;    
