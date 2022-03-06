const booksRouter = require('express').Router();
const booksController = require('../controllers/booksController');
const { multerUpload } =  require('../config/multerConfig');



booksRouter.get('/', (request, response) => {
    booksController.getAll(request, response);
});

booksRouter.get('/find/:id', (request, response) => {
    booksController.getById(request, response);
});

// this request can have a image
booksRouter.post('/', multerUpload.single('img'), (request, response) => {
    booksController.save(request, response);
});

// this request can have a image
booksRouter.put('/', multerUpload.single('img'), (request, response) => {
    booksController.update(request, response);
})

booksRouter.delete('/:id', (request, response) => {
    booksController.remove(request, response);
});

module.exports = booksRouter;