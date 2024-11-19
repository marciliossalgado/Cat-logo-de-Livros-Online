
let books = [];

function displayBooks(filteredBooks = books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (filteredBooks.length === 0) {
        bookList.innerHTML = '<li>Nenhum livro encontrado.</li>';
        return;
    }

    filteredBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} por ${book.author} (${book.year}) - Gênero: ${book.genre} - Avaliação: ${book.rating}`;
        bookList.appendChild(li);
    });
}

document.getElementById('addBookForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = parseInt(document.getElementById('year').value);
    const rating = parseFloat(document.getElementById('rating').value);

    const newBook = { title, author, genre, year, rating };
    books.push(newBook);

    saveBooksToJSON();

    displayBooks();
    this.reset();
});

document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

function loadBooksFromJSON() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
    displayBooks();
}

function saveBooksToJSON() {
    localStorage.setItem('books', JSON.stringify(books));
}

loadBooksFromJSON();
