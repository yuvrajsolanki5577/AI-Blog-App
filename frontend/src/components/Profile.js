import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const URL = process.env.REACT_APP_BASE_URL;

const Profile = () => {

  const {token} = useSelector((state) => state.auth.user);
  const headers = `authorization: Bearer ${token}`;

  const [user , setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${URL}/user/user`, { headers });
            setUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
  }, []);
  
  console.log(user);

  return (
    <div className='flex flex-col items-center m-5 px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <h1 className="mb-4 m-5 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Profile</h1>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</a>
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Save</a>
            </div>
        </div>
        </div>
        <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white mt-5">Blog</h1>
        <div className="m-2"> 
        <a href="#" className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div>
        </a>
        </div>
    </div>
  )
}

export default Profile