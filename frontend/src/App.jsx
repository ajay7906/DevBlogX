// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

























import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PostDetailPage from './components/PostDetailsPage';
import AdminPanel from './admin/AdminPanel';
import CreateEditPost from './admin/CreateEditPosts';
// import Register from './pages/Register';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className=" mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/blog/details'  element={<PostDetailPage/>}/>
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