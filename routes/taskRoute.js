import { getAllTasks, updateTask, addTask, deleteTask } from "../controllers/taskController.js";
import express from 'express'

const router = express.Router();

router.get('/tasks', getAllTasks)
router.put('/tasks/:id', updateTask)
router.post('/tasks', addTask)
router.delete('/tasks/:id',deleteTask)

export default router