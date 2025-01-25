const express = require('express');
const { register ,login, logout, authMiddleware} = require('../../controller/auth/auth-controller');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout)
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        messag:'Authenticated user',
        user
    })
})
module.exports = router;