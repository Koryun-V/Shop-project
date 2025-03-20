import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
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


export const sendReview = createAsyncThunk(
    "user/send-review",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.sendReview(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const getReview = createAsyncThunk(
    "user/get-review",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getReview(payload);
            return data.productsReviews
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const setIsOpenReview = createAction(
    "login/modalOpen-review",
)

export const setReviews = createAction(
    "login/reviews",
)
export const setReviewStatus = createAction(
    "login/review-status",
)
