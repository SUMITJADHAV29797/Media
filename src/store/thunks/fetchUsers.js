import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk('users/fetch', async() => {
    const response = await axios.get('https://media-backend-zfrw.onrender.com/users')
    return response.data;
})

export { fetchUsers }