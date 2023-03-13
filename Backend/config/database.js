const mongoose = require("mongoose");

const connectDB = () => { 
    mongoose.connect(process.env.DB_URL_DEV).then(() => {
        console.log(`Database Connected Successfully !!`);
    }).catch((error) => {
        console.log(`Database Connection Failed !!`,error);
    })
}

module.exports = connectDB;