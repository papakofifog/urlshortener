const dns = require('dns')

const mongoose= require('mongoose')

const shortWebUrl= require('../modules/shortUrl');


//const dbConnection = require('../app');

const validateUrl=(urlText)=>{
    try{
        domainNameReg=/[^https://www.]\w+.\w+/g;
        domainName=urlText.match(domainNameReg);
        dns.lookup(domainName[0],(err,family)=>{
            if (err){
                return "invalid url";
            }
        })   
    }catch(err){
        return err
    }
    return true;

} 

let getNextSequence=()=>{
    // get current sequence
    try{
        let lastdocument= getLastDocument();
        console.log(nextSequence=lastdocument.shortUrl);
        //let nextSequence=lastdocument.shortUrl+=1;
        //return nextSequence;
    }catch(err){
        return err
    }
    

}



let AddUrl = async (body)=>{
    try{
        await shortWebUrl.find().count((err,num)=>{
            if (err) return err;
            let context = new shortWebUrl({
                urlString:body,
                shortUrl: num+1
            })
            //console.log(context)
            context.save().catch((err)=>{
                return err;
            })
            
            return context;
            
        })
        
        
    }catch(err){
        return err
    }
    
}




// does url exist?
let getShorterUrl= async (urlText)=>{
    try{
        let resultUrl= await shortWebUrl.findOne({urlString:urlText});
        return resultUrl;
    }catch(err){
        return err
    }
}


let checkEmpty=(item)=>{
    // check if variable is empty
    if(item!=null){
        // its not empty
        return true
    }
    // its empty
    return false
}

let getShortenedUrl= async (urlText)=>{
    // check if the url exists
    try{
        let requiredUrl= await getShorterUrl(urlText)
        
        if (checkEmpty(requiredUrl)=== false){
            shortVersion= await AddUrl(urlText)
            return shortVersion;
        }
        //console.log(requiredUrl)
        return requiredUrl
    }catch(err){
        return err
    }
    
    
}





module.exports={ validateUrl, getShortenedUrl }