import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching blog posts
export const fetchBlogPosts = createAsyncThunk(
  'posts/fetchBlogPosts',
  async (params, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, category, tag, search } = params;
      const response = await axios.get('http://localhost:5000/api/blog/getAllBlog', {
        params: { page, limit, category, tag, search }
      });
      console.log('Fetched posts:', response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      state.currentPage = 1; // Reset to first page when filters change
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
      });
  }
});

export const { setFilters, setPage } = postsSlice.actions;
export default postsSlice.reducer;