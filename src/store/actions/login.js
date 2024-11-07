import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
    "user/login",
    async (payload, thunkAPI) => {
        try {
            const {data} = await axios.post(`https://world-of-construction.onrender.com/users/login`, {
                email: payload.email,
                password: payload.password,
            })
            return data.token
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);


export const setStatus = createAction(
    "login/status",
)


