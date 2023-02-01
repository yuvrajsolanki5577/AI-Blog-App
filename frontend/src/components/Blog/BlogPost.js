import React from 'react';
import { Link } from "react-router-dom";

const BlogPost = ({post}) => {
  return (
    <div key={post.id} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={post.thumbnail ? post.thumbnail : "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80"} alt="blog" />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{post?.category ? (post?.category).toUpperCase() : "Category"}</h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">{post.title}</h1>
                  {/* <p className="leading-relaxed mb-3">
                    <span dangerouslySetInnerHTML={{__html : (post.content).substring(0,50)}}></span>
                  </p> */}
                  <p className="leading-relaxed mb-3">
                    {(post?.meta).substr(0,100)}....
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <Link to={`/blog/${post.id}`} className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0">Read More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                    {/* <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                      <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>1.2K
                    </span>
                    <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                      <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>6
                    </span> */}
                  </div>
                  <div className="flex items-center mt-4">
                    {/* <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="Avatar of Jonathan Reinink" /> */}
                    <div><strong> Author : </strong></div>
                    <div className="text-sm ml-2">
                      <p className="text-gray-200 leading-none">{(post?.author?.name).toUpperCase()}</p>
                      {/* <p className="text-gray-200">{post?.date}</p> */}
                    </div>
                  </div>
                </div>
              </div>
        </div>
  )
}

export default BlogPost;