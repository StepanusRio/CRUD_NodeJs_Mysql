const express = require('express');
const App = express();
const db = require('./config/Db.js');
const User = require('./models/User.js');

// Root
App.get('/',(req,res)=>{
    res.send('Respons Success');
});

App.use(express.urlencoded({extended:true}));

// Authentication
db.authenticate().then(()=>{
    console.log('Connected to database')
});

// Insert New User
App.post('/Create', async (req,res)=>{
    try {
        const {username,password,name} = req.body;
        const newUser = new User({
            username,
            password,
            name
        });

        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// Get All Users
App.get('/Read',async(req,res)=>{
    try {
        const getallUser = await User.findAll({});
        res.json(getallUser);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// Show User by Id
App.get('/Read/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const getuser = await User.findOne({
            where:{ id:id }
        });
        res.json(getuser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// Delete User by Id
App.delete('/Delete/:id',async(req,res)=>{
    try {
        const id = req.params.id;

        const deleteUser = await User.destroy({
            where:{ id:id }
        });
        await deleteUser;
        res.json({message:'Delete Success'});
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// Update User by Id
App.put('/Update/:id',async(req,res)=>{
    try {
        const {username,password,name} = req.body;
        const id = req.params.id;
        const updateUser = await User.update({
            username,
            password,
            name
        },
            {where:{id:id}
        });
        await updateUser;
        res.json({message:'Update Success'});
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// Initilaize Server
App.listen(4500,()=>{
    console.log('Server is running on port 4500');
});