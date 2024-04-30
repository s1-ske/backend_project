const app = require("./app");
require("dotenv").config();
const {connectDb}=require("./connectDb")
const PORT = process.env.PORT;

connectDb();

app.listen(PORT,()=>{
    console.log(`your server is working at ${PORT}`);
})