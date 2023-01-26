import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Categories = () => {

  const [categoryName,setCategoryName] = useState([
    {
      name : "travel",
      content : "Traveling is An Passion Every Person through for World tour"
    },
    {
      name : "frontend",
      content : "Frontent Technolgies Like HTML , CSS & JavaScript",
    },
    {
      name : "backend",
      content : "Backend Technologies Like Node JS"
    }
  ]);
  
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
    <div className="container px-5 py-24 mx-auto">
    <h2 className="mb-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">All Categories</h2>
    <div className="flex flex-wrap -m-4">
        {
          categoryName.map((category) => {
            <>
              <Link to={`/category/${category.name}`} className="block max-w-sm m-2 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {category.name} </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400"> {category.content} </p>
              </Link>
            </>
          })
        }      
    </div>
    </div>
    </section>
  )
}

export default Categories;