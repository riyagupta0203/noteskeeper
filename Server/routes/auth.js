const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

JWT_SECRET = process.env.JWT_SECRET;

router.post('/createuser',[
    body('name', 'Enter a Valid name of at least 4 characters').isLength({ min: 3 }),
    body('email', 'Enter a unique email').isEmail(),
    body('password', 'Enter a password with 5 minimum characters').isLength({ min: 5 }),
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array()  });
    }

    try {
        
        let user = await User.findOne({email: req.body.email}); // Returns a promise that's why we use await function
        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
                id: user.id
            }
        }
        
        const authUser = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authUser});
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
});

// Authenticate a user using post request on api/auth/login

router.post('/login',[
    body('email', 'Enter a unique email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "Please try login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error : "Please try login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authUser = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success , authUser});        

    } catch (error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
});

// Router for getting a user whenever required
router.get('/getuser',fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
});


module.exports = router;