const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactUs");

router.post("/contactus", async (req,res) => {
    try {
        const {email, subject, message} = req.body;
        if(!email || !subject || !message){
            return res.status(404).json({error : `Something is Missing`});
        }
        const feedback = new ContactUs({email,subject,message});
        await feedback.save();
        return res.status(200).json({message : `Feedback Received Successfully`});
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Internal Server Error",
            success: false,
        });
    }
});

module.exports = router;