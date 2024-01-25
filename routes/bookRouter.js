import { Router } from "express";

// Authentication middleware
import authenticateJWT from "../middleware/auth.js";

// controllers
import { addBook, getAllBooks, searchByISBN, updateBook } from "../controllers/book.js";

const bookRouter = Router();

bookRouter.get('/', getAllBooks)
bookRouter.post('/addbook', authenticateJWT, addBook)
bookRouter.get('/:ISBN', searchByISBN)
bookRouter.patch('/update/:ISBN', authenticateJWT, updateBook)

export default bookRouter;