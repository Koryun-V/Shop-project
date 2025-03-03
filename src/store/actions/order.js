import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";

export const getOrder = createAsyncThunk(
    "user/order",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getOrder(payload);
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
