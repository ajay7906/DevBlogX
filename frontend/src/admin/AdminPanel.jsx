// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Search,
//   Filter,
//   Trash2,
//   Edit,
//   Plus,
//   X,
//   Calendar,
//   Tag,
//   Eye,
//   Heart,
//   MessageCircle,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   Save,
//   Eye as Preview,
// } from 'lucide-react';

// // Dummy data (consistent with BlogHomePage.jsx and PostDetailPage.jsx)
// const dummyPosts = [
//   {
//     id: 1,
//     title: "The Future of Web Development: Trends to Watch in 2025",
//     excerpt: "Explore the cutting-edge technologies and frameworks that will shape web development...",
//     content: "<h2>Introduction</h2><p>Web development is evolving at an unprecedented pace...</p>",
//     author: "Sarah Chen",
//     date: "2025-06-05",
//     category: "Technology",
//     tags: ["React", "AI", "WebDev", "Future"],
//     difficulty: "Intermediate",
//     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
//     views: 2487,
//     likes: 156,
//     comments: 23,
//   },
//   {
//     id: 2,
//     title: "Building Scalable React Applications with Redux Toolkit",
//     excerpt: "Learn how to structure and manage state in large React applications...",
//     author: "Alex Johnson",
//     date: "2025-06-03",
//     category: "Development",
//     tags: ["React", "Redux", "JavaScript"],
//     difficulty: "Advanced",
//     image: "https://images.unsplash.com/photo-1631499645785-1658abf4ff4e?w=400&h=300&fit=crop",
//     views: 1834,
//     likes: 134,
//     comments: 18,
//   },
//   {
//     id: 3,
//     title: "The Art of Technical Writing: A Complete Guide",
//     excerpt: "Master the skills needed to create clear, engaging technical documentation...",
//     author: "Maria Rodriguez",
//     date: "2025-06-01",
//     category: "Writing",
//     tags: ["Documentation", "Communication"],
//     difficulty: "Beginner",
//     image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
//     views: 3156,
//     likes: 289,
//     comments: 45,
//   },
//   {
//     id: 4,
//     title: "Mastering CSS Grid: A Comprehensive Tutorial",
//     excerpt: "Dive into CSS Grid and learn how to create responsive layouts with ease...",
//     author: "Sarah Chen",
//     date: "2025-05-28",
//     category: "Design",
//     tags: ["CSS", "WebDesign", "Frontend"],
//     difficulty: "Intermediate",
//     image: "https://images.unsplash.com/photo-1507721999472-8ed4420907f5?w=400&h=300&fit=crop",
//     views: 1423,
//     likes: 87,
//     comments: 12,
//   },
//   {
//     id: 5,
//     title: "Introduction to GraphQL: Building Modern APIs",
//     excerpt: "Discover the power of GraphQL for building flexible and efficient APIs...",
//     author: "Alex Johnson",
//     date: "2025-05-25",
//     category: "Development",
//     tags: ["GraphQL", "API", "Backend"],
//     difficulty: "Advanced",
//     image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
//     views: 2109,
//     likes: 176,
//     comments: 29,
//   },
// ];

// const AdminPanel = () => {
//   const [posts, setPosts] = useState(dummyPosts);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [difficultyFilter, setDifficultyFilter] = useState('');
//   const [sortBy, setSortBy] = useState('date-desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPosts, setSelectedPosts] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditorModal, setShowEditorModal] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const [previewMode, setPreviewMode] = useState(false);
//   const postsPerPage = 5;

//   // Filter and sort posts
//   const filteredPosts = posts
//     .filter((post) =>
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.author.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter((post) => (categoryFilter ? post.category === categoryFilter : true))
//     .filter((post) => (difficultyFilter ? post.difficulty === difficultyFilter : true))
//     .sort((a, b) => {
//       if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
//       if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
//       if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
//       if (sortBy === 'views-desc') return b.views - a.views;
//       return 0;
//     });

//   // Pagination
//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
//   const paginatedPosts = filteredPosts.slice(
//     (currentPage - 1) * postsPerPage,
//     currentPage * postsPerPage
//   );

//   // Handle post selection for bulk delete
//   const toggleSelectPost = (id) => {
//     setSelectedPosts((prev) =>
//       prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
//     );
//   };

//   // Handle bulk delete
//   const handleBulkDelete = () => {
//     setPosts(posts.filter((post) => !selectedPosts.includes(post.id)));
//     setSelectedPosts([]);
//     setShowDeleteModal(false);
//   };

//   // Handle single delete
//   const handleDelete = (id) => {
//     setSelectedPosts([id]);
//     setShowDeleteModal(true);
//   };

//   // Handle edit
//   const handleEdit = (post) => {
//     setEditingPost({ ...post });
//     setShowEditorModal(true);
//     setPreviewMode(false);
//   };

//   // Handle new post
//   const handleNewPost = () => {
//     setEditingPost({
//       id: posts.length + 1,
//       title: '',
//       excerpt: '',
//       content: '',
//       author: 'Admin',
//       date: new Date().toISOString().split('T')[0],
//       category: '',
//       tags: [],
//       difficulty: '',
//       image: '',
//       views: 0,
//       likes: 0,
//       comments: 0,
//     });
//     setShowEditorModal(true);
//     setPreviewMode(false);
//   };

//   // Handle editor save (simulated)
//   const handleSavePost = () => {
//     if (editingPost.id > posts.length) {
//       setPosts([...posts, editingPost]);
//     } else {
//       setPosts(posts.map((p) => (p.id === editingPost.id ? editingPost : p)));
//     }
//     setShowEditorModal(false);
//     setEditingPost(null);
//   };

//   // Handle editor input changes
//   const handleEditorChange = (e) => {
//     const { name, value } = e.target;
//     setEditingPost((prev) => ({
//       ...prev,
//       [name]: name === 'tags' ? value.split(',').map((t) => t.trim()) : value,
//     }));
//   };

//   // Categories and difficulties for filters
//   const categories = [...new Set(dummyPosts.map((p) => p.category))];
//   const difficulties = [...new Set(dummyPosts.map((p) => p.difficulty))];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-2">
//           <BookOpen className="h-8 w-8 text-blue-600" />
//           <span>Admin Panel - Manage Blogs</span>
//         </h1>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by title or author..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>
//             {/* Category Filter */}
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//             >
//               <option value="">All Categories</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//             {/* Difficulty Filter */}
//             <select
//               value={difficultyFilter}
//               onChange={(e) => setDifficultyFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//             >
//               <option value="">All Difficulties</option>
//               {difficulties.map((diff) => (
//                 <option key={diff} value={diff}>{diff}</option>
//               ))}
//             </select>
//             {/* Sort By */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//             >
//               <option value="date-desc">Newest First</option>
//               <option value="date-asc">Oldest First</option>
//               <option value="title-asc">Title A-Z</option>
//               <option value="views-desc">Most Viewed</option>
//             </select>
//           </div>
//           {selectedPosts.length > 0 && (
//             <button
//               onClick={() => setShowDeleteModal(true)}
//               className="mt-4 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
//             >
//               <Trash2 className="h-5 w-5" />
//               <span>Delete Selected ({selectedPosts.length})</span>
//             </button>
//           )}
//         </div>

//         {/* Blog List */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
//             <div className="col-span-1 flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedPosts.length === paginatedPosts.length}
//                 onChange={() =>
//                   setSelectedPosts(
//                     selectedPosts.length === paginatedPosts.length
//                       ? []
//                       : paginatedPosts.map((p) => p.id)
//                   )
//                 }
//                 className="h-4 w-4 text-blue-600 rounded"
//               />
//             </div>
//             <div className="col-span-3">Title</div>
//             <div className="col-span-2">Author</div>
//             <div className="col-span-2">Category</div>
//             <div className="col-span-2">Metrics</div>
//             <div className="col-span-2">Actions</div>
//           </div>
//           {paginatedPosts.map((post) => (
//             <div
//               key={post.id}
//               className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
//             >
//               <div className="col-span-1 flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={selectedPosts.includes(post.id)}
//                   onChange={() => toggleSelectPost(post.id)}
//                   className="h-4 w-4 text-blue-600 rounded"
//                 />
//               </div>
//               <div className="col-span-3 flex items-center space-x-4">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-16 h-12 object-cover rounded-md"
//                 />
//                 <div>
//                   <p className="font-medium text-gray-900 truncate">{post.title}</p>
//                   <p className="text-sm text-gray-600 truncate">{post.excerpt}</p>
//                 </div>
//               </div>
//               <div className="col-span-2 flex items-center">
//                 <span className="text-gray-700">{post.author}</span>
//               </div>
//               <div className="col-span-2 flex items-center flex-wrap gap-2">
//                 <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
//                   {post.category}
//                 </span>
//                 <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-md text-sm">
//                   {post.difficulty}
//                 </span>
//               </div>
//               <div className="col-span-2 flex items-center space-x-4 text-sm text-gray-600">
//                 <div className="flex items-center space-x-1">
//                   <Eye className="h-4 w-4" />
//                   <span>{post.views}</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Heart className="h-4 w-4" />
//                   <span>{post.likes}</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <MessageCircle className="h-4 w-4" />
//                   <span>{post.comments}</span>
//                 </div>
//               </div>
//               <div className="col-span-2 flex items-center space-x-4">
//                 <button
//                   onClick={() => handleEdit(post)}
//                   className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
//                 >
//                   <Edit className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(post.id)}
//                   className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
//                 >
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-6">
//           <p className="text-sm text-gray-600">
//             Showing {(currentPage - 1) * postsPerPage + 1} to{' '}
//             {Math.min(currentPage * postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
//           </p>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-all duration-300"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 rounded-xl ${
//                   currentPage === page
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white'
//                 } transition-all duration-300`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-all duration-300"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Delete Confirmation Modal */}
//         {showDeleteModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-6 max-w-md w-full">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 Confirm Deletion
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Are you sure you want to delete {selectedPosts.length} post(s)? This action cannot be undone.
//               </p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleBulkDelete}
//                   className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Editor Modal */}
//         {showEditorModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
//             <div className="bg-white rounded-2xl p-6 max-w-4xl w-full my-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   {editingPost?.id > posts.length ? 'Create New Post' : 'Edit Post'}
//                 </h3>
//                 <button
//                   onClick={() => setShowEditorModal(false)}
//                   className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               {previewMode ? (
//                 <div className="prose prose-lg max-w-none p-6 bg-gray-50 rounded-xl">
//                   <h1>{editingPost.title}</h1>
//                   <p className="text-gray-600">{editingPost.excerpt}</p>
//                   <div dangerouslySetInnerHTML={{ __html: editingPost.content }} />
//                   <div className="flex flex-wrap gap-2 mt-4">
//                     {editingPost.tags.map((tag) => (
//                       <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
//                         #{tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     name="title"
//                     value={editingPost?.title || ''}
//                     onChange={handleEditorChange}
//                     placeholder="Post Title"
//                     className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   />
//                   <textarea
//                     name="excerpt"
//                     value={editingPost?.excerpt || ''}
//                     onChange={handleEditorChange}
//                     placeholder="Post Excerpt"
//                     className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
//                     rows="3"
//                   />
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <select
//                       name="category"
//                       value={editingPost?.category || ''}
//                       onChange={handleEditorChange}
//                       className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     <select
//                       name="difficulty"
//                       value={editingPost?.difficulty || ''}
//                       onChange={handleEditorChange}
//                       className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//                     >
//                       <option value="">Select Difficulty</option>
//                       {difficulties.map((diff) => (
//                         <option key={diff} value={diff}>{diff}</option>
//                       ))}
//                     </select>
//                     <input
//                       type="text"
//                       name="tags"
//                       value={editingPost?.tags.join(', ') || ''}
//                       onChange={handleEditorChange}
//                       placeholder="Tags (comma-separated)"
//                       className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//                     />
//                   </div>
//                   <input
//                     type="text"
//                     name="image"
//                     value={editingPost?.image || ''}
//                     onChange={handleEditorChange}
//                     placeholder="Image URL"
//                     className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   />
//                   <textarea
//                     name="content"
//                     value={editingPost?.content || ''}
//                     onChange={handleEditorChange}
//                     placeholder="Write your post content here (supports HTML)..."
//                     className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y font-mono text-sm"
//                     rows="10"
//                   />
//                 </div>
//               )}
//               <div className="flex justify-end space-x-4 mt-6">
//                 <button
//                   onClick={() => setPreviewMode(!previewMode)}
//                   className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300"
//                 >
//                   <Preview className="h-5 w-5" />
//                   <span>{previewMode ? 'Edit' : 'Preview'}</span>
//                 </button>
//                 <button
//                   onClick={handleSavePost}
//                   className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
//                 >
//                   <Save className="h-5 w-5" />
//                   <span>Save Post</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Floating New Post Button */}
//         <button
//           onClick={handleNewPost}
//           className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300 hover:scale-110"
//         >
//           <Plus className="h-6 w-6" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;














import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Trash2,
  Edit,
  Plus,
  Calendar,
  Tag,
  Eye,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

// Dummy data (updated with images array)
const dummyPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore the cutting-edge technologies and frameworks that will shape web development...",
    content: "<h2>Introduction</h2><p>Web development is evolving at an unprecedented pace...</p>",
    author: "Sarah Chen",
    date: "2025-06-05",
    category: "Technology",
    tags: ["React", "AI", "WebDev", "Future"],
    difficulty: "Intermediate",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    ],
    views: 2487,
    likes: 156,
    comments: 23,
  },
  {
    id: 2,
    title: "Building Scalable React Applications with Redux Toolkit",
    excerpt: "Learn how to structure and manage state in large React applications...",
    author: "Alex Johnson",
    date: "2025-06-03",
    category: "Development",
    tags: ["React", "Redux", "JavaScript"],
    difficulty: "Advanced",
    images: [
      "https://images.unsplash.com/photo-1631499645785-1658abf4ff4e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507721999472-8ed4420907f5?w=400&h=300&fit=crop",
    ],
    views: 1834,
    likes: 134,
    comments: 18,
  },
  {
    id: 3,
    title: "The Art of Technical Writing: A Complete Guide",
    excerpt: "Master the skills needed to create clear, engaging technical documentation...",
    author: "Maria Rodriguez",
    date: "2025-06-01",
    category: "Writing",
    tags: ["Documentation", "Communication"],
    difficulty: "Beginner",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    ],
    views: 3156,
    likes: 289,
    comments: 45,
  },
  {
    id: 4,
    title: "Mastering CSS Grid: A Comprehensive Tutorial",
    excerpt: "Dive into CSS Grid and learn how to create responsive layouts with ease...",
    author: "Sarah Chen",
    date: "2025-05-28",
    category: "Design",
    tags: ["CSS", "WebDesign", "Frontend"],
    difficulty: "Intermediate",
    images: [
      "https://images.unsplash.com/photo-1507721999472-8ed4420907f5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1631499645785-1658abf4ff4e?w=400&h=300&fit=crop",
    ],
    views: 1423,
    likes: 87,
    comments: 12,
  },
  {
    id: 5,
    title: "Introduction to GraphQL: Building Modern APIs",
    excerpt: "Discover the power of GraphQL for building flexible and efficient APIs...",
    author: "Alex Johnson",
    date: "2025-05-25",
    category: "Development",
    tags: ["GraphQL", "API", "Backend"],
    difficulty: "Advanced",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    ],
    views: 2109,
    likes: 176,
    comments: 29,
  },
];

const AdminPanel = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const postsPerPage = 5;

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((post) => (categoryFilter ? post.category === categoryFilter : true))
    .filter((post) => (difficultyFilter ? post.difficulty === difficultyFilter : true))
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'views-desc') return b.views - a.views;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handle post selection
  const toggleSelectPost = (id) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    setPosts(posts.filter((post) => !selectedPosts.includes(post.id)));
    setSelectedPosts([]);
    setShowDeleteModal(false);
  };

  // Handle single delete
  const handleDelete = (id) => {
    setSelectedPosts([id]);
    setShowDeleteModal(true);
  };

  // Handle new post
  const handleNewPost = () => {
    navigate('/admin/post/new');
  };

  // Categories and difficulties
  const categories = [...new Set(dummyPosts.map((p) => p.category))];
  const difficulties = [...new Set(dummyPosts.map((p) => p.difficulty))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-400" />
          <span>Admin Dashboard - Manage Blogs</span>
        </h1>

        {/* Filters and Search */}
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-blue-500/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Difficulties</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="views-desc">Most Viewed</option>
            </select>
          </div>
          {selectedPosts.length > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="mt-4 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete Selected ({selectedPosts.length})</span>
            </button>
          )}
        </div>

        {/* Blog List (Cards) */}
        <div className="grid grid-cols-1 gap-6">
          {paginatedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400 hover:shadow-neon-blue transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={post.images[0] || 'https://via.placeholder.com/400x300'}
                    alt={post.title}
                    className="w-48 h-32 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => toggleSelectPost(post.id)}
                        className="h-4 w-4 text-blue-400 rounded border-gray-600 focus:ring-blue-400"
                      />
                      <h3 className="text-lg font-bold text-white truncate">{post.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/post/${post.id}/edit`}
                        className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm">{post.category}</span>
                    <span className="px-2 py-1 bg-yellow-600 text-black rounded-md text-sm">{post.difficulty}</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-600 text-gray-200 rounded-md text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-4 border border-blue-500/30">
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * postsPerPage + 1} to{' '}
            {Math.min(currentPage * postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white'
                } transition-all duration-300`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete {selectedPosts.length} post(s)? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating New Post Button */}
        <button
          onClick={handleNewPost}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300 hover:scale-110"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;