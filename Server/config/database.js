const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL  ,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() => {
        console.log("Connected to database successfully")
    }).catch((error) => {
        console.log("Connection to DB not a success");
        console.log(error);
        process.exit(1);
    })
}