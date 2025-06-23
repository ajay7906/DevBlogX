// imort {createAsyncThunk} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const initialState = {
    posts: [],
    currentPage: 1,
    totalPages: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: {
        category: '',
        search: '',
        tag: ''
    }
};

export const fetchBlogPosts = createAsyncThunk()