const express = require('express');
const cors = require('cors');
const booksRouter = require('./src/routes/booksRoutes');

const app = express();
app.use(cors());
app.use('/books', booksRouter);

app.listen(3000, () => {
    console.log('upload route: localhost:3000/');
});
