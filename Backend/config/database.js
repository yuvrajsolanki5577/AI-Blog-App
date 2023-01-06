const mongoose = require("mongoose");

const connectDB = () => { 
    mongoose.connect("mongodb://127.0.0.1:27017/blog-app").then(() => {
        console.log(`Database Connected Successfully !!`);
    }).catch((error) => {
        console.log(`Database Connection Failed !!`,error);
    })
}

module.exports = connectDB;