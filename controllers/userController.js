import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

// @desc GET current user profile
// @route GET /api/users/me
const getProfile = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)

        res.status(200).json({
            success: true,
            data:user
        })
        
    } catch (error) {
        next(error)
        
    }
})



// @desc update profile
// @route PATCH /api/users/me
const updateProfile = asyncHandler(async (req, res, next) => {
    try {
        const updates = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            {new:true , runValidators: true}
        )
        res.status(201).json({
            success: true,
            data: user,
            msg: 'updated profile'
        })
    } catch (error) {
        next(error)
    }
})


// @desc delete account
// @route DELETE /api/users/me
const deleteProfile = asyncHandler(async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        
        res.status(200).json({msg: 'Account delted successfully'})
    } catch (error) {
        next(error)
    }
})

export {
    getProfile,
    updateProfile,
    deleteProfile
}