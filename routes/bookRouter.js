import { Router } from "express";

// controllers
import { addBook, getAllBooks } from "../controllers/book.js";

const bookRouter = Router();

bookRouter.get('/', getAllBooks)
bookRouter.post('/addbook', addBook)

export default bookRouter;