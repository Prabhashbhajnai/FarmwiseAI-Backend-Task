// Model
import Book from "../models/Book.js";

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()

        res.status(200).json({ success: true, result: books })
    } catch (error) {
        console.log(error);
    }
}

export const addBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body)

        return res.status(201).json({ success: true, result: newBook })
    } catch (error) {
        console.log(error);
    }
}