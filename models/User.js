import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, min: 2, max: 50, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)
export default User