import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AIGenerateTitle } from '../../store/features/AI/AIServices';
import { STATUSES } from '../../store/features/blog/blogSlice';

const AiTitleGenerate = () => {

  const [input, setInput] = useState();
  const [newTitle, setNewTitle] = useState([]);

  const { title , status } = useSelector((state) => state.AI);
  const dispatch = useDispatch();

  const handleTitle = (titles) => {
    const arr = titles.split('.');
    const newArr = []
    arr.map((ele) => {
      newArr.push(ele.slice(1,-2) + '..');
    });
    setNewTitle(newArr);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(AIGenerateTitle(input));
      handleTitle(title);
  }

  return (
    <section className="mx-auto mt-10 w-12/12 flex bg-gray-50 mb-6 dark:bg-gray-900">
    <div className="px-6 py-8 mx-auto md:h-screen mb-6 lg:py-0">
      <h1 className='flex items-center mb-6 text-gray-900 dark:text-white text-3xl font-bold underline'>
        AI Title Generator
      </h1>
      <form method='POST'>   
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" onChange={(e) => setInput(e.target.value)} required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}> Search </button>
        </div>
    </form>
        {
          (STATUSES.LOADING===status) && <h1 className='flex m-5 items-center mb-6 text-gray-900 dark:text-white text-3xl font-bold underline'> Loading ...</h1>
        }
        {
          title &&
          <div className="w-full mt-4 bg-white rounded-lg p-4 shadow dark:border md:mt-10 sm:max-w-md xl:p-4 dark:bg-gray-800 dark:border-gray-700">
          <ol className='max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400'>
            {
              newTitle.map((ele,index) => {
              if(index!=0){
                return (
                <li key={index} className="leading-relaxed m-5 text-gray-200 mb-3"> {ele} </li>
              ); 
              }
            })
            }
            </ol>
        </div>
        }
      </div>
    </section>
  )
}

export default AiTitleGenerate;