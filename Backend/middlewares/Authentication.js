const jwt = require("jsonwebtoken");

const verify = (req,res,next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).json({message : `No Token Found !!`});
        }
        const {_id} = jwt.verify(String(token),process.env.JWT_SECRET_KEY);
        req.User_id = _id;
        next();
    } catch (error) {
        return res.status(500).json({message : `Authentication Error`});
    }
};

module.exports = {verify};