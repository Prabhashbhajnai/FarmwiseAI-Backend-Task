// Model
import Book from "../models/Book.js";

/* 
    Route:          /
    Description:    Get All Books
    Access:         Public
    Method :        GET
*/
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()

        res.status(200).json({ success: true, result: books })
    } catch (error) {
        console.log(error);
    }
}

/* 
    Route:          /addbook
    Description:    Add a new book
    Access:         Private
    Method :        POST
*/
export const addBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body)

        return res.status(201).json({ success: true, result: newBook })
    } catch (error) {
        console.log(error);
    }
}

/* 
    Route:          /:ISBN
    Description:    Search Book by ISBN
    Params:         ISBN
    Access:         Public
    Method :        GET
*/
export const searchByISBN = async (req, res) => {
    try {
        const { ISBN } = req.params

        const book = await Book.findOne({ ISBN: ISBN })

        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' })

        return res.status(200).json({ success: true, result: book })
    } catch (error) {
        console.log(error);
    }
}

/* 
    Route:          /update/:ISBN
    Description:    Update Book by ISBN
    Params:         ISBN
    Access:         Private
    Method :        PATCH
*/
export const updateBook = async (req, res) => {
    try {
        const { ISBN } = req.params

        const existingBook = await Book.findOne({ ISBN: ISBN })
        if (!existingBook)
            return res.status(404).json({ success: false, message: 'Book not found' })

        const updatedBook = await Book.findOneAndUpdate({ ISBN: ISBN }, req.body, { new: true })

        if (!updatedBook)
            return res.status(404).json({ success: false, message: 'Error Updating the Book, Try again later' })

        return res.status(200).json({ success: true, result: updatedBook })
    } catch (error) {
        console.log(error);
    }
}

/* 
    Route:          /delete/:ISBN
    Description:    Delete Book by ISBN
    Params:         ISBN
    Access:         Private
    Method :        DELETE
*/
export const deleteBook = async (req, res) => {
    try {
        const { ISBN } = req.params

        const deletedBook = await Book.findOneAndDelete({ ISBN: ISBN })

        if (!deletedBook)
            return res.status(404).json({ success: false, message: 'Book not found' });

        return res.status(200).json({ success: true, message: 'Book Deleted Successfully', result: deletedBook })
    } catch (error) {
        console.log(error);
    }
}