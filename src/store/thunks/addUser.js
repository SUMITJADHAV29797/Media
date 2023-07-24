import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addUser = createAsyncThunk('users/add', async() => {
    const response = await axios.post('https://media-backend-zfrw.onrender.com/users', {
        name: faker.person.fullName()
    });
    return response.data;
})

export { addUser };