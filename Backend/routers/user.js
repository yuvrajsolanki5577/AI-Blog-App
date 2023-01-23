const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser, verifyEmail, forgotPassword, resetPassword } = require("../controllers/user");
const {verify} = require("../middlewares/Authentication");
const { userValidator, validate, isResetTokenValid } = require("../middlewares/userValidator");

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: User Registeration API
 * /api/user/register:
 *   post:
 *     summary: Register New User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/Users.js'
 *     responses:
 *       200:
 *         description: User Registration Successfull !!.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/Users.js'
 *       500:
 *         description: Some server error
 *
 */
router.post('/register',userValidator,validate,registerUser);
router.post('/login',loginUser);
router.post('/verify-email',verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",isResetTokenValid,resetPassword);
router.get("/user",verify,getUser);


module.exports = router;