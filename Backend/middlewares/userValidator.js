const {check , validationResult} = require("express-validator");
const { isValidObjectId } = require("mongoose");
const ResetToken = require("../models/resetToken");
const User = require("../models/users");

exports.userValidator = [
    check('name').trim().not().isEmpty().withMessage(`Name is Missing !!`),
    check('email').trim().not().isEmpty().withMessage(`Email is Missing !!`),
    check('password').trim().not().isEmpty().withMessage(`Password is Missing !!`)
]

exports.validate = (req,res,next) => {
    const error = validationResult(req).array();
    if(error.length){
       return res.status(400).json({error : error[0].msg})
    }
    next();
}

exports.isResetTokenValid = async (req,res,next) => {
    const { token , id } = req.body;
    if(!token || !id){
        return res.status(400).json({error : `Invalid Token or Id`});
    }
    
    if(!isValidObjectId(id)){
        return res.status(404).json({error : `Invalid Object !!`});
    }

    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({error : `User Not Found !!`});
    }

    const resetToken = await ResetToken.findOne({user : user._id});
    if(!resetToken){
        return res.status(404).json({error : `Reset Token Not Found`});
    }
    
    const isValid = await resetToken.compareToken(token);
    
    if(isValid){
        return res.status(400).json({error : `Reset Token is Not Valid`});
    }

    req.users = user;
    next();
}