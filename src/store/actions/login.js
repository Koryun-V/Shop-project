import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


// export const loginUser = createAsyncThunk(
//     "user/login",
//     async (payload, thunkAPI) => {
//         try {
//             const {data} = await axios.post(`https://world-of-construction.onrender.com/users/login`, {
//                 email: payload.email,
//                 password: payload.password,
//             })
//             return data.token
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error)
//         }
//     }
// );


export const loginUser = createAsyncThunk(
    "user/login",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.loginUser(payload);
            return data.token
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const forgotPasswordUser = createAsyncThunk(
    "user/forgot-password",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.forgotPasswordUser(payload);
            console.log(data,"forgot")
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const getUser = createAsyncThunk(
    "user/profile",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const setIsOpenLogin = createAction(
    "login/modalOpen",
)
export const setStatus = createAction(
    "login/status",
)


