const express =require('express')
const taskController=require('../controllers/taskController')

const router = express.Router();

// routes
router.get('/create/database',taskController.createDB)
router.get('/create/table',taskController.createTable)
router.post('/create/task',taskController.createTask)
router.get('/get/tasks',taskController.getTasks)
router.get('/get/editTask/:id',taskController.getEditTasks)
router.delete('/deleteTask/:id',taskController.deleteTasks) 
router.get('/get/task/:id',taskController.getOneTask) 
router.put('/updateTask/:id',taskController.updateTask) 

module.exports=router;