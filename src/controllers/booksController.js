const res = require('express/lib/response');
const booksModel = require('../models/booksModel');
const fs = require('fs');

const getAll = async (request, response) => {
    try {
        const books = await booksModel.getAll();
        return response.status(200).json({ books });
    } catch (error) {
        console.log(error);
        return response.status(500);
    }
} 

const getById = async (request, response) =>  {
    try {
        const { id } = request.body
        const book = await booksModel.getAll();
        return response.status(200).json({ book });
    } catch (error) {
        console.log(error);
        return response.status(500);
    }
}

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
    booksModel.save(book);

    console.log("save request: ", book);

    

    return response.status(201).json({});
}

const remove = async (request, response) => {
    const { id } = request.body;
    console.log(id)

    const book = await booksModel.getById(id)

    // book not found
    if(!book[0])
        return response.status(404).json({ msg: "book not found" });
    
    // deleting book and image file
    try {
        booksModel.remove(id);

        fs.unlink("./"+ book[0].img_path, (error) => {
            if(error) {    
                console.log(error);
                return
            }            
        });

        response.status(200).json({});

    } catch(error) {
        console.log(error)
        return response.status(500).json();
    }
}

module.exports = {
    getAll,
    getById,
    save,
    remove,
};