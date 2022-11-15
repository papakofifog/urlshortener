const express= require('express');
const router= express.Router();

let { validateUrl,getShortenedUrl }= require('../functions/shorterurlfunctions')

//console.log(validateUrl)

//inport Weburl model


// code to get data posted url from the form
router.post('/shorturl', async (req,res)=>{
    try{
        let urlText=req.body.url;
        const results= validateUrl(urlText)
        // url is valid
        if(results){
            console.log("hey bitches")
            let shortUrl_result= await getShortenedUrl(urlText).catch((err)=>{
                console.log(err);
            })
            //console.log(shortUrl)
            res.json({
                "urlString":shortUrl_result.urlString,
                "code": shortUrl_result.shortUrl
            })
        }
    }
    catch(err){
        res.json(err)
    }
    
})

module.exports= router;