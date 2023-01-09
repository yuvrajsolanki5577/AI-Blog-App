import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { CheckUser } from '../../store/features/auth/authServices';
import contactUsSchema from '../Validation/contactUsValidation';

const URL = process.env.REACT_APP_BASE_URL;

const Contact = () => {
    
  const { user } = useSelector((state) => state.auth);

  const initialValues = {
    email : user ? user.email : "",
    subject : "",
    message : ""
  }

  const {errors,values, touched, handleBlur, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues : initialValues,
    validationSchema : contactUsSchema,
    onSubmit : (values , {resetForm}) => {
        try {
            const {email, subject, message} = values;
            axios.post(`${URL}/contactus`,{email, subject, message}).then((res) => {
                CheckUser("success","Feedback Send Successfully");
                resetForm();
            }).catch((err) => {
                CheckUser("error","Server Error");
            })
        } catch (error) {
            console.log(error);
        }
    }
  });

  return (
    <section className="bg-gray-50 mt-8 mb-10 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h2 className="mb-6 mt-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Contact Us
      </h2>
      <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <p className="mb-6 lg:mb-6 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature ? Need details about our Business plan ? Let us know.</p>
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form method='POST' className="space-y-8">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    {user ? 
                        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={user.email} disabled />
                    :
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Example@gmail.com" value={values.email} onBlur={handleBlur} onChange={handleChange} required />
                    }
                    { errors.email && touched.email ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.email} </span></p>) : null}
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                    <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" value={values.subject} onBlur={handleBlur} onChange={handleChange} required />
                    { errors.subject && touched.subject ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.subject} </span></p>) : null}
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                    <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." value={values.message} onBlur={handleBlur} onChange={handleChange}></textarea>
                    { errors.message && touched.message ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.message} </span></p>) : null}
                </div>
                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Send message</button>
            </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Contact;