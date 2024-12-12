import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const registrationUser = createAsyncThunk(
    "user/registration",
    async (payload, thunkAPI) => {
        try {
            const {data} = await axios.post(`https://world-of-construction.onrender.com/users/registration`, {
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    password: payload.password,
                    avatar: payload.avatar,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
