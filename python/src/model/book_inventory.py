class BookInventory:

    class Book():
        def __init__(self, uid, title, author):
            self.uid = uid
            self.title = title
            self.author = author
    

    def __init__(self):
        self.uid_sequence = 0
        self.books = {}
        self.add_book('1984', 'George Orwell')
        self.add_book('War and Peace', 'Leo Tolstoy')
        self.add_book('Robinson Crusoe', 'Daniel Defoe')



    def get_all_books(self):
        return list(self.books.values())

    def get_book(self, book_id):
        return self.books.get(str(book_id))

    def add_book(self, title, author):
        uid = self.uid_sequence
        self.uid_sequence += 1
        return self._add_book(uid, title, author)

    def update_book(self, book_id, title, author):
        return self._add_book(book_id, title, author)

    def has_book(self, book_id):
        return str(book_id) in self.books

    def delete_book(self, book_id):
        self.books.pop(str(book_id))

    def _add_book(self, book_id, title, author):
        book = {'id': int(book_id), 'title': title, 'author': author}
        self.books[str(book_id)] = book
        return book

    


