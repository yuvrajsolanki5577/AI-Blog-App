import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { CheckUser } from '../../store/features/auth/authServices';
import { STATUSES } from '../../store/features/blog/blogSlice';
import { useFormik } from 'formik';
import registerValidation from "../Validation/registerValidation";

const initialValues = {
    name : "",
    email : "",
    password : "",
    confirm_password : ""
}

const Register = () => {

    const Navigate = useNavigate();
    const [user,setUser] = useState({
        present : false,
        OTP : "",
        userId : ""
    });

    const {values , errors , touched , handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : registerValidation,
        onSubmit : async (values) => {
            try {
                const {name , email, password} = values;

                const res = await axios.post(`/user/register`,{name,email,password});
                    CheckUser(STATUSES.SUCCESS,res.data.message);
                    setUser(prev => ({
                        ...prev, present : true, userId : res?.data?.userId
                }));

            } catch (error) {
                CheckUser(STATUSES.ERROR,error?.response?.data?.error);
            }
        }
    });

    const handleOTP = async (e) => {
        
        e.preventDefault();
        const {userId , OTP } = user; 

        try {

            const res = await axios.post(`/user/verify-email`,{ userId , OTP });
            CheckUser(STATUSES.SUCCESS,res?.data?.message);
            Navigate("/");

        } catch (error) {
            CheckUser(STATUSES.ERROR,error?.response?.data?.error);
        }
    }

  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col mt-10 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Register</h2>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create and account
                    </h1>
                    <form method='POST' onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Name" value={values.name} onChange={handleChange} onBlur={handleBlur} required="" />
                            { errors.name && touched.name ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.name} </span></p>) : null}
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example@gmail.com" value={values.email} onChange={handleChange} onBlur={handleBlur}  required="" />
                            { errors.email && touched.email ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.email} </span></p>) : null}
                        </div>
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
                        {
                        !user.present ?
                        <div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Create an account</button>
                        <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                        </div> : null
                        }
                    </form>
                    {
                    user.present ? 
                    <form method='POST' onSubmit={handleOTP} className="space-y-4 md:space-y-6">
                    <div>
                            <label htmlFor="verify-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                            <input type="number" name="OTP" id="OTP" placeholder="Enter OTP" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setUser( prev => ({
                                ...prev, OTP : e.target.value
                            }))} required="" />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleOTP}>Verify Email</button>
                    </form> : null
                    }
                </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default Register