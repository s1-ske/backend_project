const express = require("express");
const Userrouter = require("./src/routes/user_routes");
const Productrouter = require("./src/routes/product_routes");

const app = express();

app.use(express.json());
app.use("/api/v1",Userrouter);
app.use("/api/v1",Productrouter);





module.exports = app;