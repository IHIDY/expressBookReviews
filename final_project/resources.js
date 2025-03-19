const axios = require("axios");

const getBooks = async () => {
    try {
        const response = await axios.get("http://localhost:5001/");
        console.log("Books List (Async-Await):", response.data);
    } catch (error) {
        console.error("Error fetching books:", error.message);
    }
}

const getBooksByISBN = async (isbn) => {
    try {
        const response = await axios.get(`http://localhost:5001/isbn/${isbn}`);
        console.log(`Book Details for ${isbn}:`, response.data);
    } catch (error) {
        console.error("Error fetching books By ISBN:", error.message);
    }
}

const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5001/author/${author}`);
        console.log(`Book Details for ${author}:`, response.data);
    } catch (error) {
        console.error("Error fetching books By Author:", error.message);
    }
}

const getBooksByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5001/title/${title}`);
        console.log(`Book Details for ${title}:`, response.data);
    } catch (error) {
        console.error("Error fetching books By Title:", error.message);
    }
}
