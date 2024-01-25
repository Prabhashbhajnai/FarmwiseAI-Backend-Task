import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

// Microservice Routes
import userRouter from './routes/userRouter.js'
import bookRouter from './routes/bookRouter.js'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())

// middleware
app.use(express.json({limit: '10mb'}))

// Application Routes
app.use('/user', userRouter)
app.use('/book', bookRouter)

app.get('/', (req, res) => res.json({ message: 'Welcome to the server' }))

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

startServer()