import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckUser } from '../../store/features/auth/authServices';
import { STATUSES } from '../../store/features/blog/blogSlice';

const ForgotPassword = () => {

  const Navigate = useNavigate();
  const [email , setEmail] = useState("");

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
      const res = await axios.post(`/user/forgot-password`,{email});
      CheckUser(STATUSES.SUCCESS,res.data.message);
    } catch (error) {
      CheckUser(STATUSES.ERROR,error.response.data.error);
    }

    Navigate('/login');
    
  }  

  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-gray-900 dark:text-white text-3xl font-bold underline">
                {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                Forgot Password    
            </a>
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Enter a Email for OTP !!
                </h2>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} required="" />
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Forgot passwod</button>
                </form>
                <div className="flex items-center justify-between">
                      <Link to="/login" className="text-sm mt-5 font-medium text-primary-600 hover:underline dark:text-primary-500">Return to Login</Link>
                  </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default ForgotPassword;