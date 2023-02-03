import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const EditProfile = () => {

    const { token } = useSelector((state) => state.auth.user);
    const authorization = `Bearer ${token}`;

    const [image, setImage] = useState();
    const [profile, setProfile] = useState();
    const [user, setUser] = useState();
    
    const initialValues = {
        name : "",
        description : "",
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/user/user`, { headers : {authorization} });
                setUser(res.data.user);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);

    const {values , errors , touched ,handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : Yup.object({
            name : Yup.string().min(2).max(20).required("Please Enter Your Name"),
            description : Yup.string().min(20).max(100)
        }),
        onSubmit : (values) => {
            console.log(values);
        }
    });

    const handleImage = (e) => {
        var url = URL.createObjectURL(e.target.files[0]);
        setImage(e.target.files[0]);
        setProfile(url);
    }
  
    return (
    <>

      <div className='flex flex-col items-center m-5 px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <h1 className="mb-4 m-5 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Profile</h1>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mt-5 mb-5 rounded-full shadow-lg" src={profile ? profile : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} alt="Bonnie image"/>
        <form method='POST' onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <label htmlFor="file_input" className="block text-sm font-medium text-gray-900 dark:text-white">Upload Profile Photo</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleImage} />
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name </label>
                      <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={values.name} onChange={handleChange} onBlur={handleBlur} required="" />
                      { errors.name && touched.name ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.name} </span></p>) : null}            
                  </div>
                  <div>
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Description</label>
                      <input type="description" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={values.description} onChange={handleChange} onBlur={handleBlur} required="" />
                      { errors.description && touched.description ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.description} </span></p>) : null}
                  </div>
                  <div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Want to Change Your Password ? <Link to="/forgot-password" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Click Here </Link>
                  </p>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Update</button>
              </form>
        </div>
      </div>
      </div>
  </>
  );
}

export default EditProfile;