const booksModel = require('../models/booksModel');
const fs = require('fs');

const deleteImgFromBookId = async (id) => {   
    // searching book
    const book = await booksModel.getById(id);

    // book not found
    if(!book[0])
        return false;
        
    // removing book img
    fs.unlink("./"+ book[0].imgPath, (error) => {
        if(error) {    
            console.log(error);
            return false;
        }       
            
        return true;
    });
}

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
        const book = await booksModel.getById(id);
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

const update = async (request, response) => {
    try {
        // getting the request values
        const { 
            id,
            title, 
            description, 
            author, 
            category 
        } = request.body;
        
        let imgPath = null;

        // if a new image has been uploaded
        // remove the old one
        if (request.file) {
            const { path }  = request.file;  
            imgPath = path; 
            deleteImgFromBookId(id)
        }   


            
        // updating book
        const book = {
            id,
            title, 
            description,
            author,
            imgPath,
            category
        }

        booksModel.update(book);

        console.log("update request: ", book);

        return response.status(200).json({});
    } catch(error) {
        console.log(error)
        return response.status(500)
    }

}

const remove = async (request, response) => {
    const { id } = request.body;
    console.log(id)

    try {
        // deleting book and image file
        if (deleteImgFromBookId(id))
            booksModel.remove(id)
        
        response.status(200).json({});

    } catch(error) {
        console.log(error)
        return response.status(500)
    }
}

module.exports = {
    getAll,
    getById,
    save,
    update,
    remove,
};