import * as Yup from "yup";

const resetPasswordSchema = Yup.object({
    password : Yup.string().min(6).required("Please Enter Your Password"),
    confirm_password : Yup.string().required("Please Enter Confirm Password").oneOf([Yup.ref("password"),null], "Password and Confirm Password is not Same")
});

export default resetPasswordSchema;