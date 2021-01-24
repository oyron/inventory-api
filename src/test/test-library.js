const expect = require('chai').expect;

describe("BookInventory", function() {
    const BookInventory = require('../bookInventory');
    let bookInventory;

    beforeEach(function() {
        bookInventory = new BookInventory();
    });


    it("should be possible to list all books", function() {
        const books = bookInventory.getAllBooks();
        expect(books).to.be.an("array");
    });


    it("should be possible to get a single book, by numeric id", function() {
        const book = bookInventory.getBook(1);
        expect(book).to.be.an("object");
        expect(book.id).to.be.a("number");
        expect(book.author).to.be.a("string");
        expect(book.title).to.be.a("string")
    });


    it("should be possible to get a single book, by string id", function() {
        const book = bookInventory.getBook("1");
        expect(book).to.be.an("object");
    });


    it("should be possible to add a new book", function() {
        const title = "The Statoil Book";
        const author = "Eldar Sætre";
        const book = bookInventory.addBook(title, author);
        expect(book).to.be.an("object");
        expect(book.id).to.be.a("number");
        expect(book.author).to.equal(author);
        expect(book.title).to.equal(title);
    });


    it("should be possible to update an existing book, by numeric id", function() {
        const title = "The Statoil Book";
        const author = "Eldar Sætre";
        const bookId = 1;
        expect(bookInventory.hasBookId(bookId)).to.be.true;
        const book = bookInventory.updateBook(bookId, title, author);
        expect(book).to.be.an("object");
        expect(book.id).to.equal(bookId);
        expect(book.author).to.equal(author);
        expect(book.title).to.equal(title);
    });


    it("should be possible to update an existing book, by string id", function() {
        const title = "The Statoil Book";
        const author = "Eldar Sætre";
        const bookId = "1";
        expect(bookInventory.hasBookId(bookId)).to.be.true;
        const book = bookInventory.updateBook(bookId, title, author);
        expect(book).to.be.an("object");
        expect(book.id).to.equal(Number(bookId));
        expect(book.author).to.equal(author);
        expect(book.title).to.equal(title);
    });


    it("should be possible to delete an existing book, by numeric id", function() {
        const bookId = 1;
        expect(bookInventory.hasBookId(bookId)).to.be.true;
        bookInventory.deleteBook(bookId);
        expect(bookInventory.hasBookId(bookId)).to.be.false;
    });


    it("should be possible to delete an existing book, by string id", function() {
        const bookId = "1";
        expect(bookInventory.hasBookId(bookId)).to.be.true;
        bookInventory.deleteBook(bookId);
        expect(bookInventory.hasBookId(bookId)).to.be.false;
    });


});
