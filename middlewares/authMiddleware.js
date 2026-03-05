import jwt from 'jsonwebtoken'
import User from '../models/user.js'


//@desc Protect routes  -verify jwt from cookie
const protect = async (req, res, next) => {
    try {
        console.log('trying to read cookies')
        console.log(req.cookies)
        const token = req.cookies.jwt;
        

        if (!token) {
            return res.status(401).json({msg:'Not authorized, no token'})
        }
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password")
        console.log(user)
        if (!user) {
            return res.status(401).json({
                msg: 'not authorized, user not found'
            })
        }
        console.log("user found", user)
        req.user = user;

        next()
    
    } catch (error) {
        return res.status(401).json({
            msg: 'not authoruzed, token failed'
        })
    }
}


export default protect