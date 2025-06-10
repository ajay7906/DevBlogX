// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Calendar,
//   Clock,
//   Star,
//   Heart,
//   MessageCircle,
//   Share2,
//   Bookmark,
//   ArrowUp,
//   Tag,
//   User,
//   BookOpen,
//   Twitter,
//   Facebook,
//   Linkedin,
//   Eye
// } from 'lucide-react';

// // Single dummy post data (matching BlogHomePage.jsx allPosts structure)
// const dummyPost = {
//   id: 1,
//   title: "The Future of Web Development: Trends to Watch in 2025",
//   excerpt: "Explore the cutting-edge technologies and frameworks that will shape web development in the coming years. From AI integration to quantum computing implications...",
//   content: `
//     <h2>Introduction</h2>
//     <p>Web development is evolving at an unprecedented pace. As we approach 2025, new technologies are redefining how we build and interact with the web. This article explores key trends, including AI-driven development, WebAssembly, and the rise of low-code platforms.</p>
    
//     <h2>AI-Driven Development</h2>
//     <p>Artificial intelligence is transforming web development by automating tasks like code generation, testing, and UX design. Tools like GitHub Copilot are just the beginning. By 2025, expect AI to play a central role in creating responsive, personalized web experiences.</p>
    
//     <h2>WebAssembly and Performance</h2>
//     <p>WebAssembly (Wasm) enables near-native performance in the browser, making it ideal for complex applications like games and editors. Frameworks like Blazor and Rust-based Yew are gaining traction, offering developers powerful tools for high-performance web apps.</p>
    
//     <h2>Low-Code and No-Code Platforms</h2>
//     <p>Platforms like Webflow and Bubble are democratizing web development, allowing non-coders to build sophisticated applications. These tools are becoming more powerful, integrating with APIs and enabling rapid prototyping.</p>
    
//     <h2>Conclusion</h2>
//     <p>The future of web development is bright, with technologies like AI, WebAssembly, and low-code platforms leading the way. Developers who embrace these trends will be well-positioned to create innovative, user-centric web experiences.</p>
//   `,
//   author: "Sarah Chen",
//   authorBio: "Senior Full Stack Developer at TechCorp",
//   authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//   date: "2025-06-05",
//   readTime: "8 min read",
//   views: 2487,
//   likes: 156,
//   comments: 23,
//   shares: 45,
//   category: "Technology",
//   tags: ["React", "AI", "WebDev", "Future"],
//   image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
//   featured: true,
//   trending: true,
//   difficulty: "Intermediate",
//   rating: 4.8,
//   premium: false,
// };

// const PostDetailPage = () => {
//   const [post] = useState(dummyPost);
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

//   // Generate Table of Contents from content headings
//   useEffect(() => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(post.content, 'text/html');
//     const headings = Array.from(doc.querySelectorAll('h2')).map((h, index) => ({
//       id: `section-${index}`,
//       text: h.textContent,
//     }));
//     setToc(headings);
//   }, [post]);

//   // Reading progress bar
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

//         {/* Main Content Area */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Article Content */}
//           <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-8">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={post.authorAvatar}
//                   alt={post.author}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-900">{post.author}</p>
//                   <p className="text-sm text-gray-600">{post.authorBio}</p>
//                 </div>
//               </div>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={toggleLike}
//                   className={`p-2 rounded-full ${liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-red-200 transition-colors`}
//                 >
//                   <Heart className={`h-5 w-5 ${liked ? 'fill-red-600' : ''}`} />
//                 </button>
//                 <button
//                   onClick={toggleBookmark}
//                   className={`p-2 rounded-full ${bookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200 transition-colors`}
//                 >
//                   <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-blue-600' : ''}`} />
//                 </button>
//                 <button
//                   onClick={handleShare}
//                   className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//                 >
//                   <Share2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Article Body */}
//             <div
//               className="prose prose-lg max-w-none"
//               dangerouslySetInnerHTML={{
//                 __html: post.content.replace(
//                   /<h2>/g,
//                   (match, offset) => `<h2 id="section-${toc.findIndex(t => t.text === post.content.slice(offset + 4, post.content.indexOf('</h2>', offset)))}">`
//                 ),
//               }}
//             />

//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mt-6">
//               {post.tags.map((tag) => (
//                 <Link
//                   key={tag}
//                   to={`/tags/${tag.toLowerCase()}`}
//                   className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
//                 >
//                   <Tag className="h-4 w-4" />
//                   <span>#{tag}</span>
//                 </Link>
//               ))}
//             </div>

//             {/* Metrics */}
//             <div className="flex items-center space-x-6 mt-6 text-gray-600 text-sm">
//               <div className="flex items-center space-x-1">
//                 <Eye className="h-4 w-4" />
//                 <span>{post.views} views</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Heart className="h-4 w-4" />
//                 <span>{post.likes} likes</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <MessageCircle className="h-4 w-4" />
//                 <span>{post.comments} comments</span>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar (Table of Contents) */}
//           <aside className="lg:col-span-1 hidden lg:block sticky top-20 self-start">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
//                 <BookOpen className="h-5 w-5 text-blue-600" />
//                 <span>Table of Contents</span>
//               </h3>
//               <ul className="space-y-2">
//                 {toc.map((section, index) => (
//                   <li key={section.id}>
//                     <button
//                       onClick={() => scrollToSection(section.id)}
//                       className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
//                     >
//                       {index + 1}. {section.text}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </aside>
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
//               className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
//               rows="4"
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

//       {/* Social Sharing Floating Bar */}
//       <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
//         <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
//           <button
//             onClick={() => window.open(`https://twitter.com/share?url=${window.location.href}&text=${post.title}`)}
//             className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
//           >
//             <Twitter className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
//             className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
//           >
//             <Facebook className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`)}
//             className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
//           >
//             <Linkedin className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Back to Top Button */}
//       {showBackToTop && (
//         <button
//           onClick={scrollToTop}
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
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowUp,
  Tag,
  User,
  BookOpen,
  Twitter,
  Facebook,
  Linkedin,
  Eye
} from 'lucide-react';

// Single dummy post data (matching BlogHomePage.jsx allPosts structure)
const dummyPost = {
  id: 1,
  title: "The Future of Web Development: Trends to Watch in 2025",
  excerpt: "Explore the cutting-edge technologies and frameworks that will shape web development in the coming years. From AI integration to quantum computing implications...",
  content: `
    <h2>Introduction</h2>
    <p>Web development is evolving at an unprecedented pace. As we approach 2025, new technologies are redefining how we build and interact with the web. This article explores key trends, including AI-driven development, WebAssembly, and the rise of low-code platforms.</p>
    
    <h2>AI-Driven Development</h2>
    <p>Artificial intelligence is transforming web development by automating tasks like code generation, testing, and UX design. Tools like GitHub Copilot are just the beginning. By 2025, expect AI to play a central role in creating responsive, personalized web experiences.</p>
    
    <h2>WebAssembly and Performance</h2>
    <p>WebAssembly (Wasm) enables near-native performance in the browser, making it ideal for complex applications like games and editors. Frameworks like Blazor and Rust-based Yew are gaining traction, offering developers powerful tools for high-performance web apps.</p>
    
    <h2>Low-Code and No-Code Platforms</h2>
    <p>Platforms like Webflow and Bubble are democratizing web development, allowing non-coders to build sophisticated applications. These tools are becoming more powerful, integrating with APIs and enabling rapid prototyping.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development is bright, with technologies like AI, WebAssembly, and low-code platforms leading the way. Developers who embrace these trends will be well-positioned to create innovative, user-centric web experiences.</p>
  `,
  author: "Sarah Chen",
  authorBio: "Senior Full Stack Developer at TechCorp",
  authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  date: "2025-06-05",
  readTime: "8 min read",
  views: 2487,
  likes: 156,
  comments: 23,
  shares: 45,
  category: "Technology",
  tags: ["React", "AI", "WebDev", "Future"],
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
  featured: true,
  trending: true,
  difficulty: "Intermediate",
  rating: 4.8,
  premium: false,
};

const PostDetailPage = () => {
  const [post] = useState(dummyPost);
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

  // Generate Table of Contents from content headings
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2')).map((h, index) => ({
      id: `section-${index}`,
      text: h.textContent,
    }));
    setToc(headings);
  }, [post]);

  // Reading progress bar
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

  const toggleLike = () => {
    setLiked(!liked);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Image */}
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

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Table of Contents (Moved to Top) */}
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
                alt={post.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-600">{post.authorBio}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={toggleLike}
                className={`p-2 rounded-full ${liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-red-200 transition-colors`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-red-600' : ''}`} />
              </button>
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-full ${bookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200 transition-colors`}
              >
                <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-blue-600' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(
                /<h2>/g,
                (match, offset) => `<h2 id="section-${toc.findIndex(t => t.text === post.content.slice(offset + 4, post.content.indexOf('</h2>', offset)))}">`
              ),
            }}
          />

          {/* Tags */}
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

          {/* Metrics */}
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

          {/* Social Media Icons (Moved Below Tags and Metrics) */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => window.open(`https://twitter.com/share?url=${window.location.href}&text=${post.title}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
            >
              <Twitter className="h-5 w-5" />
              <span>Share on Twitter</span>
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-900 hover:shadow-neon-blue transition-all duration-300"
            >
              <Facebook className="h-5 w-5" />
              <span>Share on Facebook</span>
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:shadow-neon-blue transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
              <span>Share on LinkedIn</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
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

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default PostDetailPage;