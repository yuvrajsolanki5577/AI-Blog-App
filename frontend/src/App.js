import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NewBlog from "./components/Blog/NewBlog";
import AiTitleGenerate from "./components/AIGenerated/AiTitleGenerate";
import Contact from "./components/Contact/Contact";
import ErrorPage from "./components/404ErrorPage/ErrorPage";
import Profile from "./components/Profile";
import Category from "./components/Category/Category";
import Categories from "./components/Category/Categories";
import Blog from "./components/Blog/Blog";
import AiBlogGenerate from "./components/AIGenerated/AiBlogGenerate";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/category/:categoryName" element={<Category />}/>
          <Route path="/category/Categories" element={<Categories />}/>
          <Route path="/blog/:postId" element={<Blog />} />
          <Route
            path="/ai-title-generator"
            element={<ProtectedRoute Component={AiTitleGenerate} />}
          />
          <Route
            path="/ai-blog-generator"
            element={<ProtectedRoute Component={AiBlogGenerate} />}
          />
          <Route
            path="/new-blog"
            element={<ProtectedRoute Component={NewBlog} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path="/edit-profile"
            element={<ProtectedRoute Component={EditProfile} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
