const { respo } = require("../utils/util");
const Product = require("../model/product-model");
exports.validateProduct = async (data, res) => {
  const createdBy = data.user._id;
  console.log(createdBy);
  const { name, brand, price } = data.body;
  if (!createdBy || !name || !brand || !price) {
    respo(res, 400, "empty data fill the details", {});
  }
  return { createdBy, name, brand, price };
};

exports.createProduct = async (data, res) => {
  if (!data) {
    respo(res, 404, "data is missing", {});
  }
  console.log(data);
  const product = await Product.create(data);
  console.log(product);
  respo(res, 200, "product created", product);
};

exports.getData = async(data,res)=>{
    const createdBy = data.user._id;
    if(!createdBy){
        respo(res,400,"id not found",{});
    }
    const product = await Product.find({createdBy});
    respo(res,200,"product by user",product)
}

exports.AllProduct = async(data,res)=>{
    const product=await Product.find();
    if(!product){
        respo(res,404,"product not found",{})
    }
    respo(res,200,"All Product",product);
}

exports.getuserdata = async(data,res)=>{
  const createdBy = data.user._id;
  if(!createdBy){
    respo(res,400,"Id not found",{})
  }
  const product=await Product.find({createdBy})
  // console.log(product);
  respo(res,200,"products by user",product);
}
