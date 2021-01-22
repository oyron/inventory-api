const expect = require('chai').expect;

describe("Library", function() {
    const Library = require('../Library');
    let library;

    beforeEach(function() {
        library = new Library();
    });


    it("should be possible to list all books", function() {
        const books = library.getAllBooks();
        expect(books).to.be.an("array");
    });


    it("should be possible to get a single book, by numeric id", function() {
        const book = library.getBook(1);
        expect(book).to.be.an("object");
        expect(book.id).to.be.a("number");
        expect(book.author).to.be.a("string");
        expect(book.title).to.be.a("string")
    });


    it("should be possible to get a single book, by string id", function() {
        const book = library.getBook("1");
        expect(book).to.be.an("object");
    });


    it("should be possible to add a new book", function() {
        const title = "The Statoil Book";
        const author = "Eldar Sætre";
        const book = library.addBook(title, author);
        expect(book).to.be.an("object");
        expect(book.id).to.be.a("number");
        expect(book.author).to.equal(author);
        expect(book.title).to.equal(title);
    });


    it("should be possible to update an existing book, by numeric id", function() {
        const title = "The Statoil Book";
        const author = "Eldar Sætre";
        const bookId = 1;
        expect(library.hasBookId(bookId)).to.be.true;
        const book = library.updateBook(bookId, title, author);
        expect(book).to.be.an("object");
        expect(book.id).to.equal(bookId);
        expect(book.author).to.equal(author);
        expect(book.title).to.equal(title);
    });


    it("should be possible to update an existing book, by string id", function() {
        const title = "The Statoil Book";
        const author = "Eldar Sætre";
        const bookId = "1";
        expect(library.hasBookId(bookId)).to.be.true;
        const book = library.updateBook(bookId, title, author);
        expect(book).to.be.an("object");
        expect(book.id).to.equal(Number(bookId));
        expect(book.author).to.equal(author);
        expect(book.title).to.equal(title);
    });


    it("should be possible to delete an existing book, by numeric id", function() {
        const bookId = 1;
        expect(library.hasBookId(bookId)).to.be.true;
        library.deleteBook(bookId);
        expect(library.hasBookId(bookId)).to.be.false;
    });


    it("should be possible to delete an existing book, by string id", function() {
        const bookId = "1";
        expect(library.hasBookId(bookId)).to.be.true;
        library.deleteBook(bookId);
        expect(library.hasBookId(bookId)).to.be.false;
    });


});
