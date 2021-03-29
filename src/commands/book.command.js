const { Book } = require('../models/databaseConnector');

class BookCommand {
    constructor() {

    }
    async getAllBooks() {
        const allBooks = await Book.findAll();

        return { allBooks: allBooks }
    }
    async getBook(id) {
        const book = await Book.findOne({ where: { id } });

        return { book: book }
    }

    isValidBook(book) {
        return book && book.title && book.author ? true : false;
    }

    async createBook(book) {
        const bookBuilt = await Book.build({ "title": book.title, "author": book.author, "summary": book.summary });
        await bookBuilt.save();
        await bookBuilt.reload();

        return {
            book: bookBuilt
        }
    }

    async deleteBook(id) {
        try {
            const foundBook = await this.getBook(id);

            if (!foundBook.book) return { message: `Book with ID: ${id} not found in DB` }

            await Book.destroy({ where: { id } });

            return { message: "Book deleted successfully" }
        } catch (error) {
            return { message: "error" + e }
        }
    }

    async updateBook(id, book) {
        try {
            const foundBook = await this.getBook(id);

            if (!foundBook.book) return { message: `Book with ID: ${id} not found in DB` }

            await Book.update(book, { where: { id } })

            await foundBook.book.reload();

            return { book: foundBook.book }
        } catch (error) {
            return { message: "error" + error }
        }
    }

}

module.exports = BookCommand;