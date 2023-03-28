import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/features/auth/authServices";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(logOutUser());
    Navigate("/");
  };

  return (
    <>
      <nav>
        <div className="logo"><Link to="/"> AI Blog App </Link></div>

        <label htmlFor="btn" className="icon">
          <span className="fa fa-bars"></span>
        </label>

        <input type="checkbox" id="btn" />

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <label htmlFor="btn-1" className="show">
              Categories{" "}
            </label>
            <Link to="/category/categories">Categories</Link>
            <input type="checkbox" id="btn-1" />
            <ul>
              <li>
                <Link to="/category/travel">Travel</Link>
              </li>
              <li>
                <Link to="/category/technology"> Technology </Link>
              </li>
              <li>
                <Link to="/category/backend">Backend</Link>
              </li>
            </ul>
          </li>

          {user && (
            <li>
              <Link to="/new-blog">Write a Blog</Link>
            </li>
          )}

          {user && (
            <li>
              <label htmlFor="btn-2" className="show">
                AI Generate
              </label>
              <Link to="#">AI Generate</Link>
              <input type="checkbox" id="btn-2" />
              <ul>
                <li>
                  <Link to="/ai-title-generator">Title</Link>
                </li>
                <li>
                  <Link to="/ai-blog-generator">Blog</Link>
                </li>
              </ul>
            </li>
          )}

          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {!user && (
            <li>
              <Link
                to="/register"
                className="bg-blue-500 rounded-3xl hover:text-black"
              >
                Register
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link
                to="/login"
                className="bg-blue-500 rounded-3xl hover:text-black"
              >
                Login
              </Link>
            </li>
          )}
          {user && (
            <li>
              <label htmlFor="btn-3" className="show">
                Profile
              </label>
              <Link to="/" className="bg-blue-500 rounded-3xl hover:text-black">
                Profile
              </Link>
              <input type="checkbox" id="btn-3" />
              <ul>
                <li>
                  <Link to="/profile" className="bg-blue-500 hover:text-black">
                    Profile
                  </Link>
                </li>
                <li onClick={logOut}>
                  <Link className="bg-blue-500 hover:text-black">Logout</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>

      {/* <div className="navbar">
 
    <div className="nav-header">
      <div className="nav-logo">
        <Link to="#">
        </Link>
      </div>
    </div>
 
    <input type="checkbox" id="nav-check" />
    <div className="nav-btn">
      <label htmlFor="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
 
    <div className="nav-links">
      <Link to="#">Home</Link>
      <Link to="#">About</Link>

      <div className="dropdown">
        <Link className="dropBtn" to="#">Services
          <i className="fas fa-angle-down"></i>
        </Link>
        <div className="drop-content">
          <Link to="#">Web Design</Link>
          <Link to="#">Marketing</Link>
          <Link to="#">WordPress</Link>
 
          <div className="dropdown2">
            <Link className="dropBtn2" to="#">More
              <i className="fas fa-angle-right"></i>
            </Link>
            <div className="drop-content2">
              <Link to="#">HTML</Link>
              <Link to="#">CSS</Link>
              <Link to="#">JavaScript</Link>
              <Link to="#">jQuery</Link>
            </div>
          </div>
        </div>
      </div>
 
      <Link to="#">Blogs</Link>
      <Link to="#">Contact</Link>
      <button className="loginBtn">Login</button>
    </div>
 
  </div> */}
    </>
  );
};

export default Navbar;

{
  /* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={logOut}> Logout </button> */
}
