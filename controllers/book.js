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
        const { ISBN } = req.params;

        const book = await Book.findOne({ ISBN: ISBN })

        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' })
        
        return res.status(200).json({ success: true, result: book })
    } catch (error) {
        console.log(error);
    }
}