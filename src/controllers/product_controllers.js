const catchAsyncError = require("../middleware/catchAsyncError");
const { validateProduct,createProduct,getData,AllProduct,getuserdata } = require("../service/product_service");


exports.Product = catchAsyncError(async(req,res)=>{
    const data = await validateProduct(req,res);
    await createProduct(data,res)
})

exports.getproduct = catchAsyncError(async(req,res)=>{
     await getData(req,res);
})

exports.getuser = catchAsyncError(async(req,res)=>{
    await getuserproduct(req,res)
})

exports.getAllProductData =  catchAsyncError(async(req,res)=>{
    await getuserdata(req,res)
})