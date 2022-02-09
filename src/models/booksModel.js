const connect = require('./connect');

const save = async (book) => {
    try {
        const conn = await connect();
    
        // preparing query
        const query  = 'INSERT INTO books(title, description, author, img_path, category) VALUES (?,?,?,?,?);';
        const values = [
            book.title,
            book.description,
            book.author? book.author : 'unknown',
            book.imgPath? book.imgPath : 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80',
            book.category? book.category : 'uncategorized'
        ]

        return await conn.query(query, values);
    
    } catch (err) {
        console.log(err)
        throw "Error on saving book";
    }
}


module.exports = {
    save
}