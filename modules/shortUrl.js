const mongoose = require('mongoose')

const WebUrl= mongoose.Schema({
    urlString: {
        type: String,
        required: true,
        unique:true
    },
    shortUrl: {
        type:Number,
        required: true,
        unique:true
    }
})

// First, create the User model's underlying collection...


module.exports= mongoose.model('shorterUrl',WebUrl)