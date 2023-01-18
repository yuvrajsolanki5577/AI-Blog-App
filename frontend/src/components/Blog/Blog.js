import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';

const URL = process.env.REACT_APP_BASE_URL;

const Blog = () => {

  const { postId } = useParams();
  const [post, setPost] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const res = await axios.get(`${URL}/post/single/${postId}`);
            // console.log(res);
            setPost(res.data.Post)
        } catch (error) {
            // console.log(error);
            setError(true);
        }
    }
    fetchBlog();
    
}, []);
  
//  console.log(post);

  return (
    <>
    <section className="text-gray-400 bg-gray-900 body-font">
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        {
            error && <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white"> Post Not Found </h1>
        }
        <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
        <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">{post?.title}</h1>
        <p className="leading-relaxed text-gray-200 mb-8">
            <span className='text-gray-100' dangerouslySetInnerHTML={{__html : (post?.content)}}></span>
        </p>
        <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
            <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">Button</button>
        </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default Blog;