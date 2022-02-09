const booksRouter = require('express').Router();
const booksController = require('../controllers/booksController');
const { multerUpload } =  require('../../config');

// get the img field in a multipart/form-data request
booksRouter.post('/', multerUpload.single('img'), (request, response) => {
    booksController.save(request, response);
});

module.exports = booksRouter;