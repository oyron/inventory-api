const express = require('express');
const router = express.Router();
const logger = require("./logger");
const Library = require("./library");
const verifyToken = require('./auth/verifyToken');

router.all('*', logRequest);
router.get('/books', verifyToken, getBooks);
router.post('/books', verifyToken, addBook);
router.get('/books/:id', verifyToken, getBook);
router.put('/books/:id', verifyToken, updateBook);
router.delete('/books/:id', verifyToken, deleteBook);
router.use(unknownRouteHandler);
router.use(errorHandler);

const library = new Library();

function getBooks(_req, res) {
    res.send(library.getAllBooks());
}

function getBook(req, res) {
    const bookId =req.params.id;
    if (library.hasBookId(bookId)) {
        res.send(library.getBook(bookId));
    }
    else {
        res.status(404).send(`Book with id ${bookId} not found`);
    }
}

function addBook(req, res) {
    const bookData = req.body;
    const book = library.addBook(bookData.title, bookData.author);
    res.location(`/api/books/${book.id}`);
    res.status(201).send(book);
}

function updateBook(req, res) {
    const bookId = req.params.id;
    if (library.hasBookId(bookId)) {
        const bookData = req.body;
        const book = library.updateBook(bookId, bookData.title, bookData.author);
        res.send(book);
    }
    else {
        res.status(404).send(`Book with id ${bookId} not found`);
    }
}

function deleteBook(req, res) {
    const bookId = req.params.id;
    if (library.hasBookId(bookId)) {
        library.deleteBook(bookId);
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

module.exports = router;