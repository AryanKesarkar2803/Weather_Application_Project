const {jwt,secretKey} = require("../controllers/controllers.js")

async function verifyUserToken(req,res,next){
    if(!req.cookies.uid){
        res.redirect("/login")
    }
    else{
        const token = req.cookies.uid;
        jwt.verify(token,secretKey,(err)=>{
            if(err){
                res.redirect("/login")
            }
            else{
                next()
            }
        })
}
}

module.exports = {
    verifyUserToken,
}






