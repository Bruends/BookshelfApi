const mysql = require('mysql2/promise');

const connect = async () => {
    // return the connection if it was already created
    if(global.connection && global.connection.state !== 'disconnected') 
        return global.connection

    // create the connection
    const user = "root";
    const port = "3306";
    const dbName = "bookshelf";
    const connectionString = `mysql:root:${user}@localhost:${port}/${dbName}`;
    const connection = await mysql.createConnection(connectionString);

    console.log('connection open');
    
    // set it to a global variable
    global.connection = connection;
    return connection;
}

module.exports = {
    connect
}