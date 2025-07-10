const express = require('express');
const router = express.Router();


const {loginUser , registerUser} = require('../controllers/authController');
console.log("Auth routes loaded"); // Add this

router.post('/register' , registerUser);
router.post('/login', loginUser);


module.exports =router;