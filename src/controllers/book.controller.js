const express = require('express');
const router = express.Router();
const BookCommand = require('../commands/book.command')
const config = require('config');

router.get('/', async(req, res) => {
    const bookCommand = new BookCommand();
    try {
        const result = await bookCommand.getAllBooks();

        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.get('/:id', async(req, res) => {
    const bookCommand = new BookCommand();
    const bookId = req.params.id;
    try {
        const result = await bookCommand.getBook(bookId);

        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post('/', async(req, res) => {
    const bookCommand = new BookCommand();
    const book = req.body;
    try {
        if (!bookCommand.isValidBook(book)) {
            res.status(404).json({ error: config.get("errorMessages.BAD_REQUEST") });
        }

        const result = await bookCommand.createBook(book);

        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.put('/:id', async(req, res) => {
    const bookCommand = new BookCommand();
    const bookId = req.params.id;
    const editedBook = req.body;
    try {
        if (!bookCommand.isValidBook(editedBook)) {
            res.status(404).json({ error: config.get("errorMessages.BAD_REQUEST") });
        }

        const result = await bookCommand.updateBook(bookId, editedBook);

        res.json({
            result: result
        })
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.delete('/:id', async(req, res) => {
    const bookCommand = new BookCommand();
    const bookId = req.params.id;
    try {
        const result = await bookCommand.deleteBook(bookId);

        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;