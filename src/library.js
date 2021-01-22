class Library {
    constructor() {
        this.uid = 0;
        this.books = new Map();
        this.addBook('1984', 'George Orwell');
        this.addBook('War and Peace', 'Leo Tolstoy');
        this.addBook('Robinson Crusoe', 'Daniel Defoe');
    }

    getAllBooks() {
        return Array.from(this.books.values());
    }

    getBook(id) {
        return this.books.get(toNumber(id));
    }

    addBook(title, author) {
        const id = this.uid++;
        return this._addBook(id, title, author);
    }

    updateBook(id, title, author) {
        return this._addBook(toNumber(id), title, author);
    }

    deleteBook(id) {
        this.books.delete(toNumber(id));
        return true;
    }

    hasBookId(id) {
        return this.books.has(toNumber(id));
    }

    _addBook(id, title, author) {
        const book = {id, title, author};
        this.books.set(id, book);
        return book;
    }
}

function toNumber(possibleStringValue) {
    if (typeof possibleStringValue === 'number') {
        return possibleStringValue;
    }
    return Number(possibleStringValue);
}

module.exports = Library;