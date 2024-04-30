const { error } = require("console");
const mongoose = require("mongoose");

const URI=process.env.MONGO_DB;

module.exports.connectDb = () => {
    mongoose.connect(URI)
    .then((res)=>{
        console.log("Db is Connected")
    })
    .catch((error)=>{
        console.log("Coonection Failed")
    })
}