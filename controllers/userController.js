import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

// @desc GET current user profile
// @route GET /api/user/profile
const getProfile = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.user.id)
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
// @route PATCH /api/user/profile
const updateProfile = asyncHandler(async (req, res, next) => {
    try {
        const updates = req.body;

/*      RHIS DOES NOT TRIGGER pre('save') AND PASSWORD IS SAVED AS A PLAIN TEXT
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            {new:true , runValidators: true}
        )*/
        
        const user = await User.findById(req.user.id);

        Object.assign(user, updates);

        await user.save(); // triggers pre('save')
        
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
// @route DELETE /api/user/profile
const deleteProfile = asyncHandler(async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user.id);
         
        res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
        
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