const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser, verifyEmail, forgotPassword, resetPassword } = require("../controllers/user");
const {verify} = require("../middlewares/Authentication");
const { userValidator, validate, isResetTokenValid } = require("../middlewares/userValidator");

router.post('/register',userValidator,validate,registerUser);
router.post('/login',loginUser);
router.get('/verify-email',verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",isResetTokenValid,resetPassword);
router.get("/user",verify,getUser);


module.exports = router;