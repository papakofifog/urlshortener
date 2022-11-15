// enable process.env
require('dotenv').config()

const express= require('express')
const cors= require('cors')
const app= express()
const mongoose= require('mongoose')
const bodyParser= require('body-parser')
const dns= require('dns')

app.use(cors())



//connect the static pages
app.use('/public', express.static(`${process.cwd()}/public`));

// get the contents of the body passed to the server
app.use(bodyParser.json())

// connect the views
app.use('home/',(req,res)=>{
    res.sendFile(process.cwd()+'/views/index.html');
});

// set Routes for my api endpoint
const shortenerRoute= require('./routes/shorten')
app.use('/api',shortenerRoute)


// connect to db

    mongoose.connect(
        process.env['MONGO_URI'],
        {useNewUrlParser:true, useUnifiedTopology: true }
    ).then((data)=>{
        console.log("Connected to Mongodb")
    }).catch((err)=>{
        console.log(err)
    })
    




//listen on port 5000
app.listen('5000')

