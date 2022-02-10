const express = require('express');
const cors = require('cors');
const booksRouter = require('./src/routes/booksRoutes');

const app = express();
app.use(cors());
app.use(express.json())
app.use('/books', booksRouter);
app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(3000, () => {
    console.log('main route: localhost:3000/books');
});
