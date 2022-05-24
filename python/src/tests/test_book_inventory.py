import unittest
from context import model
from model.book_inventory import BookInventory


class TestBookInventory(unittest.TestCase):



    def test_get_all_books(self):
        book_inventory = BookInventory()
        books = book_inventory.get_all_books()
        self.assertIsInstance(books, list)
    
    def test_get_book_by_string_id(self):
        book_inventory = BookInventory()
        book = book_inventory.get_book("1")
        self.assertIsNotNone(book)
        self.assertTrue(type(book['id']) == int)
        self.assertTrue(type(book['author']) == str)

    def test_get_book_by_numeric_id(self):
        book_inventory = BookInventory()
        book = book_inventory.get_book(1)
        self.assertIsNotNone(book)
        self.assertTrue(type(book['id']) == int)
        self.assertTrue(type(book['author']) == str)

    def test_add_book(self):
        title = "The Statoil Book"
        author = "Eldar Sætre"
        book_inventory = BookInventory()
        book = book_inventory.add_book(title, author)
        self.assertIsNotNone(book)
        self.assertEqual(book['title'], title)
        self.assertEqual(book['author'], author)

    def test_update_book_by_numeric_id(self):
        title = "The Statoil Book"
        author = "Eldar Sætre"
        book_id = 1
        book_inventory = BookInventory()
        book = book_inventory.update_book(book_id, title, author)
        self.assertIsNotNone(book)
        self.assertEqual(book['title'], title)
        self.assertEqual(book['author'], author)
        self.assertEqual(book['id'], book_id)

    def test_update_book_by_string_id(self):
        title = "The Statoil Book"
        author = "Eldar Sætre"
        book_id = 1
        book_inventory = BookInventory()
        book = book_inventory.update_book(str(book_id), title, author)
        self.assertIsNotNone(book)
        self.assertEqual(book['title'], title)
        self.assertEqual(book['author'], author)
        self.assertEqual(book['id'], book_id)

    def test_delete_book_by_string_id(self):
        book_id = 1
        book_inventory = BookInventory()
        self.assertTrue(book_inventory.has_book(book_id))
        book_inventory.delete_book(book_id)
        self.assertTrue(not book_inventory.has_book(book_id))

if __name__ == '__main__':
    unittest.main()