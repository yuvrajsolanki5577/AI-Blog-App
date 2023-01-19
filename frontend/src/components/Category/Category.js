import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BlogPost from '../Blog/BlogPost';


const Category = () => {

  const {categoryName} = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const res = await axios.get(`/post/category/${categoryName}`);
            setPosts(res.data.posts);
        } catch (error) {
            setError(true);
            setPosts([]);
        }
    }

    fetchBlog();
  }, [categoryName]);
  

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
    <div className="container px-5 py-24 mx-auto">
    <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">{categoryName.toUpperCase()}</h2>
      <div className="flex flex-wrap -m-4">
      {
    posts && posts.map((post) => (
      <BlogPost key={post.id} post={post} />
    ))
  }
    </div>
    {
        error ? <h2 className="m-5 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"> No Post Found </h2> : null
    }
    </div>
  </section>
  )
}

export default Category;