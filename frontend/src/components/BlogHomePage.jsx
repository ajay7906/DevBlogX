import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Users, Calendar, Eye, Heart, MessageCircle, ArrowRight, Filter, BookmarkPlus, Share2, Clock, Star, ChevronLeft, ChevronRight, Play, Pause, Bookmark, Award, Flame, Zap, Target, Mail } from 'lucide-react';

const BlogHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [readingList, setReadingList] = useState([]);
  const [showTrendingTopics, setShowTrendingTopics] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const postsPerPage = 6;

  // Temporary blog data (as provided)
  const allPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt: "Explore the cutting-edge technologies and frameworks that will shape web development in the coming years. From AI integration to quantum computing implications...",
      content: "Full article content here...",
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
      premium: false
    },
    {
      id: 2,
      title: "Building Scalable React Applications with Redux Toolkit",
      excerpt: "Learn how to structure and manage state in large React applications using modern Redux patterns and best practices for maintainable code...",
      author: "Alex Johnson",
      authorBio: "React Specialist & Open Source Contributor",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      date: "2025-06-03",
      readTime: "12 min read",
      views: 1834,
      likes: 134,
      comments: 18,
      shares: 32,
      category: "Development",
      tags: ["React", "Redux", "JavaScript", "Architecture"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      featured: true,
      trending: false,
      difficulty: "Advanced",
      rating: 4.9,
      premium: true
    },
    {
      id: 3,
      title: "The Art of Technical Writing: A Complete Guide",
      excerpt: "Master the skills needed to create clear, engaging technical documentation that developers actually want to read and understand...",
      author: "Maria Rodriguez",
      authorBio: "Technical Writer & Developer Advocate",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      date: "2025-06-01",
      readTime: "10 min read",
      views: 3156,
      likes: 289,
      comments: 45,
      shares: 78,
      category: "Writing",
      tags: ["Documentation", "Communication", "Career"],
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
      featured: true,
      trending: true,
      difficulty: "Beginner",
      rating: 4.7,
      premium: false
    },
    {
      id: 4,
      title: "Mastering CSS Grid: Advanced Layout Techniques",
      excerpt: "Deep dive into CSS Grid with practical examples and advanced techniques for creating complex, responsive layouts...",
      author: "Emma Wilson",
      authorBio: "UI/UX Designer & Frontend Developer",
      authorAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      date: "2025-05-30",
      readTime: "15 min read",
      views: 2234,
      likes: 198,
      comments: 34,
      shares: 56,
      category: "CSS",
      tags: ["CSS", "Layout", "Design", "Responsive"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      featured: false,
      trending: true,
      difficulty: "Intermediate",
      rating: 4.6,
      premium: false
    },
    {
      id: 5,
      title: "Node.js Performance Optimization Strategies",
      excerpt: "Boost your Node.js application performance with proven optimization techniques and monitoring strategies...",
      author: "David Kim",
      authorBio: "Backend Engineer & Performance Specialist",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      date: "2025-05-28",
      readTime: "18 min read",
      views: 1876,
      likes: 167,
      comments: 29,
      shares: 41,
      category: "Backend",
      tags: ["Node.js", "Performance", "Optimization"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      featured: false,
      trending: false,
      difficulty: "Advanced",
      rating: 4.8,
      premium: true
    }
  ];

  const trendingTopics = [
    { name: "AI Development", posts: 45, growth: "+23%" },
    { name: "React 19", posts: 32, growth: "+18%" },
    { name: "WebAssembly", posts: 28, growth: "+15%" },
    { name: "Serverless", posts: 24, growth: "+12%" },
    { name: "TypeScript", posts: 41, growth: "+10%" }
  ];

  const categories = [
    { name: "All", count: allPosts.length, icon: Target },
    { name: "Technology", count: 15, icon: Zap },
    { name: "Development", count: 12, icon: Users },
    { name: "CSS", count: 8, icon: Star },
    { name: "Backend", count: 6, icon: Award },
    { name: "Writing", count: 4, icon: Flame }
  ];

  const featuredPosts = allPosts.filter(post => post.featured);
  const trendingPosts = allPosts.filter(post => post.trending);

  // Filter and sort posts
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'liked':
        return b.likes - a.likes;
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Auto-slide for featured posts
  useEffect(() => {
    if (isAutoplay && featuredPosts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % featuredPosts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoplay, featuredPosts.length]);

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        setReadingList(prev => prev.filter(id => id !== postId));
      } else {
        newSet.add(postId);
        setReadingList(prev => [...prev, postId]);
      }
      return newSet;
    });
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const sharePost = async (post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `${window.location.origin}/post/${post.id}`,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}!`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      
      {/* Hero Carousel Section */}
      <section className="relative  px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto">
          
          {/* Main Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Discover & Learn
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Dive deep into cutting-edge technology, development insights, and expert knowledge from industry leaders
            </p>
          </div>

          {/* Enhanced Search & Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="liked">Most Liked</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Featured Posts Carousel */}
          <div className="relative mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span className="text-sm">{isAutoplay ? 'Pause' : 'Play'}</span>
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentSlide(prev => prev === 0 ? featuredPosts.length - 1 : prev - 1)}
                    className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide(prev => (prev + 1) % featuredPosts.length)}
                    className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredPosts.map((post) => (
                  <div key={post.id} className="w-full flex-shrink-0">
                    <div className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 rounded-3xl overflow-hidden group cursor-pointer">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                          <span className={`px-3 py-1 ${getDifficultyColor(post.difficulty)} rounded-full text-sm text-white`}>
                            {post.difficulty}
                          </span>
                          {post.premium && (
                            <span className="px-3 py-1 bg-yellow-500 rounded-full text-sm text-black font-medium">
                              Premium
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-lg text-gray-200 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={post.authorAvatar} 
                              alt={post.author}
                              className="w-12 h-12 rounded-full border-2 border-white/20"
                            />
                            <div>
                              <p className="font-semibold">{post.author}</p>
                              <p className="text-sm text-gray-300">{post.authorBio}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trending Topics */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick Stats */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-6">Platform Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <BookmarkPlus className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-semibold">Total Articles</p>
                      <p className="text-sm text-gray-600">Published this month</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">247</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-semibold">Active Authors</p>
                      <p className="text-sm text-gray-600">Contributing regularly</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-600">86</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-semibold">Monthly Views</p>
                      <p className="text-sm text-gray-600">Across all articles</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">1.2M</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Trending Topics</h3>
                <button
                  onClick={() => setShowTrendingTopics(!showTrendingTopics)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>{showTrendingTopics ? 'Hide' : 'Show'} Trends</span>
                </button>
              </div>
              
              {showTrendingTopics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingTopics.map((topic, index) => (
                    <div 
                      key={topic.name}
                      className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                          {topic.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">{topic.growth}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{topic.posts} articles published</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(topic.posts * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Article Grid */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} articles found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {paginatedPosts.map((post) => (
              <article 
                key={post.id}
                className={`group cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                  viewMode === 'list' ? 'flex space-x-6' : ''
                }`}
              >
                <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex-1 flex' : ''
                }`}>
                  
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-80 flex-shrink-0' : ''
                  }`}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        viewMode === 'list' ? 'h-full' : 'h-48'
                      }`}
                    />
                    
                    {/* Overlay badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className={`px-2 py-1 ${getDifficultyColor(post.difficulty)} text-white rounded-full text-xs`}>
                        {post.difficulty}
                      </span>
                      {post.premium && (
                        <span className="px-2 py-1 bg-yellow-500 text-black rounded-full text-xs font-medium">
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(post.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                          bookmarkedPosts.has(post.id) 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sharePost(post);
                        }}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={post.authorAvatar} 
                          alt={post.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-700">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-600">{post.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Article Metrics and Read More */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart
                            className={`h-4 w-4 cursor-pointer ${
                              likedPosts.has(post.id) ? 'text-red-500 fill-red-500' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(post.id);
                            }}
                          />
                          <span>{post.likes} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                      <a
                        href={`/post/${post.id}`}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white rounded-lg shadow-md disabled:opacity-50 hover:bg-gray-100 transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } transition`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white rounded-lg shadow-md disabled:opacity-50 hover:bg-gray-100 transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
          <p className="text-lg mb-6">Get the latest articles, tutorials, and tech insights delivered to your inbox.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">MyBlog</h3>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/about" className="hover:text-blue-400">About</a>
            <a href="/contact" className="hover:text-blue-400">Contact</a>
            <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-400">Terms of Service</a>
          </div>
          <p>© 2025 MyBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogHomePage;