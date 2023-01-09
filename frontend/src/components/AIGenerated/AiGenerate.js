import React, { useState } from 'react';
import { Configuration, OpenAIApi }  from "openai";

const configuration = new Configuration({
  apiKey : process.env.REACT_APP_OPENAI_API_KEYS,
});

const openai = new OpenAIApi(configuration);

const AiGenerate = () => {

  const[input, setInput] = useState();
  const[ans, setans] = useState();

  const handleSubmit = (e) => {

      e.preventDefault();
      console.log(`Generate blog topics on : ${input}`);
      openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate blog topics on : ${input}`,
        temperature: 0.8,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }).then((res) => {
          console.log(res);
          setans(res.data.choices[0].text);
      }).catch((error) => {
          console.log(error);
      });
  }

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <h1 className='flex items-center mb-6 text-gray-900 dark:text-white text-3xl font-bold underline'>
        Ai Generated Page
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
    <p className="leading-relaxed m-5 text-gray-200 mb-6">{ans}</p>
    </div>
  )
}

export default AiGenerate;