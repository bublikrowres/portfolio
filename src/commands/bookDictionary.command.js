class BookDictionary {
    constructor() {

    }
    async getAllBooks() {
        let books = [];
        return { books: books }
    }
    async getBook(id) {
        return { book: id }
    }

}

module.exports = BookDictionary;