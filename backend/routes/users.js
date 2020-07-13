const router = require('express').Router();
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
let User = require('../models/user.model');

router.get('/', auth, async (req, res) =>{
    const user = await User.findById(req.user);
    res.json({id: user._id, username: user.username});
});

router.post('/register', async (req, res) =>{
    try{
        const {username, email, password } = req.body;

        if(!username || !email || !password)
             return res.status(400).json({message: 'You need to enter all fields to continue.'});

        if(password.length < 8)
             return res.status(400).json({message: 'Password needs to be at least 8 characters long.'});

        const registeredEmail = await User.findOne({email: email});                                   
        if(registeredEmail)
             return res.status(400).json({message: 'An account with that email address already exists. Please login to continue.'});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password:passwordHash});

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }catch(err){
         res.status(500).json({error: err.message});
    }
});


router.post('/login', async (req, res) =>{
    try{
        const {email, password } = req.body;

        if(!email || !password)
             return res.status(400).json({message: 'You need to enter all fields to continue.'});

        const user = await User.findOne({email: email});   
        if(!user)
             return res.status(400).json({message: 'The email doesnt match our records.'});
        
        const isMatch = await bcrypt.compare(password, user.password);   
        if(!isMatch)
            return res.status(400).json({message: 'Invalid password.'});

        const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN);
        return res.json({token, user:{id: user._id, username: user.username},});
    }catch(err){
         res.status(500).json({error: err.message});
    }
});

router.delete('/delete', auth,  async (req, res) =>{
     try{
         const deleteUser = await User.findByIdAndDelete(req.user);
         return res.json({message: 'Goodbye!', user: deleteUser});
     }catch(err){
          res.status(500).json({error: err.message});
     }
 });
 
 router.post('/auth', auth,  async (req, res) =>{
     try{
          const token = req.header('x-auth-token');
          if(!token)
             return res.json(false);
     
          const verified = jwt.verify(token, process.env.JWT_TOKEN);   
          if(!verified)
              return res.json(false);
          
          const user = await User.findById(verified.id);
          if(!user)
              return res.json(false);

          return res.json(true);          
         }catch(err){
             res.status(500).json({error: err.message});
        }
 });

module.exports = router;
