const express = require('express');
const app = express();
const notesRouter = require('./Routes/Notes');
// const loginRouter = require('./Routes/Login');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// app.use((req, res, next )=> {
//     res.status(201).send("Hello from App.js");
// });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Dealing with CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Headers','PUT,POST,PATCH,DELETE,GET');
    }
    next();
})

//mongoose connection
mongoose.connect(
    'mongodb+srv://garvit_singh:'+
    process.env.pwd+
    '@cluster0-tpxdq.mongodb.net/singh_garvit?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch( err => console.log(`Error from mongoose connection${err}`));

// Adding Routes
app.use('/notes',notesRouter);

// error handling 
app.use((req,res,next)=>{
    err = new Error('Not Found');
    err.status = 404;
    next(err);
})
app.use((err, req, res , next)=> {
    res.status(err.status || 500);
    res.json({
        error : err.message
    })
})

module.exports = app ;