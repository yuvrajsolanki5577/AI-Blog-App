import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import { CheckUser } from '../store/features/auth/authServices';
import { STATUSES } from '../store/features/blog/blogSlice';

const Profile = () => {

  const {token} = useSelector((state) => state.auth.user);
  const authorization = `Bearer ${token}`;

  const Navigate = useNavigate();
  const [user , setUser] = useState({});
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get(`/user/user`, { headers : {authorization} });
            setUser(res.data.user);
            setBlogs(res.data.user.blogs);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
  }, []);

  const deleteBlog = async (blogid) => {
    try {
      const res = await axios.delete(`/post/${blogid}`, { headers : {authorization} });
      CheckUser(STATUSES.SUCCESS,res.data.message);
    } catch (error) {
      CheckUser(STATUSES.ERROR,error.res.data.error);
    }
  }

  return (
    <div className='flex flex-col items-center m-5 px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <h1 className="mb-4 m-5 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Profile</h1>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mt-5 mb-5 rounded-full shadow-lg" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="Bonnie image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</a>
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Save</a>
            </div>
        </div>
        </div>
        <h1 className="text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white mt-5">Blogs
        <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
        {blogs.length}
      </span>
        </h1>
        <div className="container border-double border-4 border-sky-500 m-5 p-5 mx-auto">
        <div className="flex flex-wrap justify-center">

        {
          (blogs.length===0) ? <h2 className="mb-4 m-5 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"> No Post Found </h2> : null
        }

        {
          blogs.map((blog) => {
            return (
              <div className="m-2" key={blog._id}> 
                {console.log(blog.thumbnail)}
                <a href="#" className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={blog?.thumbnail ? blog.thumbnail.url : "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80"} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <span dangerouslySetInnerHTML={{__html : (blog?.content).substring(0,100)}}></span>
                </p> */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {blog?.meta}
                </p>
                </div>
                </a>
                <button className="relative inline-flex items-center justify-center p-0.5 mt-3 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0" onClick={() => Navigate(`/edit-blog/${blog._id}`)}>
                    Edit
                </span>
              </button>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={() => deleteBlog(blog._id)}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Delete
              </span>
            </button>
              </div>
            )
          })
        }
        </div>
        </div>
    </div>
  )
}

export default Profile