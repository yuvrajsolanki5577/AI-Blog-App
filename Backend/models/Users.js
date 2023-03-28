const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        lowercase : true,
        required : true
    },
    password : {
        type : String,
        select : false,
        required : true
    },
    description : {
        type : String,
    },
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    profile : {
        type : Object,
        url : {
            type : URL,
        },
        public_id : {
            type : String,
        },
    },
    verified : {
        type : Boolean,
        default : false,
        required :  true
    }
});

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
       const hashPasssword =  await bcrypt.hash(this.password,10);
       this.password = hashPasssword;
    }
    next();
});

userSchema.methods.comparePassword = async function(password){
    const checkPassword = await bcrypt.compare(password , this.password);
    return checkPassword;
}

const User = mongoose.model("User",userSchema);
module.exports = User;