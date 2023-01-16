import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckUser } from '../../store/features/auth/authServices';
import { STATUSES } from '../../store/features/blog/blogSlice';
import resetPasswordSchema from '../Validation/resetPasswordValidation';

const URL = process.env.REACT_APP_BASE_URL;

const initialValues = {
    password : "",
    confirm_password : ""
}

const ResetPassword = () => {

  const [query] = useSearchParams();
  const Navigate = useNavigate();

  const { values , errors , touched , handleBlur , handleChange , handleSubmit } = useFormik({
    initialValues : initialValues,
    validationSchema : resetPasswordSchema,
    onSubmit : async (values) => {
        try {
            const password = values.password;
            const token = query.get("token");
            const id = query.get("id");

            const res = await axios.post(`${URL}/user/reset-password`, {id, token ,password});
            CheckUser(STATUSES.SUCCESS,res.data.message);
            
            Navigate("/login");
        } catch (error) {
            CheckUser(STATUSES.ERROR,error?.response?.data?.error);
        }
    }
  });

  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"> */}
                Reset Password    
            </a>
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Change Your Password
                </h2>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" method='POST' onSubmit={handleSubmit}>
                <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={values.password} onChange={handleChange} onBlur={handleBlur} required="" />
                            { errors.password && touched.password ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.password} </span></p>) : null}
                        </div>
                        <div>
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="confirm_password" name="confirm_password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} required="" />
                            { errors.confirm_password && touched.confirm_password ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.confirm_password} </span></p>) : null}
                        </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                </form>
            </div>
        </div>
        </section>
    </>
  )
}

export default ResetPassword