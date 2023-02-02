import * as Yup from "yup";

const registerSchema = Yup.object({
    name : Yup.string().min(2).max(20).required("Please Enter Your Name"),
    email : Yup.string().email().required("Please Enter Your Email"),
    password : Yup.string().min(6).required("Please Enter Your Password"),
    confirm_password : Yup.string().required("Please Enter Confirm Password").oneOf([Yup.ref("password"),null], "Password and Confirm Password is not Same"),
});

export default registerSchema;