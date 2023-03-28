const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser, verifyEmail, forgotPassword, resetPassword, editProfile } = require("../controllers/user");
const {verify} = require("../middlewares/Authentication");
const multer = require("../middlewares/multer");
const { userValidator, validate, isResetTokenValid } = require("../middlewares/userValidator");

router.post('/register',userValidator,validate,registerUser);
router.post('/login',loginUser);
router.post('/verify-email',verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",isResetTokenValid,resetPassword);
router.get("/user",verify,getUser);
router.post("/update-profile",verify,multer.single('profile'),editProfile);

module.exports = router;