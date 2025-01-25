const { ImageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../model/Product");

const handleImageUpload = async (req,res) =>{
    try {
       const b64 = Buffer.from(req.file.buffer).toString('base64');
       const url = "data:" + req.file.mimetype + ";base64," +b64;
       const result = await ImageUploadUtil(url) ;
       res.json({
        succes:true,
        result,
       })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            succes :false,
            message:"Error"
        })
    }
}
// add product 
const addProduct = async (req,res) =>{
  try {
    const {image,title,description,category,brand,price,salePrice,totalStock}  = req.body;
    const newProduct = new Product({
        image,title,description,category,brand,price,salePrice,totalStock
    })
    await newProduct.save();
    res.status(201).json({
        succes:true,
        data : newProduct,
    })
  } catch (error) {
    console.log(error)
        res.status(500).json({
            succes :false,
            message:"Error"
        })
  }
}
//get all product 
const getAllProduct = async (req,res) =>{
    try {
     const listProduct  = await Product.find({});
     res.status(200).json({
        succes:true,
        data:listProduct,
     })
    } catch (error) {
      console.log(error)
          res.status(500).json({
              succes :false,
              message:"Error"
          })
    }
}
//edit product 
const editProduct = async (req,res) =>{
    
    try {
        const {id} = req.params;
        const {image,title,description,category,brand,price,salePrice,totalStock}  = req.body;
        const findproduct = await Product.findById(id);
        if(!findproduct) return res.status(404).json({
             succes :false,
           message:"Product not found"
        });
        findproduct.title = title || findproduct.title
        findproduct.description = description || findproduct.description
        findproduct.category = category || findproduct.category
        findproduct.brand = brand || findproduct.brand
        findproduct.price = price || findproduct.price
        findproduct.salePrice = salePrice || findproduct.salePrice
        findproduct.totalStock = totalStock || findproduct.totalStock
        findproduct.totimagealStock = image || findproduct.image
        await findproduct.save();
        res.status(200).json({
            sucess:true,
            data:findproduct,
        })
    } catch (error) {
      console.log(error)
          res.status(500).json({
              succes :false,
              message:"Error"
          })
    }
}
//delete product
const deleteProduct = (req,res) =>{
    try {
    const {id} = req.params;
    const product = Product.findByIdAndUpdate(id);
    if(!product) return res.status(404).json({
        succes :false,
      message:"Product not found"
   });
   res.status(200).json({
    sucess:true,
   message:'Delete success'
   })
    } catch (error) {
      console.log(error)
          res.status(500).json({
              succes :false,
              message:"Error"
          })
    } 
}
module.exports = {handleImageUpload,getAllProduct,addProduct,editProduct,deleteProduct}