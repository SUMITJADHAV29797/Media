import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk('users/remove', async(user) => {
    await axios.delete(`https://media-backend-zfrw.onrender.com/users/${user.id}`)
    return user
})

export { removeUser }