// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk for fetching blog posts
// export const fetchBlogPosts = createAsyncThunk(
//   'posts/fetchBlogPosts',
//   async (params, { rejectWithValue }) => {
//     try {
//       const { page = 1, limit = 10, category, tag, search } = params;
//       const response = await axios.get('http://localhost:5000/api/blog/getAllBlog', {
//         params: { page, limit, category, tag, search }
//       });
//       console.log('Fetched posts:', response.data);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
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
//       state.currentPage = 1; // Reset to first page when filters change
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
//       });
//   }
// });

// export const { setFilters, setPage } = postsSlice.actions;
// export default postsSlice.reducer;



































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
//       console.log('Fetched posts:', response.data);
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
//       // Optional: Check if post exists in the posts array to avoid unnecessary API call
//       const { posts } = getState().posts;
//       const cachedPost = posts.find((post) => post.id === parseInt(postId));
//       if (cachedPost) return cachedPost;

//       const response = await axios.get(`http://localhost:5000/api/blog/getpostbyid/${postId}`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || 'Failed to fetch post');
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
//     selectedPost: null, // New state for single post
//     loading: false, // Shared loading state
//     error: null, // Shared error state
//     filters: {
//       category: '',
//       tag: '',
//       search: ''
//     }
//   },
//   reducers: {
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//       state.currentPage = 1; // Reset to first page when filters change
//     },
//     setPage: (state, action) => {
//       state.currentPage = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     // Handle fetchBlogPosts
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
//       // Handle fetchPostById
//       .addCase(fetchPostById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPostById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedPost = action.payload;
//       })
//       .addCase(fetchPostById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.error || 'Failed to fetch post';
//       });
//   }
// });

// export const { setFilters, setPage } = postsSlice.actions;
// export default postsSlice.reducer;























import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all blog posts
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

// Async thunk for fetching a single blog post by ID
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId, { rejectWithValue, getState }) => {
    try {
      // Check if post exists in the posts array to avoid unnecessary API call
      const { posts } = getState().posts;
      const cachedPost = posts.find((post) => post._id === postId);
      if (cachedPost) {
        // Transform cached post to match dummyPost structure
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
          likes: 0,
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
      const post = response.data.data[0]; // API returns data as an array
      if (!post) {
        return rejectWithValue({ error: 'Blog post not found' });
      }
      // Transform API response to match dummyPost structure
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
        likes: 0,
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
      });
  }
});

export const { setFilters, setPage } = postsSlice.actions;
export default postsSlice.reducer;