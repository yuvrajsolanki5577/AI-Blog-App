import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import postSchema from "../Validation/postValidation";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const NewBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState();
  const [inputTags, setTags] = useState();
  const [featured, setFeatured] = useState(false);
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
    const tags = inputTags.split(",").map((item) => item.trim());
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
          await axios.post(
            `/post/create`,
            { title, meta, slug, tags, content, category ,featured },
            { headers: { authorization } }
          );
          Navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
    });

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
