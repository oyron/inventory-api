process.env.LOG_LEVEL = "error";
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);


describe('/GET api/books', () => {
    it('should GET all the books', (done) => {
        chai.request(server)
            .get('/api/books')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});


describe('/GET api/books/{id}', () => {
    it('should be possible to GET a book by id', (done) => {
        chai.request(server)
            .get('/api/books/0')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                const book = res.body;
                expect(book.id).to.be.a("number");
                expect(book.author).to.be.a("string");
                expect(book.title).to.be.a("string");
                done();
            });
    });

    it('should return 404 if book id is not found', (done) => {
        chai.request(server)
            .get('/api/books/99')
            .end((err, res) => {
                verify404(err, res);
                done();
            });
    });
});


describe('/POST api/books', () => {
    it('should be possible to add a book', (done) => {
        const author = "Eldar Sætre";
        const title  = "The Statoil Book";

        chai.request(server)
            .post('/api/books')
            .send({author, title})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                const book = res.body;
                expect(book.id).to.be.a("number");
                expect(book.author).to.equal(author);
                expect(book.title).to.equal(title);
                done();
            });
    });
});


describe('/PUT api/books/{id}', () => {
    it('should be possible to update a book by id', (done) => {
        const bookId = 1;
        const author = "Eldar Sætre";
        const title  = "The Statoil Book";

        chai.request(server)
            .put(`/api/books/${bookId}`)
            .send({author, title})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                const book = res.body;
                expect(book.id).to.equal(bookId);
                expect(book.author).to.equal(author);
                expect(book.title).to.equal(title);
                done();
            });
    });

    it('should return 404 if book id is not found', (done) => {
        chai.request(server)
            .put('/api/books/99')
            .send({author: "Eldar Sætre", title: "The Statoil Book"})
            .end((err, res) => {
                verify404(err, res);
                done();
            });
    });

    it('should return 400 if book id is not provided', (done) => {
        chai.request(server)
            .put('/api/books/')
            .end((err, res) => {
                verify400(err, res);
                done();
            });
    });
});


describe('/DELETE api/books/{id}', () => {
    it('should be possible to delete a book by id', (done) => {

        chai.request(server)
            .delete('/api/books/1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(204);
                expect(res.body).to.be.empty;
                done();
            });
    });

    it('should return 404 if book id is not found', (done) => {
        chai.request(server)
            .delete('/api/books/99')
            .end((err, res) => {
                verify404(err, res);
                done();
            });
    });

    it('should return 400 if book id is not provided', (done) => {
        chai.request(server)
            .delete('/api/books/')
            .end((err, res) => {
                verify400(err, res);
                done();
            });
    });
});


function verify404(err, res) {
    expect(err).to.be.null;
    expect(res).to.have.status(404);
}


function verify400(err, res) {
    expect(err).to.be.null;
    expect(res).to.have.status(400);
}