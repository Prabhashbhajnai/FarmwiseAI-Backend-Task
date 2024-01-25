import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Model
import User from "../models/User.js"

// Signup
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check length of password
        if (password.length < 6)
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })

        const emailToLower = email.toLowerCase()

        const existingUser = await User.findOne({ email: emailToLower })

        if (existingUser)
            return res.status(400).json({ success: false, message: 'User already exists' })

        const hashedPassword = await bcrypt.hash(password, 5)

        const user = await User.create({
            name,
            email: emailToLower,
            password: hashedPassword
        })

        // after user is created extracting id and photo to send back to client
        const { _id: id, photoUrl } = user

        // create token
        const token = jwt.sign(
            {
                id,
                name,
                photoUrl
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).json({ success: true, result: { id, name, email: user.email, token } })
    } catch (error) {
        console.log(error);
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const emailToLower = email.toLowerCase()
        const existingUser = await User.findOne({ email: emailToLower })

        if (!existingUser)
            return res.status(404).json({ success: false, message: 'User does not exist' })

        const correctPassword = await bcrypt.compare(password, existingUser.password)

        if (!correctPassword)
            return res.status(400).json({ success: false, message: 'Invalid credentials' })

        const { _id: id, name, photoUrl } = existingUser

        const token = jwt.sign(
            {
                id,
                name,
                photoUrl
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).json({ success: true, result: { id, name, email: User.email, token } })
    } catch (error) {
        console.log(error);
    }
}