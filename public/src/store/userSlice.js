import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const baseURL = "http://localhost:5000";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  reducers: {

  },
  extraReducers: (builder) => {
    
  }
})

export default userSlice;