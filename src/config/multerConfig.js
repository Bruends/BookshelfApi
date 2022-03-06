// multer storage config
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (request, file, cb)  => {
        cb(null, 'uploads/')
    },

    // changing the filename and adding the extension
    filename: (request, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    } 
})

const multerUpload = multer({ storage });


module.exports = {
    multerUpload
}

