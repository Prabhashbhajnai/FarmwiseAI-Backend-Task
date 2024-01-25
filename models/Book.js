import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: { type: String, min: 2, required: true },
    author: { type: String, min: 2, required: true },
    ISBN: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const Book = mongoose.model('Book', bookSchema)
export default Book