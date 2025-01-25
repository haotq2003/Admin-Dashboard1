const express = require('express');
const { upload } = require('../../helper/cloudinary');
const { handleImageUpload, addProduct, editProduct, deleteProduct, getAllProduct } = require('../../controller/admin/product');


const router = express.Router();
router.post('/upload-image',upload.single('my_file'),handleImageUpload)
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete:id',deleteProduct);
router.get('/get',getAllProduct);
module.exports = router;