import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    },
    userID: {
        type: Number,
        required: true
    
    }    
},
    {
        TimeStamps: true
    });