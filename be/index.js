const express = require("express");
const mongoose = require("mongoose");
const cookieParser  = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./router/auth/auth-route')
const adminProductRouter = require('./router/admin/product')
mongoose.connect('mongodb://localhost:27017/ECommerce').then(()=> console.log("mogodb connect"))


const app = express()
const PORT = process.env.PORT || 8080;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods:[ 'GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials:true
    })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductRouter)
app.listen(PORT,()=>console.log("Server run"))