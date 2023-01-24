const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto Generated, Id of the User
 *         email:
 *           type: string
 *           description: Email id of User
 *         password:
 *           type: string
 *           description: Password of User
 *         description:
 *           type: string
 *           description: Optional, Description of User
 *         verified:
 *           type: boolean
 *           description: Auto Generated, Whether you are Verified User or Not !!
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Auto Generated, User Registration date
 *       example:
 *         id: 45sfsdfs548sfd42s4s21s3
 *         name: Shubham Jain
 *         email: Shubhamjainpvt@gmail.com
 *         verified: false
 *         createdAt: 2023-01-24T04:05:06.157Z
 */

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