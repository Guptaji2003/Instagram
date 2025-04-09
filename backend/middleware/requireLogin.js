const jwt=require("jsonwebtoken")
// const {jwt_secret}=require("../keys/key.js")
const mongoose=require("mongoose")
// const USER=mongoose.model("USER")

module.exports=(req,res,next)=>{
const {authorization}=req.headers;
if(!authorization){
    return res.json({error:"you have to logged in 1 "})
}
const token=authorization.replace("Bearer ","")
jwt.verify(token,jwt_secret,(err,payload)=>{
    if(err){
        return res.json({error:"you have to logged in 2"})
    }
    const {_id}=payload;
    USER.findById(_id).then(userdata=>{
        req.user=userdata;
        next()
    })
})

}