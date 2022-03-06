const connect = require('./connect');

const getAll = async () => {
    try {
        const conn = await connect();

        const query = 'SELECT id, title, description, author, imgPath FROM books';

        const [result] = await conn.query(query);
        return result;
    
    } catch (error) {
        console.log(error);
        throw "Error on getting book";
    }
}

const getById = async (id) => {
    try {
        const conn = await connect();

        const query = 'SELECT id, title, description, author, imgPath FROM books WHERE id = ?';

        const [result] = await conn.query(query, id);
        return result;
    
    }   catch (error) {
        console.log(error);
        throw "Error on getting book";
    }
}

const save = async (book) => {
    try {
        const conn = await connect();
    
        // preparing query
        const query  = 'INSERT INTO books(title, description, author, imgPath) VALUES (?,?,?,?);';
        const values = [
            book.title,
            book.description,
            book.author,
            book.imgPath? book.imgPath : null,            
        ]

        return await conn.query(query, values);
    
    } catch (error) {
        console.log(error);
        throw "Error on saving book";
    }
}

const update = async (book) => {
    try {
        const conn = await connect();
    
        // preparing query
        const query  = 'UPDATE books set title = ?, description = ?, author = ?, imgPath = ?  WHERE id = ?';
        const values = [
            book.title,
            book.description,
            book.author,
            book.imgPath? book.imgPath : null,            
            book.id,
        ]

        return await conn.query(query, values);
    
    } catch (error) {
        console.log(error);
        throw "Error on saving book";
    }
}

const remove = async (id) => {
    try {
        const conn = await connect();
    
        const query = 'DELETE FROM books WHERE id = ?';
    
        const [ result ] = await conn.query(query, id);
        return result;

    }  catch (error) {
        console.log(error);
        throw "Error on deleting book";
    }
}


module.exports = {
    getAll,
    getById,
    update,
    save,
    remove,
}