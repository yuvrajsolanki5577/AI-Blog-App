const {check , validationResult} = require("express-validator");

exports.postValidators = [
    check('title').trim().not().isEmpty().withMessage(`Post Title is Missing`),
    check('content').trim().not().isEmpty().withMessage(`Post Content is Missing`),
    check('meta').trim().not().isEmpty().withMessage(`Meta Descriptions is Missing`),
    check('slug').trim().not().isEmpty().withMessage(`Post slug is Missing`),
    check('tags').isArray().withMessage(`Tags is Must in array of string`).custom((tags)=>{
        for (let t of tags) {
            if(typeof t !== "string"){
                throw Error(`Tag Must be Array of String`);
            }
        }
        return true;
    }),
];

exports.validate = (req,res,next) => {
    const error = validationResult(req).array();
    if(error.length){
       return res.status(401).json({error : error[0].msg})
    }
    next();
}