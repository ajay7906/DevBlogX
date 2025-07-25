

import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PostDetailPage from './components/PostDetailsPage';
import AdminPanel from './admin/AdminPanel';
import CreateEditPost from './admin/CreateEditPosts';
import AllBlog from './pages/AllBlog';
import Signup from './pages/SignUp';
// import Register from './pages/Register';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className=" mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/blog/:postId'  element={<PostDetailPage/>}/>
          <Route path='/blog/all' element={<AllBlog/>}/>
          <Route path='/register' element={<Signup/>}/>
          {/* <Route path="/register" element={<Register/>} /> */}

          {/* admin panel */}
          <Route path='/admin/posts' element={<AdminPanel/>}/>
          <Route path="/admin/post/new" element={<CreateEditPost />} />
          <Route path="/admin/post/:id/edit" element={<CreateEditPost />} />

        </Routes>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}