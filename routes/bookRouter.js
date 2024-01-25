import { Router } from "express";

// Authentication middleware
import authenticateJWT from "../middleware/auth.js";

// controllers
import { addBook, getAllBooks } from "../controllers/book.js";

const bookRouter = Router();

bookRouter.get('/', getAllBooks)
bookRouter.post('/addbook', authenticateJWT, addBook)

export default bookRouter;