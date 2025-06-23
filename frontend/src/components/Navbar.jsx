// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { useLogoutMutation } from '../features/auth/authApi';
// import { Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
// import { useState } from 'react';

// export default function Navbar() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [logoutApi] = useLogoutMutation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logoutApi();
//       dispatch(logout());
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo with Custom SVG Icon */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2 group">
//               <svg
//                 className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition-colors duration-300"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M12 2L2 7L12 12L22 7L12 2Z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="group-hover:stroke-pink-500"
//                 />
//                 <path
//                   d="M2 17L12 22L22 17"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="group-hover:stroke-blue-500"
//                 />
//                 <path
//                   d="M2 12L12 17L22 12"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="group-hover:stroke-purple-500"
//                 />
//               </svg>
//               <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
//                 DevBlogX
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
//               >
//                 <LogOut className="h-4 w-4" />
//                 <span>Logout</span>
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-500/20 rounded-xl transition-all duration-300"
//                 >
//                   <LogIn className="h-4 w-4" />
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
//                 >
//                   <UserPlus className="h-4 w-4" />
//                   <span>Register</span>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMobileMenu}
//               className="p-2 rounded-lg text-gray-700 hover:bg-blue-500/20 transition-colors duration-300"
//             >
//               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
//             <div className="px-4 py-4 space-y-2">
//               {user ? (
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Logout</span>
//                 </button>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-500/20 rounded-xl transition-all duration-300"
//                     onClick={toggleMobileMenu}
//                   >
//                     <LogIn className="h-4 w-4" />
//                     <span>Login</span>
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
//                     onClick={toggleMobileMenu}
//                   >
//                     <UserPlus className="h-4 w-4" />
//                     <span>Register</span>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


















































import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApi';
import { Menu, X, LogIn, UserPlus, LogOut, Home, BookOpen, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items data
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "All Blogs", path: "/blog/all", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <svg
                className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-pink-500"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-blue-500"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-purple-500"
                />
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                DevBlogX
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Links */}
            <div className="flex space-x-2 mr-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-xl group transition-all duration-300"
                >
                  <item.icon className="h-4 w-4 group-hover:text-blue-600" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            
            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-500/20 rounded-xl transition-all duration-300"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-blue-500/20 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                  onClick={toggleMobileMenu}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-base font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full flex items-center space-x-2 px-4 py-3 text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500/20 rounded-xl transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="w-full flex items-center space-x-2 px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}