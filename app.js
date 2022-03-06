const express = require('express');
const cors = require('cors');
const booksRouter = require('./src/routes/booksRoutes');
require('dotenv').config();

//express config
const app = express();
app.use(cors());
app.use(express.json());

// makes uploads folder public
app.use('/uploads', express.static(__dirname + '/uploads'));

// books router
app.use('/books', booksRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`main route: localhost:${process.env.APP_PORT}/books`);
});
