    const cloudinary = require('cloudinary').v2;
    const multer = require('multer');

    cloudinary.config({
        cloud_name:'dturncvxv',
        api_key:'467984999236351',
        api_secret:'2rtrEo0YjbAHx801G6yhntPCoJM',
        
    })
    const storage = new multer.memoryStorage();
    async function ImageUploadUtil(file){
        const result = await cloudinary.uploader.upload(file,{
            resource_type:'auto',
        })
        return result;
    }
    const upload = multer({storage});
    module.exports = {upload,ImageUploadUtil}