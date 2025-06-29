

import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter, Tag, X, ChevronDown, ChevronUp, Grid, List, Star, Flame, Zap, Users, Award, Bookmark, Heart, MessageCircle, Eye, ArrowRight, Clock } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogPosts, setFilters, setPage } from '../features/blog/blogSlice';
import {Link} from 'react-router-dom'

const AllBlogsPage = () => {
  // State for client-side filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const postsPerPage = 9;
  const dispatch = useDispatch();
  
  // Access Redux state
  const {
    posts: apiPosts,  // Array of posts from API
    currentPage: reduxCurrentPage,
    totalPages: reduxTotalPages,
    totalPosts: reduxTotalPosts,
    loading,
    error,
    filters: reduxFilters
  } = useSelector((state) => state.posts);

  // Fetch posts on mount and when filters/page changes
  useEffect(() => {
    dispatch(fetchBlogPosts({
      page: reduxCurrentPage,
      limit: postsPerPage,
      ...reduxFilters
    }));
  }, [reduxCurrentPage, reduxFilters, dispatch]);

  // Transform API data to match component structure
  const transformedPosts = apiPosts.map(post => ({
    id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.content.substring(0, 150) + '...',
    content: post.content,
    author: post.author.name,
    authorBio: "Author information",
    authorAvatar: "https://via.placeholder.com/100",
    date: post.createdAt,
    readTime: `${Math.ceil(post.content.length / 1000)} min read`,
    views: post.views || 0,
    likes: 0, // Not in API
    comments: post.comments?.length || 0,
    shares: 0, // Not in API
    category: post.category?.name || "Uncategorized",
    tags: post.tags || [],
    image: post.featuredImage?.url || "https://via.placeholder.com/800x400",
    featured: false,
    trending: false,
    difficulty: "Beginner",
    rating: 4.5,
    premium: false
  }));

  // Extract all unique categories and tags
  const categories = [...new Set(transformedPosts.map(post => post.category))];
  const allTags = [...new Set(transformedPosts.flatMap(post => post.tags))];

  // Filter posts based on selected criteria
  const filteredPosts = transformedPosts.filter(post => {
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
    (reduxCurrentPage - 1) * postsPerPage,
    reduxCurrentPage * postsPerPage
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
    dispatch(setPage(1));
  };

  // Handle page change
  const handlePageChange = (page) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold mb-2">Error Loading Content</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            {/* Filters Sidebar */}
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
                    {reduxTotalPosts} Posts Found
                  </h2>
                  {selectedCategories.length > 0 && (
                    <p className="text-gray-600">
                      Showing posts in: {selectedCategories.join(', ')}
                    </p>
                  )}
                </div>
                
                <div className="text-gray-600">
                  Page {reduxCurrentPage} of {reduxTotalPages}
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
                        
                        <Link 
                          to={`/blog/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          Read more <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Pagination */}
              {reduxTotalPages > 1 && (
                <div className="mt-8 flex justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(Math.max(reduxCurrentPage - 1, 1))}
                    disabled={reduxCurrentPage === 1}
                    className="px-4 py-2 bg-white rounded-lg shadow-md disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Prev
                  </button>
                  
                  {Array.from({ length: reduxTotalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        reduxCurrentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      } transition`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(reduxCurrentPage + 1, reduxTotalPages))}
                    disabled={reduxCurrentPage === reduxTotalPages}
                    className="px-4 py-2 bg-white rounded-lg shadow-md disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Next
                  </button>
                </div>
              )}
              
              {/* No results message */}
              {apiPosts.length === 0 && !loading && (
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