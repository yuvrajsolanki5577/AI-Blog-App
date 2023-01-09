const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true
    }
});

const ContactUs = mongoose.model("ContactUs",ContactUsSchema);
module.exports = ContactUs;