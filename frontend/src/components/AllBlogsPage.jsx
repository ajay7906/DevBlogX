import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter, Tag, X, ChevronDown, ChevronUp, Grid, List, Star, Flame, Zap, Users, Award, Bookmark, Heart, MessageCircle, Eye, ArrowRight, Clock } from 'lucide-react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchBlogPosts, setFilters, setPage} from '../features/blog/blogSlice';
const AllBlogsPage = () => {
  // State for filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const postsPerPage = 9;
  
  // Sample blog data (same as home page)
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
    },
    {
      id: 6,
      title: "TypeScript Best Practices for Large Projects",
      excerpt: "Learn how to effectively use TypeScript in enterprise-level applications with these proven best practices...",
      author: "Michael Thompson",
      authorBio: "Senior Software Engineer at TechSolutions",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      date: "2025-05-25",
      readTime: "14 min read",
      views: 2543,
      likes: 210,
      comments: 38,
      shares: 62,
      category: "Development",
      tags: ["TypeScript", "JavaScript", "Best Practices"],
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&h=400&fit=crop",
      featured: false,
      trending: true,
      difficulty: "Intermediate",
      rating: 4.7,
      premium: false
    },
    {
      id: 7,
      title: "Building Accessible Web Applications",
      excerpt: "Create web applications that everyone can use by following these accessibility guidelines and techniques...",
      author: "Jennifer Lee",
      authorBio: "Accessibility Specialist & Frontend Developer",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      date: "2025-05-22",
      readTime: "11 min read",
      views: 1987,
      likes: 176,
      comments: 27,
      shares: 49,
      category: "Development",
      tags: ["Accessibility", "UI", "Inclusive Design"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      featured: false,
      trending: false,
      difficulty: "Intermediate",
      rating: 4.9,
      premium: false
    },
    {
      id: 8,
      title: "The Ultimate Guide to Docker for Developers",
      excerpt: "Master containerization with Docker to streamline your development workflow and deployment process...",
      author: "Robert Davis",
      authorBio: "DevOps Engineer & Cloud Specialist",
      authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      date: "2025-05-18",
      readTime: "20 min read",
      views: 3120,
      likes: 254,
      comments: 42,
      shares: 71,
      category: "DevOps",
      tags: ["Docker", "Containers", "DevOps"],
      image: "https://images.unsplash.com/photo-1625832018968-0a4d0dda9d4d?w=800&h=400&fit=crop",
      featured: true,
      trending: true,
      difficulty: "Advanced",
      rating: 4.8,
      premium: true
    },
    {
      id: 9,
      title: "Getting Started with GraphQL",
      excerpt: "Learn the fundamentals of GraphQL and how to implement it in your next project for efficient data fetching...",
      author: "Sophia Williams",
      authorBio: "Full Stack Developer & API Specialist",
      authorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
      date: "2025-05-15",
      readTime: "9 min read",
      views: 1872,
      likes: 143,
      comments: 21,
      shares: 37,
      category: "API",
      tags: ["GraphQL", "API", "Backend"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      featured: false,
      trending: false,
      difficulty: "Beginner",
      rating: 4.5,
      premium: false
    }
  ];

  // Extract all unique categories and tags
  const categories = [...new Set(allPosts.map(post => post.category))];
  const allTags = [...new Set(allPosts.flatMap(post => post.tags))];

  // Filter posts based on selected criteria
  const filteredPosts = allPosts.filter(post => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(post.category);
    
    // Tag filter
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.every(tag => post.tags.includes(tag));
    
    // Date filter
    const postDate = new Date(post.date);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    
    let matchesDate = true;
    if (startDate && postDate < startDate) matchesDate = false;
    if (endDate && postDate > endDate) matchesDate = false;
    
    return matchesSearch && matchesCategory && matchesTags && matchesDate;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
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
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setDateRange({ start: '', end: '' });
    setSortBy('latest');
    setCurrentPage(1);
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Blog Posts</h1>
          <p className="text-xl max-w-3xl">
            Explore our complete collection of articles, tutorials, and insights on technology and development
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, tags, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Most Popular</option>
                  <option value="liked">Most Liked</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              {/* Filter Toggle Button */}
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
            
            {/* Active Filters */}
            {(searchQuery || selectedCategories.length > 0 || selectedTags.length > 0 || dateRange.start || dateRange.end) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="flex items-center bg-blue-100 rounded-full px-3 py-1 text-sm">
                    <span>Search: "{searchQuery}"</span>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {selectedCategories.map(category => (
                  <div key={category} className="flex items-center bg-purple-100 rounded-full px-3 py-1 text-sm">
                    <span>Category: {category}</span>
                    <button 
                      onClick={() => toggleCategory(category)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {selectedTags.map(tag => (
                  <div key={tag} className="flex items-center bg-green-100 rounded-full px-3 py-1 text-sm">
                    <span>Tag: {tag}</span>
                    <button 
                      onClick={() => toggleTag(tag)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {(dateRange.start || dateRange.end) && (
                  <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1 text-sm">
                    <span>
                      {dateRange.start && `From: ${dateRange.start}`}
                      {dateRange.end && ` To: ${dateRange.end}`}
                    </span>
                    <button 
                      onClick={() => setDateRange({ start: '', end: '' })}
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={resetFilters}
                  className="flex items-center text-red-600 hover:text-red-800 text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar (always visible on large screens, conditional on mobile) */}
            <div className={`lg:col-span-1 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button 
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                    onClick={() => setIsFiltersOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Categories Filter */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-3 flex items-center">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label 
                          htmlFor={`category-${category}`} 
                          className="ml-2 text-gray-700"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags Filter */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Date Range Filter */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Date Range
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">From</label>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">To</label>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Reset Button */}
                <button
                  onClick={resetFilters}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
            
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {filteredPosts.length} Posts Found
                  </h2>
                  {selectedCategories.length > 0 && (
                    <p className="text-gray-600">
                      Showing posts in: {selectedCategories.join(', ')}
                    </p>
                  )}
                </div>
                
                <div className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
              
              {/* Blog Grid/List */}
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
              }>
                {paginatedPosts.map(post => (
                  <article 
                    key={post.id}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`${viewMode === 'list' ? 'w-1/3' : 'w-full'}`}>
                      <div className="relative aspect-video">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        {post.featured && (
                          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            Featured
                          </div>
                        )}
                        {post.trending && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Trending
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={`p-5 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {post.category}
                        </span>
                        <span className={`px-2 py-1 ${getDifficultyColor(post.difficulty)} text-xs rounded-full`}>
                          {post.difficulty}
                        </span>
                        {post.premium && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={post.authorAvatar} 
                            alt={post.author}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <p className="text-sm font-medium">{post.author}</p>
                            <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-xs">{post.readTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            <span className="text-xs">{post.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                        <div className="flex space-x-4 text-gray-500 text-sm">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        
                        <a 
                          href={`/post/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          Read more <ArrowRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white rounded-lg shadow-md disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Prev
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
                    Next
                  </button>
                </div>
              )}
              
              {/* No results message */}
              {filteredPosts.length === 0 && (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No matching posts found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Newsletter */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-lg mb-6">Subscribe to our newsletter and stay informed about the latest articles and trends.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-5 pr-4 py-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
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
          <h3 className="text-2xl font-bold mb-4">DevBlog</h3>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/about" className="hover:text-blue-400">About</a>
            <a href="/contact" className="hover:text-blue-400">Contact</a>
            <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-400">Terms of Service</a>
          </div>
          <p>© 2025 DevBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AllBlogsPage;