const {Schema,model}=require("mongoose");

const productSchema=new Schema({
    createdBy:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:[true,"please enter product name"],
    },
    brand:{
        type:String,
        required:[true,"Enter your brand"]
    },
    price:{
        type:String,
        require:[true,"please enter the product price"]
    }
})

module.exports=new model("productmodel",productSchema);