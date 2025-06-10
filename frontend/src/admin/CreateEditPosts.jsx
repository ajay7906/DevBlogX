import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Save,
  X,
  Upload,
  Trash2,
  Eye,
  BookOpen,
  Plus
} from 'lucide-react';

// Dummy data (consistent with BlogHomePage.jsx, PostDetailPage.jsx, AdminPanel.jsx)
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
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    ],
    views: 2487,
    likes: 156,
    comments: 23,
  },
  // ... (other posts from AdminPanel.jsx, updated with 'images' array)
];

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [post, setPost] = useState({
    id: isEditing ? parseInt(id) : dummyPosts.length + 1,
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
    category: '',
    tags: [],
    difficulty: '',
    images: ['', ''], // Minimum two images
    views: 0,
    likes: 0,
    comments: 0,
  });
  const [imagePreviews, setImagePreviews] = useState(['', '']);
  const [previewMode, setPreviewMode] = useState(false);

  // Load post data for editing
  useEffect(() => {
    if (isEditing) {
      const foundPost = dummyPosts.find((p) => p.id === parseInt(id));
      if (foundPost) {
        setPost(foundPost);
        setImagePreviews(foundPost.images);
      }
    }
  }, [id, isEditing]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map((t) => t.trim()) : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = previewUrl;
        return newPreviews;
      });
      setPost((prev) => {
        const newImages = [...prev.images];
        newImages[index] = previewUrl;
        return { ...prev, images: newImages };
      });
    }
  };

  // Add new image field
  const addImageField = () => {
    setPost((prev) => ({ ...prev, images: [...prev.images, ''] }));
    setImagePreviews((prev) => [...prev, '']);
  };

  // Remove image
  const removeImage = (index) => {
    setPost((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  // Handle save (simulated)
  const handleSave = () => {
    // Simulate saving to dummyPosts (in production, send to API)
    console.log('Saving post:', post);
    navigate('/admin');
  };

  // Categories and difficulties
  const categories = ['Technology', 'Development', 'Writing', 'Design'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-400" />
          <span>{isEditing ? 'Edit Post' : 'Create New Post'}</span>
        </h1>

        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30">
          {previewMode ? (
            <div className="prose prose-lg max-w-none p-6 bg-gray-700 rounded-xl text-white">
              <h1>{post.title}</h1>
              {post.images.map((img, index) => (
                img && (
                  <img
                    key={index}
                    src={img}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )
              ))}
              <p className="text-gray-300">{post.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-600 text-gray-200 rounded-md text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Metadata Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Post Metadata</h3>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  placeholder="Post Title"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                />
                <textarea
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleChange}
                  placeholder="Post Excerpt"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 resize-y"
                  rows="3"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    name="category"
                    value={post.category}
                    onChange={handleChange}
                    className="px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <select
                    name="difficulty"
                    value={post.difficulty}
                    onChange={handleChange}
                    className="px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Difficulty</option>
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="tags"
                    value={post.tags.join(', ')}
                    onChange={handleChange}
                    placeholder="Tags (comma-separated)"
                    className="px-4 py-2 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Images (Minimum 2)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.images.map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, index)}
                            className="hidden"
                            id={`image-upload-${index}`}
                          />
                          <label
                            htmlFor={`image-upload-${index}`}
                            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white border border-blue-500 rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300 cursor-pointer"
                          >
                            <Upload className="h-5 w-5 mr-2" />
                            <span>{imagePreviews[index] ? 'Change Image' : 'Upload Image'}</span>
                          </label>
                        </div>
                        {imagePreviews[index] && (
                          <button
                            onClick={() => removeImage(index)}
                            className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-neon-red transition-all duration-300"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <div className="w-full h-32 bg-gray-700 rounded-xl flex items-center justify-center border border-blue-500/30">
                        {imagePreviews[index] ? (
                          <img
                            src={imagePreviews[index]}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <p className="text-gray-400">No image selected</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addImageField}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 hover:shadow-neon-blue transition-all duration-300"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Another Image</span>
                </button>
              </div>

              {/* Content Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Post Content</h3>
                <textarea
                  name="content"
                  value={post.content}
                  onChange={handleChange}
                  placeholder="Write your post content here (supports HTML)..."
                  className="w-full px-4 py-4 bg-gray-700 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 font-mono text-sm"
                  rows="12"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all duration-300"
            >
              <X className="h-5 w-5" />
              <span>Cancel</span>
            </button>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all duration-300"
            >
              <Eye className="h-5 w-5" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-neon-blue transition-all duration-300"
            >
              <Save className="h-5 w-5" />
              <span>Save Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditPost;