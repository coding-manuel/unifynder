const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.cloud_Name,
    api_key: process.env.cloud_APIKEY,
    api_secret:process.env.cloud_APISECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'unifynder',
        allowedFormats: ['jpeg', 'png', 'jpg','pdf']
    }
});

module.exports = {
    cloudinary,
    storage
}