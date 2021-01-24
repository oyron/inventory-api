const express = require('express');
const router = express.Router();
const logger = require("../logger");
const BookInventory = require("../bookInventory");

function api(authModule) {

    router.all('*', authModule.verifyToken);
    router.all('*', logRequest);
    router.get('/books', getBooks);
    router.post('/books', addBook);
    router.get('/books/:id', getBook);
    router.put('/books/:id', updateBook);
    router.delete('/books/:id', deleteBook);
    router.use(unknownRouteHandler);
    router.use(errorHandler);

    const bookInventory = new BookInventory();

    function getBooks(_req, res) {
        res.send(bookInventory.getAllBooks());
    }

    function getBook(req, res) {
        const bookId =req.params.id;
        if (bookInventory.hasBookId(bookId)) {
            res.send(bookInventory.getBook(bookId));
        }
        else {
            res.status(404).send(`Book with id ${bookId} not found`);
        }
    }

    function addBook(req, res) {
        const bookData = req.body;
        const book = bookInventory.addBook(bookData.title, bookData.author);
        res.location(`/api/books/${book.id}`);
        res.status(201).send(book);
    }

    function updateBook(req, res) {
        const bookId = req.params.id;
        if (bookInventory.hasBookId(bookId)) {
            const bookData = req.body;
            const book = bookInventory.updateBook(bookId, bookData.title, bookData.author);
            res.send(book);
        }
        else {
            res.status(404).send(`Book with id ${bookId} not found`);
        }
    }

    function deleteBook(req, res) {
        const bookId = req.params.id;
        if (bookInventory.hasBookId(bookId)) {
            bookInventory.deleteBook(bookId);
            res.sendStatus(204);
        }
        else {
            res.status(404).send(`Book with id ${bookId} not found`);
        }
    }

    function logRequest(req, _res, next) {
        let payloadLog = '';
        if (Object.keys(req.body).length > 0) {
            payloadLog = 'Payload: ' + JSON.stringify(req.body);
        }
        logger.debug(`${req.method} ${req.url} ${payloadLog}`);
        next();
    }

    function unknownRouteHandler(req, res)  {
        logger.warn(`Non existing API route: ${req.method} ${req.originalUrl}`);
        res.status(400).send('Bad request - non existing API route');
    }

    function errorHandler (err, _req, res, _next) {
        logger.error(err.stack);
        res.status(500).send(err.stack);
    }

    return router;

}

module.exports = api;
