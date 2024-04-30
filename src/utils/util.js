const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const respo = (res,statuscode,message,data) => {
    res.status(statuscode).json({
        message,
        data
    })
}

const hash=async(password)=>{
    let hashpassword=await bcrypt.hash(password,10);
    return hashpassword;
}

const hashcompare=async(password,userpassword)=>{
    let compare = await bcrypt.compare(password,userpassword);
    return compare;
}

const createToken=async(id)=>{
    const token=await jwt.sign({id,iet:Date.now()},process.env.SECRET);
    console.log(token)
    return token;

}

const verifyToken=async(Token)=>{
    return jwt.verify(Token,process.env.SECRET);
}

module.exports = {respo,hash,hashcompare,createToken,verifyToken};