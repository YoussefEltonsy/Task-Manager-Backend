import { getAllTasks, updateTask, addTask, deleteTask, getTask } from "../controllers/taskController.js";
import express from 'express'

const router = express.Router();

router.get('/tasks', getAllTasks)
router.patch('/tasks/:id', updateTask)
router.post('/tasks', addTask)
router.delete('/tasks/:id',deleteTask)
router.get('/tasks/:id',getTask)

export default router