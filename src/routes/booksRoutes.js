const booksRouter = require('express').Router();
const booksController = require('../controllers/booksController');
const { multerUpload } =  require('../../config');
const { response } = require('express');


booksRouter.get('/', (request, response) => {
    booksController.getAll(request, response);
});

booksRouter.get('/find', (request, response) => {
    booksController.getById(request, response);
});

// get the img field in a multipart/form-data request
booksRouter.post('/', multerUpload.single('img'), (request, response) => {
    booksController.save(request, response);
});

booksRouter.put('/', multerUpload.single('img'), (request, response) => {
    booksController.update(request, response)
})

booksRouter.delete('/', (request, response) => {
    booksController.remove(request, response);
});

module.exports = booksRouter;