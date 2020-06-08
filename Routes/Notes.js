const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserNote = require('../Models/UserNote');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// getting whole api
router.get('/', (req,res,next)=> {
    UserNote.find().select('user email notes _id')
    .exec()
    .then(docs => {
        const response = {
            Total: docs.length,
            Users: docs.map(doc => {
                return {
                    user: doc.user,
                    email: doc.email,
                    request: {
                        type: 'GET',
                        url: process.env.PORT||4000+'/notes/'+doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log('error in get all'+ err);
        res.status(500).json({error: err});
    });
});

                                                                // working with users like creating , deleting , editing 
//creating new user 
router.post('/signup',(req,res,next)=>{
    UserNote.find({email: req.body.email})
    .then(user => {
        console.log(user);
        if(user.length > 0){
            res.status(409).json({
                message: "User already exist with the given email"
            });
        } else {
            bcrypt.hash(req.body.password,10,(err,encryptd)=>{
                if(err) {
                    res.status(500).json({message: "Passowrd can not be processed"})
                } else {
                    const userNote = UserNote({
                        _id: mongoose.Types.ObjectId(),
                        user: req.body.user,
                        email: req.body.email,
                        password: encryptd,
                        notes: []
                    });
                    userNote.save()
                    .then(result => {
                        res.status(200).json({
                            message: "User created",
                            user: result
                        });
                    })
                    .catch(err => res.status(500).json({error: `Error in saving user ${err}`}));
                }
            })
        };
    })
    .catch(err => {
        console.log("Error from finding mail"+err);
        res.status(500).json({error: err});
    });
});
// login for users
router.post('/login',(req,res,next)=>{
    UserNote.find({email: req.body.email}).exec()
    .then(user => {
        if(user.length<1){
            res.status(401).json({
                message: "Not Autherised"
            })
        } else {
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({message: "no auth"})
                }
                if(result) {
                    const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id, 
                    },
                    process.env.jwt_key,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({message: "Auth Successful",token: token});
                }
                res.status(401).json({message: "no auth"})
            });
        };
    })
    .catch(err => {
        console.log("Login error "+err);
        res.status(500).json({
            message: "Login error",
            error: err
        })
    });
})

// getting every info including notes of a particular user
router.get('/:UserId',(req,res,next)=>{
    const id = req.params.UserId;
    UserNote.findById(id).select('user email notes _id').exec()
    .then(data => {
        console.log(data);
        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).json({ id : invalid});
        }
    })
    .catch(err => {
        console.log('error in get id'+err);
        res.status(500).json({error: err});
    });
})

// update users info
router.patch('/:UserId',(req,res,next)=>{
    const userId= req.params.UserId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    UserNote.update({_id: userId},{$set: updateOps}).exec()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log('error in patch' +err);
        res.status(500).json(err);
    });
})

// delete user
router.delete('/:UserId',(req,res,next)=>{
    const userId= req.params.UserId;
    UserNote.findById(userId).remove({_id: userId}).exec()
    .then(result  => res.status(200).json({
        message:`Welcome ${userId} to delete request`,
        request: {
            type: 'GET',
            url: process.env.PORT||4000+'/notes'
        }
    }))
    .catch(err => {
        console.log('error in delete' +err);
        res.status(500).json({error: err});
    });
})

                                                                            // working with users notes 

// create users notes
router.patch('/user/:UserId',(req,res,next)=>{
    const userId= req.params.UserId;
    UserNote.findById(userId).then(result => {
        console.log(result);
        result.notes.push({
            id: req.body.id,
            title: req.body.title,
            discription: req.body.discription
        });
        result
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                _id: result._id,
                user: result.user,
                email: result.email,
                notes: result.notes,
                request: {
                    type: 'GET',
                    url: process.env.PORT||4000+'/notes/'+result._id
                }
            });
        })
        .catch(err => {
            console.log('error in patch' +err);
            res.status(500).json(err);
        });
    });
})

// update users notes
router.patch('/user/:UserId/:id',(req,res,next)=>{
    const id= req.params.id;
    const userId = req.params.UserId;
    UserNote.findById(userId).then(result => {
        console.log(result.notes);
        result.notes.map(note => {
            console.log(note.id);
            if(note.id === parseInt(id)){
                note.title= req.body.title,
                note.discription= req.body.discription
            }
        });
        result
        .save()    
        .then(result => {
            res.status(201).json({
                request: {
                    type: 'GET',
                    url: process.env.PORT||4000+'/notes/'+result._id
                }
            });
        })
        .catch(err => {
            console.log('error in patch' +err);
            res.status(500).json(err);
        });
    })
});

// delete users note
router.delete('/user/:UserId/:id',(req,res,next)=>{
    const id= req.params.id;
    const userId = req.params.UserId;
    UserNote.findById(userId).then(result => {
        console.log(result.notes);
        result.notes.map(note => {
            if(note.id === parseInt(id)){
                note.remove();
            }
        });
        result
        .save()    
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Note deleted",
                request: {
                    type: 'GET',
                    url: process.env.PORT||4000+'/notes/'+result._id
                }});
        })
        .catch(err => {
            console.log('error in patch' +err);
            res.status(500).json(err);
        });
    })
});

// delete all users notes
router.delete('/user/:UserId',(req,res,next)=>{
    const id= req.params.id;
    const userId = req.params.UserId;
    UserNote.findById(userId).then(result => {
        console.log(result.notes);
        result.notes.map(note => {
            note.remove();
        });
        result
        .save()    
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log('error in patch' +err);
            res.status(500).json(err);
        });
    })
});

module.exports = router;