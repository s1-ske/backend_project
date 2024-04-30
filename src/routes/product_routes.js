const express = require("express");
const { Authentication } = require("../middleware/Auth");
const { Product, getproduct, getAllProductData } = require("../controllers/product_controllers");
const { getuserdata } = require("../service/product_service");
const Productrouter = express.Router();


Productrouter.post("/Create/Product",Authentication,Product)
Productrouter.get("/get/product",Authentication,getproduct)
Productrouter.get("/AllProduct",getAllProductData)
Productrouter.get("/user/product",Authentication,getuserdata);

module.exports = Productrouter;