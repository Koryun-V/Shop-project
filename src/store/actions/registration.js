import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";

// export const registrationUser = createAsyncThunk(
//     "user/registration",
//     async (payload, thunkAPI) => {
//         try {
//             const {data} = await axios.post(`https://world-of-construction.onrender.com/users/registration`, {
//                     email: payload.email,
//                     firstName: payload.firstName,
//                     lastName: payload.lastName,
//                     password: payload.password,
//                     avatar: payload.avatar,
//                     gender: payload.gender,
//                     dateOfBirth: payload.dateOfBirth,
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     }
//                 })
//             return data
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error)
//         }
//     }
// );
export const registrationUser = createAsyncThunk(
    "user/registration",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.registrationUser(payload);
            console.log(data, "data")
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const activateUser = createAsyncThunk(
    "user/activate",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.activateUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const resendActivateUser = createAsyncThunk(
    "user/resend-activate",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.resendActivateUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);


export const setStatus = createAction(
    "register/status",
)
export const setStatusKey = createAction(
    "register/status-key",
)
