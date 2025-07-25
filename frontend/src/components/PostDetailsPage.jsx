// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPostById, toggleLike } from '../features/blog/blogSlice';
// import {
//   Calendar, Clock, Star, Heart, MessageCircle, Share2, Bookmark, ArrowUp, Tag, User, BookOpen, Twitter, Facebook, Linkedin, Eye
// } from 'lucide-react';

// const PostDetailPage = () => {
//   const { postId } = useParams(); // Changed from slug to postId
//   const dispatch = useDispatch();
//   const { selectedPost: post, loading, error } = useSelector((state) => state.posts);
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([
//     { id: 1, user: "John Doe", text: "Great insights on AI! Looking forward to more.", date: "2025-06-06" },
//     { id: 2, user: "Jane Smith", text: "WebAssembly is so exciting! Thanks for the breakdown.", date: "2025-06-05" },
//   ]);
//   const [toc, setToc] = useState([]);
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   useEffect(() => {
//     dispatch(fetchPostById(postId));
//   }, [dispatch, postId]);

//   // handle like function 
//   const handleLike = () => {
//     console.log("like button clicked", postId);
//     dispatch(toggleLike(postId));
//   }

//   useEffect(() => {
//     if (post?.content) {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(post.content, 'text/html');
//       const headings = Array.from(doc.querySelectorAll('h2')).map((h, index) => ({
//         id: `section-${index}`,
//         text: h.textContent,
//       }));
//       setToc(headings);
//     }
//   }, [post]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (window.scrollY / totalHeight) * 100;
//       setScrollProgress(progress);
//       setShowBackToTop(window.scrollY > 500);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleLike = () => {
//     setLiked(!liked);
//   };

//   const toggleBookmark = () => {
//     setBookmarked(!bookmarked);
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: post.title,
//           text: post.excerpt,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log('Share failed:', err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!');
//     }
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (comment.trim()) {
//       setComments([
//         ...comments,
//         { id: comments.length + 1, user: "Anonymous", text: comment, date: new Date().toISOString().split('T')[0] },
//       ]);
//       setComment('');
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'Beginner':
//         return 'bg-green-500';
//       case 'Intermediate':
//         return 'bg-yellow-500';
//       case 'Advanced':
//         return 'bg-red-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const scrollToSection = (sectionId) => {
//     document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (loading) return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//       <p className="mt-4 text-gray-600">Loading post...</p>
//     </div>
//   );
//   if (error) return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <p className="text-red-600">Error: {error}</p>
//       <button
//         onClick={() => dispatch(fetchPostById(postId))}
//         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
//       >
//         Retry
//       </button>
//     </div>
//   );
//   if (!post) return <div className="min-h-screen flex items-center justify-center">Post not found</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
//       {/* Reading Progress Bar */}
//       <div
//         className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
//         style={{ width: `${scrollProgress}%` }}
//       />

//       {/* Main Content */}
//       <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Image */}
//         <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
//           <img
//             src={post.image}
//             alt={post.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//           <div className="absolute bottom-0 left-0 right-0 p-8">
//             <div className="flex flex-wrap gap-2 mb-4">
//               <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
//                 {post.category}
//               </span>
//               <span className={`px-3 py-1 ${getDifficultyColor(post.difficulty)} text-white rounded-full text-sm`}>
//                 {post.difficulty}
//               </span>
//               {post.premium && (
//                 <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-medium">
//                   Premium
//                 </span>
//               )}
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               {post.title}
//             </h1>
//             <div className="flex items-center space-x-4 text-white text-sm">
//               <div className="flex items-center space-x-1">
//                 <Calendar className="h-4 w-4" />
//                 <span>{new Date(post.date).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Clock className="h-4 w-4" />
//                 <span>{post.readTime}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Star className="h-4 w-4 text-yellow-400" />
//                 <span>{post.rating}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Article Content */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           {/* Table of Contents */}
//           {toc.length > 0 && (
//             <div className="mb-8 border-b border-gray-200 pb-4">
//               <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 text-gray-900">
//                 <BookOpen className="h-5 w-5 text-blue-600" />
//                 <span>Table of Contents</span>
//               </h3>
//               <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hidden">
//                 {toc.map((section, index) => (
//                   <button
//                     key={section.id}
//                     onClick={() => scrollToSection(section.id)}
//                     onKeyDown={(e) => e.key === 'Enter' && scrollToSection(section.id)}
//                     tabIndex={0}
//                     className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-neon-blue transition-all duration-300"
//                   >
//                     {index + 1}. {section.text}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={post.authorAvatar}
//                 alt={`Avatar of ${post.author}`}
//                 className="w-12 h-12 rounded-full"
//               />
//               <div>
//                 <p className="font-semibold text-gray-900">{post.author}</p>
//                 <p className="text-sm text-gray-600">{post.authorBio}</p>
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleLike}
//                 onKeyDown={(e) => e.key === 'Enter' && handleLike()}
//                 tabIndex={0}
//                 className={`p-2 rounded-full ${liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-red-200 transition-colors`}
//               >
//                 <Heart className={`h-5 w-5 ${liked ? 'fill-red-600' : ''}`} />
//               </button>
//               <button
//                 onClick={toggleBookmark}
//                 onKeyDown={(e) => e.key === 'Enter' && toggleBookmark()}
//                 tabIndex={0}
//                 className={`p-2 rounded-full ${bookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200 transition-colors`}
//               >
//                 <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-blue-600' : ''}`} />
//               </button>
//               <button
//                 onClick={handleShare}
//                 onKeyDown={(e) => e.key === 'Enter' && handleShare()}
//                 tabIndex={0}
//                 className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//               >
//                 <Share2 className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Article Body */}
//           <div
//             className="prose prose-lg max-w-none"
//             dangerouslySetInnerHTML={{
//               __html: post.content.replace(
//                 /<h2>/g,
//                 (match, offset) => `<h2 id="section-${toc.findIndex(t => t.text === post.content.slice(offset + 4, post.content.indexOf('</h2>', offset)))}">`
//               ),
//             }}
//           />

//           {/* Tags */}
//           <div className="flex flex-wrap gap-2 mt-6">
//             {post.tags.map((tag) => (
//               <Link
//                 key={tag}
//                 to={`/tags/${tag.toLowerCase()}`}
//                 className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
//               >
//                 <Tag className="h-4 w-4" />
//                 <span>#{tag}</span>
//               </Link>
//             ))}
//           </div>

//           {/* Metrics */}
//           <div className="flex items-center space-x-6 mt-6 text-gray-600 text-sm">
//             <div className="flex items-center space-x-1">
//               <Eye className="h-4 w-4" />
//               <span>{post.views} views</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Heart className="h-4 w-4" />
//               <span>{post.likes} likes</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <MessageCircle className="h-4 w-4" />
//               <span>{post.comments} comments</span>
//             </div>
//           </div>

//           {/* Social Media Icons */}
//           <div className="mt-6 flex flex-wrap gap-4">
//             <button
//               onClick={() => window.open(`https://twitter.com/share?url=${window.location.href}&text=${post.title}`)}
//               onKeyDown={(e) => e.key === 'Enter' && window.open(`https://twitter.com/share?url=${window.location.href}&text=${post.title}`)}
//               tabIndex={0}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
//             >
//               <Twitter className="h-5 w-5" />
//               <span>Share on Twitter</span>
//             </button>
//             <button
//               onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
//               onKeyDown={(e) => e.key === 'Enter' && window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
//               tabIndex={0}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-900 hover:shadow-neon-blue transition-all duration-300"
//             >
//               <Facebook className="h-5 w-5" />
//               <span>Share on Facebook</span>
//             </button>
//             <button
//               onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`)}
//               onKeyDown={(e) => e.key === 'Enter' && window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`)}
//               tabIndex={0}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:shadow-neon-blue transition-all duration-300"
//             >
//               <Linkedin className="h-5 w-5" />
//               <span>Share on LinkedIn</span>
//             </button>
//           </div>
//         </div>

//         {/* Comments Section */}
//         <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
//           <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
//             <MessageCircle className="h-5 w-5 text-blue-600" />
//             <span>Comments ({comments.length})</span>
//           </h3>
//           <form onSubmit={handleCommentSubmit} className="mb-8">
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Add your comment..."
//               className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y text-base"
//               rows="5"
//               required
//             />
//             <button
//               type="submit"
//               className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
//             >
//               Post Comment
//             </button>
//           </form>
//           <div className="space-y-6">
//             {comments.map((c) => (
//               <div key={c.id} className="flex space-x-4">
//                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                   <User className="h-5 w-5 text-gray-600" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">{c.user}</p>
//                   <p className="text-sm text-gray-500">{c.date}</p>
//                   <p className="text-gray-700 mt-1">{c.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </article>

//       {/* Back to Top Button */}
//       {showBackToTop && (
//         <button
//           onClick={scrollToTop}
//           onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
//           tabIndex={0}
//           className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
//         >
//           <ArrowUp className="h-6 w-6" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default PostDetailPage;













































































import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchPostById, toggleLike } from '../features/blog/postsSlice';
import { fetchPostById, toggleLike } from '../features/blog/blogSlice';


import {
  Calendar, Clock, Star, Heart, MessageCircle, Share2, Bookmark, ArrowUp, Tag, User, BookOpen, Twitter, Facebook, Linkedin, Eye
} from 'lucide-react';

const PostDetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { selectedPost: post, loading, error } = useSelector((state) => state.posts);
  const { auth } = useSelector((state) => state); // Assuming auth is in your store
  const isAuthenticated = !!auth?.user?.token;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: "John Doe", text: "Great insights on AI! Looking forward to more.", date: "2025-06-06" },
    { id: 2, user: "Jane Smith", text: "WebAssembly is so exciting! Thanks for the breakdown.", date: "2025-06-05" },
  ]);
  const [toc, setToc] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post && post.id === postId) {
      setLiked(post.isLiked || false);
    }
  }, [post, postId]);

  useEffect(() => {
    if (post?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, 'text/html');
      const headings = Array.from(doc.querySelectorAll('h2')).map((h, index) => ({
        id: `section-${index}`,
        text: h.textContent,
      }));
      setToc(headings);
    }
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (!isAuthenticated) {
      alert('Please log in to like this post.');
      return;
    }
    console.log("like button clicked", postId);
    dispatch(toggleLike(postId));
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, user: "Anonymous", text: comment, date: new Date().toISOString().split('T')[0] },
      ]);
      setComment('');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500';
      case 'Intermediate':
        return 'bg-yellow-500';
      case 'Advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading post...</p>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-red-600">Error: {error}</p>
      <button
        onClick={() => dispatch(fetchPostById(postId))}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
      >
        Retry
      </button>
    </div>
  );
  if (!post) return <div className="min-h-screen flex items-center justify-center">Post not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className={`px-3 py-1 ${getDifficultyColor(post.difficulty)} text-white rounded-full text-sm`}>
                {post.difficulty}
              </span>
              {post.premium && (
                <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-medium">
                  Premium
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-white text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{post.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {toc.length > 0 && (
            <div className="mb-8 border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 text-gray-900">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>Table of Contents</span>
              </h3>
              <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hidden">
                {toc.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    onKeyDown={(e) => e.key === 'Enter' && scrollToSection(section.id)}
                    tabIndex={0}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-neon-blue transition-all duration-300"
                  >
                    {index + 1}. {section.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={post.authorAvatar}
                alt={`Avatar of ${post.author}`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-600">{post.authorBio}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                onKeyDown={(e) => e.key === 'Enter' && handleLike()}
                tabIndex={0}
                disabled={!isAuthenticated}
                className={`p-2 rounded-full ${
                  liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-red-200 transition-colors ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-red-600' : ''}`} />
              </button>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                onClick={toggleBookmark}
                onKeyDown={(e) => e.key === 'Enter' && toggleBookmark()}
                tabIndex={0}
                className={`p-2 rounded-full ${bookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200 transition-colors`}
              >
                <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-blue-600' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                onKeyDown={(e) => e.key === 'Enter' && handleShare()}
                tabIndex={0}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(
                /<h2>/g,
                (match, offset) => `<h2 id="section-${toc.findIndex(t => t.text === post.content.slice(offset + 4, post.content.indexOf('</h2>', offset)))}">`
              ),
            }}
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag.toLowerCase()}`}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                <Tag className="h-4 w-4" />
                <span>#{tag}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-6 mt-6 text-gray-600 text-sm">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{post.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{post.likes} likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments} comments</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => window.open(`https://twitter.com/share?url=${window.location.href}&text=${post.title}`)}
              onKeyDown={(e) => e.key === 'Enter' && window.open(`https://twitter.com/share?url=${window.location.href}&text=${post.title}`)}
              tabIndex={0}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
            >
              <Twitter className="h-5 w-5" />
              <span>Share on Twitter</span>
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
              onKeyDown={(e) => e.key === 'Enter' && window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
              tabIndex={0}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-900 hover:shadow-neon-blue transition-all duration-300"
            >
              <Facebook className="h-5 w-5" />
              <span>Share on Facebook</span>
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`)}
              onKeyDown={(e) => e.key === 'Enter' && window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`)}
              tabIndex={0}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:shadow-neon-blue transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
              <span>Share on LinkedIn</span>
            </button>
          </div>
        </div>
        <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <span>Comments ({comments.length})</span>
          </h3>
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y text-base"
              rows="5"
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
            >
              Post Comment
            </button>
          </form>
          <div className="space-y-6">
            {comments.map((c) => (
              <div key={c.id} className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{c.user}</p>
                  <p className="text-sm text-gray-500">{c.date}</p>
                  <p className="text-gray-700 mt-1">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
          tabIndex={0}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default PostDetailPage;