import asyncHandler from 'express-async-handler'
import Task  from '../models/tasks.js' 


// @desc Get all tasks
// @route GET /api/tasks
const getAllTasks = asyncHandler(async (req, res,next) => {
    try {
        const tasks = await Task.find({user: req.user.id})
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
})


// @desc Create task
// @route POST /api/tasks
const addTask = asyncHandler(async (req, res,next) => {
    try {
        const task = await Task.create({
            ...req.body,
            user: req.user.id
        })
        res.status(201).json(task)
    } catch (error) {
        next(error)
        
    }
})

// @desc Get a single task by id
// @route /api/users/tasks/:id
const getTask = asyncHandler(async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        })
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' })
            
        }
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
})

// @desc update a task
// @route PATCH /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
        }, {
            title: req.body.title,
            description: req.body.description,
            completed:req.body.completed
        },
            { new: true })
        if (!task) {
            return res.status(404).json({msg: 'Task not found'})
        }

        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
})


// @desc Delete a task
// @route /api/user/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.body.id
        })
        if (!task) {
           res.status(404).json({msg: 'Task not found'})
        }
        
        res.status(200).json({ msg: 'task deleted successfully' })
    } catch (error) {
        next(error)
    }
})
export {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    getTask
}