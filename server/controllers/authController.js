const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req,res)=>{
    const {name,email,password} = req.body ;
    try{
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({
            msg:"User already exists"
        })
        const hashPwd = await bcrypt.hash(password,10);
        const newUser = new User({name:name, email:email, password:hashPwd})
         await newUser.save();

        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET)
        res.json({
            token, user: {name:newUser.name , email:newUser.email}
        })

    } catch(err){
        res.status(500)
        .json({
            msg:"Error registering user",
            error:err.message
        })
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User Not Found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error Logging in" });
    }
};
