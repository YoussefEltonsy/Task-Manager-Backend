import asyncHandler from 'express-async-handler'

const getAllTasks = asyncHandler(async (req, res) => {
    res.status(200).json({msg:'Get all tasks'})
})

const addTask = asyncHandler(async (req, res) => {
    res.status(200).json({msg: 'task added'})
})

const updateTask = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: 'task updated'})
})
const deleteTask = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: 'task deleted'})
})
export {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask
}