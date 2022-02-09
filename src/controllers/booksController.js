const booksModel = require('../models/booksModel');

const save = (request, response) => {
    // getting the request values
    const { 
        title, 
        description, 
        author, 
        category 
    } = request.body;
    
    // and uploaded img path
    const { path }  = request.file;

    // saving book
    const book = {
        title, 
        description,
        author,
        imgPath: path,
        category
    }

    console.log("save request: ", book);

    booksModel.save(book);

    return response.status(201).json();
}

module.exports = {
    save
};