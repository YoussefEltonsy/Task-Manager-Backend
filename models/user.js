import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    TimeStamps: true
}
);

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

export default userSchema