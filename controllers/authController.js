import User from "../models/user.js";
import generateToken from "../utils/jwtToken.js";



// @desc Register user
// @route POST /api/auth/register
const registerUser = asyncHandler(async (req, res,next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({msg: 'Email already in use'})
        }

        const user = await User.create({ name, email, password });

        if (user) {
            generateToken(res,user._id)
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email:user.email
            },msg: 'registered user'})
        }
        
   } catch (error) {
    next(error)
   }
})

const loginUser = asyncHandler(async (req, res,next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if(!user){
            return res.status(401).json({msg: 'invalid email or password'})
        }
        
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                msg: 'Invalid email or password'
            })
        }

        generateToken(res, user._id);

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email:user.email
        },msg: 'user logged in' })
    } catch (error) {
        next(error)
    }
})



const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    
    res.status(200).json({ msg: 'user logged out' })
})

export {
    registerUser,
    loginUser,
    logoutUser
}