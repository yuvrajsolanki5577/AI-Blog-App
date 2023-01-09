import * as Yup from "yup";

const contactUsSchema = new Yup.object({
    email : Yup.string().email().required(),
    subject : Yup.string().min(10).required(),
    message : Yup.string().min(20).required()
});

export default contactUsSchema;