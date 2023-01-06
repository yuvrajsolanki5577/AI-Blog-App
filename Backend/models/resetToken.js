const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resetTokenSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    token : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        expires : 3600,
        default : Date.now()
    }
});

resetTokenSchema.pre('save' , async function(next){
    if(this.isModified("token")){
        const hashToken = await bcrypt.hash(this.token,8);
        this.token = hashToken;
    }
    next();
});

resetTokenSchema.methods.compareToken = async function(token){
    const result = await bcrypt.compare(token,this.token);
    return result;
};

const ResetToken = mongoose.model("ResetToken",resetTokenSchema);
module.exports = ResetToken;