const multer = require('multer');
const date = require('date-and-time');

const storage = (folderPath) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath);
    },

    filename: (req, file, cb) => {
        const dateObj = new Date();
        const now = date.format(dateObj, 'YYYYMMDDHHmmss');
        cb(null, `${now}_${file.originalname}`);
    }
});

const uploadImage = {
    moviePoster: () => {
        const upload = multer({ storage: storage('./public/images/poster') });
        return upload.single('poster');
    },

    userAvatar: () => {
        const upload = multer({ storage: storage('./public/images/avatar') });
        return upload.single('avatar');
    }
};

module.exports = uploadImage;