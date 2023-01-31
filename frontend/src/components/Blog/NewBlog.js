import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import postSchema from "../Validation/postValidation";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";


const NewBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState();
  const [inputTags, setTags] = useState();
  const [featured, setFeatured] = useState(false);
  const [thumbnail, setThumbnail] = useState();
  const Navigate = useNavigate();

  const { token } = useSelector((state) => state.auth.user);
  const authorization = `Bearer ${token}`;

  const initialValues = {
    title: "",
    meta: "",
    category: "Normal",
  };

  const getSlug = (title) => {
    const slug = title
      .split(" ")
      .filter((item) => item.trim())
      .join("-");
    return slug;
  };

  const getTags = (inputTags) => {
    const tags = inputTags.split(" ").map((item) => item.trim());
    return tags;
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: postSchema,
      onSubmit : async (values) => {
        try {
          const { title, meta, category } = values;
          const tags = getTags(inputTags);
          const slug = getSlug(title);

          const finalPost = { title , meta , category , content , tags, slug , featured , thumbnail };
          const formData = new FormData();
          for(let key in finalPost){
            formData.append(key, finalPost[key]);
          }

          await axios.post(
            `/post/create`,
            formData ,
            { headers: { authorization } }
          );

          Navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
    });

    // console.log(thumbnail);

  return (
    <section className="mx-auto w-12/12 flex bg-gray-50 mb-6 dark:bg-gray-900">
      <div className="px-6 py-8 mx-auto md:h-screen mb-6 lg:py-0">
        <div className="w-full bg-white rounded-lg p-4 shadow dark:border md:mt-10 sm:max-w-md xl:p-4 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Write a Blog
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter title
              </label>
              <input
                type="title"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                required=""
              />
              {errors.title && touched.title ? (
                <p className="mt-2 mb-4 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"> {errors.title} </span>
                </p>
              ) : null}
            </div>
              
            <label className="block text-sm font-medium text-gray-900 mt-4 dark:text-white" htmlFor="user_avatar">Uploaded Thumbnail</label>
            {
              // image Upload
              !thumbnail && 
              <div className="flex items-center mt-5 mb-5 justify-center w-full">
              <label htmlFor="thumbnail" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload </span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Thumbnail for Blog</p>
                  </div>
                  <input id="thumbnail" type="file" className="hidden" onChange={(e) => setThumbnail(e.target.files[0])} />
              </label>
              </div>
            }
            {
              thumbnail && 
              <>
                <input type="text" id="disabled-input-2" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={thumbnail.name} disabled readOnly />
              </>
            }  
            <div>
              <label
                htmlFor="meta"
                className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter Short Description
              </label>
              <input
                type="meta"
                name="meta"
                id="meta"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                placeholder="Short Description"
                value={values.meta}
                onChange={handleChange}
                onBlur={handleBlur}
                required=""
              />
              {errors.meta && touched.meta ? (
                <p className="mt-2 mb-4 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"> {errors.meta} </span>
                </p>
              ) : null}
            </div>
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
            <div>
              <label
                htmlFor="tags"
                className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter tags
              </label>
              <input
                type="tags"
                name="tags"
                id="tags"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Tags"
                value={values.tags}
                onChange={(e) => setTags(e.target.value)}
                onBlur={handleBlur}
                required=""
              />
            </div>
            <label
              htmlFor="countries"
              className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Blog Category
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            >
              <option value="Normal"> --Select Category-- </option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
            </select>
            <div className="flex items-center mt-4 mr-4">
    <input id="purple-checkbox" type="checkbox" onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="purple-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Featured Post </label>
    </div>
            <button
              type="submit"
              className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewBlog;
