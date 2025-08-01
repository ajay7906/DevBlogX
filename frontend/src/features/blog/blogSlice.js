

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk for fetching all blog posts
// export const fetchBlogPosts = createAsyncThunk(
//   'posts/fetchBlogPosts',
//   async (params, { rejectWithValue }) => {
//     try {
//       const { page = 1, limit = 10, category, tag, search } = params;
//       const response = await axios.get('http://localhost:5000/api/blog/getAllBlog', {
//         params: { page, limit, category, tag, search }
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // Async thunk for fetching a single blog post by ID
// export const fetchPostById = createAsyncThunk(
//   'posts/fetchPostById',
//   async (postId, { rejectWithValue, getState }) => {
//     try {
//       // Check if post exists in the posts array to avoid unnecessary API call
//       const { posts } = getState().posts;
//       const cachedPost = posts.find((post) => post._id === postId);
//       if (cachedPost) {
//         // Transform cached post to match dummyPost structure
//         return {
//           id: cachedPost._id,
//           title: cachedPost.title,
//           slug: cachedPost.slug,
//           excerpt: cachedPost.content.substring(0, 150) + '...',
//           content: cachedPost.content,
//           author: cachedPost.author?.name || 'Unknown Author',
//           authorBio: 'Author information',
//           authorAvatar: cachedPost.author?.avatar || 'https://via.placeholder.com/100',
//           date: cachedPost.createdAt,
//           readTime: `${Math.ceil(cachedPost.content.length / 1000)} min read`,
//           views: cachedPost.views || 0,
//           likes: 0,
//           comments: cachedPost.comments?.length || 0,
//           shares: 0,
//           category: cachedPost.category?.name || 'Uncategorized',
//           tags: cachedPost.tags || [],
//           image: cachedPost.featuredImage?.url || 'https://via.placeholder.com/800x400',
//           featured: false,
//           trending: false,
//           difficulty: 'Beginner',
//           rating: 4.5,
//           premium: false
//         };
//       }

//       const response = await axios.get(`http://localhost:5000/api/blog/getpostbyid/${postId}`);
//       const post = response.data.data[0]; // API returns data as an array
//       if (!post) {
//         return rejectWithValue({ error: 'Blog post not found' });
//       }
//       // Transform API response to match dummyPost structure
//       return {
//         id: post._id,
//         title: post.title,
//         slug: post.slug,
//         excerpt: post.content.substring(0, 150) + '...',
//         content: post.content,
//         author: post.author?.name || 'Unknown Author',
//         authorBio: 'Author information',
//         authorAvatar: post.author?.avatar || 'https://via.placeholder.com/100',
//         date: post.createdAt,
//         readTime: `${Math.ceil(post.content.length / 1000)} min read`,
//         views: post.views || 0,
//         likes: 0,
//         comments: post.comments?.length || 0,
//         shares: 0,
//         category: post.category?.name || 'Uncategorized',
//         tags: post.tags || [],
//         image: post.featuredImage?.url || 'https://via.placeholder.com/800x400',
//         featured: false,
//         trending: false,
//         difficulty: 'Beginner',
//         rating: 4.5,
//         premium: false
//       };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { error: 'Failed to fetch post' });
//     }
//   }
// );

// // Async thunk for fetching all blog posts
// export const toggleLike = createAsyncThunk(
//   'posts/toggleLike',
//   async (postId, { rejectWithValue, getState }) => {
//     try {
//       console.log("toggle like function called");
//       const { auth } = getState();
//       const token = auth?.user?.token;
//       if (!token) return rejectWithValue({ error: 'Not authenticated' });

//       const res = await axios.put(
//         `http://localhost:5000/api/blog/toogle_like/${postId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       return { postId, isLiked: res.data.isLiked, likeCount: res.data.likeCount };
//     } catch (err) {
//       console.log("error in toggle like", err);
//       return rejectWithValue(err.response?.data || { error: 'Toggle like failed' });
//     }
//   }
// );




// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: {
//     posts: [],
//     currentPage: 1,
//     totalPages: 1,
//     totalPosts: 0,
//     selectedPost: null,
//     loading: false,
//     error: null,
//     filters: {
//       category: '',
//       tag: '',
//       search: ''
//     }
//   },
//   reducers: {
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//       state.currentPage = 1;
//     },
//     setPage: (state, action) => {
//       state.currentPage = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBlogPosts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBlogPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.posts = action.payload.posts;
//         state.currentPage = action.payload.currentPage;
//         state.totalPages = action.payload.totalPages;
//         state.totalPosts = action.payload.totalPosts;
//       })
//       .addCase(fetchBlogPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.error || 'Failed to fetch posts';
//       })
//       .addCase(fetchPostById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.selectedPost = null;
//       })
//       .addCase(fetchPostById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedPost = action.payload;
//       })
//       .addCase(fetchPostById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.error || 'Failed to fetch post';
//       })

//       // toggle like
//       .addCase(toggleLike.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(toggleLike.fulfilled, (state, action) => {
//         state.loading = false;
//         const { postId, isLiked, likeCount } = action.payload;
        
//         // Update selected post
//         if (state.selectedPost?.id === postId) {
//           state.selectedPost.likes = likeCount;
//         }
        
//         // Update post in posts list
//         const postIndex = state.posts.findIndex(post => post.id === postId);
//         if (postIndex !== -1) {
//           state.posts[postIndex].likes = likeCount;
//         }
//       })
//       .addCase(toggleLike.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.error || 'Like failed';
//       });
//   }
// });

// export const { setFilters, setPage } = postsSlice.actions;
// export default postsSlice.reducer;






































import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogPosts = createAsyncThunk(
  'posts/fetchBlogPosts',
  async (params, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, category, tag, search } = params;
      const response = await axios.get('http://localhost:5000/api/blog/getAllBlog', {
        params: { page, limit, category, tag, search }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId, { rejectWithValue, getState }) => {
    try {
      const { posts } = getState().posts;
      const cachedPost = posts.find((post) => post._id === postId);
      if (cachedPost) {
        return {
          id: cachedPost._id,
          title: cachedPost.title,
          slug: cachedPost.slug,
          excerpt: cachedPost.content.substring(0, 150) + '...',
          content: cachedPost.content,
          author: cachedPost.author?.name || 'Unknown Author',
          authorBio: 'Author information',
          authorAvatar: cachedPost.author?.avatar || 'https://via.placeholder.com/100',
          date: cachedPost.createdAt,
          readTime: `${Math.ceil(cachedPost.content.length / 1000)} min read`,
          views: cachedPost.views || 0,
          likes: cachedPost.likes || 0,
          isLiked: cachedPost.isLiked || false,
          comments: cachedPost.comments?.length || 0,
          shares: 0,
          category: cachedPost.category?.name || 'Uncategorized',
          tags: cachedPost.tags || [],
          image: cachedPost.featuredImage?.url || 'https://via.placeholder.com/800x400',
          featured: false,
          trending: false,
          difficulty: 'Beginner',
          rating: 4.5,
          premium: false
        };
      }

      const response = await axios.get(`http://localhost:5000/api/blog/getpostbyid/${postId}`);
      const post = response.data.data[0];
      if (!post) {
        return rejectWithValue({ error: 'Blog post not found' });
      }
      return {
        id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.content.substring(0, 150) + '...',
        content: post.content,
        author: post.author?.name || 'Unknown Author',
        authorBio: 'Author information',
        authorAvatar: post.author?.avatar || 'https://via.placeholder.com/100',
        date: post.createdAt,
        readTime: `${Math.ceil(post.content.length / 1000)} min read`,
        views: post.views || 0,
        likes: post.likes || 0,
        isLiked: post.isLiked || false,
        comments: post.comments?.length || 0,
        shares: 0,
        category: post.category?.name || 'Uncategorized',
        tags: post.tags || [],
        image: post.featuredImage?.url || 'https://via.placeholder.com/800x400',
        featured: false,
        trending: false,
        difficulty: 'Beginner',
        rating: 4.5,
        premium: false
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Failed to fetch post' });
    }
  }
);

export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async (postId, { rejectWithValue, getState }) => {
    try {
      console.log("toggleLike called with postId:", postId);
      const { auth } = getState();
      const token = auth?.user?.token;
      console.log("Token:", token);
      if (!token) return rejectWithValue({ error: 'Not authenticated' });

      const res = await axios.put(
        `http://localhost:5000/api/blog/toogle_like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API response:", res.data);
      return { postId, isLiked: res.data.isLiked, likeCount: res.data.likeCount };
    } catch (err) {
      console.error("Error in toggleLike:", err);
      return rejectWithValue(err.response?.data || { error: 'Toggle like failed' });
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    selectedPost: null,
    loading: false,
    error: null,
    filters: {
      category: '',
      tag: '',
      search: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch posts';
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch post';
      })
      .addCase(toggleLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, isLiked, likeCount } = action.payload;
        if (state.selectedPost?.id === postId) {
          state.selectedPost.likes = likeCount;
          state.selectedPost.isLiked = isLiked;
        }
        const postIndex = state.posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = likeCount;
          state.posts[postIndex].isLiked = isLiked;
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Like failed';
      });
  }
});

export const { setFilters, setPage } = postsSlice.actions;
export default postsSlice.reducer;