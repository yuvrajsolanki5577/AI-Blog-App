const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const verficationTokenSchema = new mongoose.Schema({
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

verficationTokenSchema.pre('save' , async function(next){
    if(this.isModified("token")){
        const hashToken = await bcrypt.hash(this.token,8);
        this.token = hashToken;
    }
    next();
});

verficationTokenSchema.methods.compareToken = async function(token){
    const result = await bcrypt.compare(token,this.token);
    return result;
};

const VerficationToken = mongoose.model("VerificationToken",verficationTokenSchema);
module.exports = VerficationToken;