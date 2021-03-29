const express = require('express');
const router = express.Router();
const BookDictionary = require('../commands/bookDictionary.command')

router.get('/', async(req, res) => {
    const bookDictionary = new BookDictionary();
    try {
        const result = await bookDictionary.getAllBooks();
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.get('/:bookId', async(req, res) => {
    const bookDictionary = new BookDictionary();
    const id = req.params.bookId;
    try {
        const result = await bookDictionary.getBook(id);
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;