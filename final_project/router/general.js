const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body; // Get the username and password

  // Check if the username or password is empty
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if there is a duplicate username
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists." });
  }

  // Regisration of the new
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn; // Get the params isbn

  if (books[isbn]) {
    res.status(200).json(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const authorName = req.params.author; // Get the params author
  const matchingBooks = [];

  // Iterate through the books
  for (let key in books) {
    if (books[key].author === authorName) {
      matchingBooks.push(books[key]);
    }
  }

  if (matchingBooks.length > 0) {
    res.status(200).json(
      matchingBooks
    );
  } else {
    res.status(404).json({ message: "No books found by this author" });
  }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title; // Get the params title
  const matchingBooks = [];

  // Iterate through the books
  for (let key in books) {
    if (books[key].title === title) {
      matchingBooks.push(books[key]);
    }
  }

  if (matchingBooks.length > 0) {
    res.status(200).json(
      matchingBooks
    );
  } else {
    res.status(404).json({ message: "No books found by this title" });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn; // Get ISBN from URL

  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews); // Return reviews of the book
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
