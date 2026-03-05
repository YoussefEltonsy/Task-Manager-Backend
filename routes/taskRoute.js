import { getAllTasks, updateTask, addTask, deleteTask, getTask } from "../controllers/taskController.js";
import express from 'express'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/tasks',protect, getAllTasks)
router.patch('/tasks/:id',protect, updateTask)
router.post('/tasks',protect, addTask)
router.delete('/tasks/:id',protect,deleteTask)
router.get('/tasks/:id',protect,getTask)

export default router