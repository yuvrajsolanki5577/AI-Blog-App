import * as Yup from "yup";

const loginSchema = Yup.object({
    email : Yup.string().email("Please Enter a Valid Email").required("Please Enter Your Email").lowercase(),
    password : Yup.string().min(6).required("Please Enter Your Password"),
});

export default loginSchema;