import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const categoriesRequest = createAsyncThunk(
    "products/categoriesRequest",

    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getAllCategories(payload);
            return data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)


export const createCard = createAsyncThunk(
    "products/createCard",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.createCard(payload);

            return data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getCards = createAsyncThunk(
    "products/getCards",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getCards(payload);
            console.log(data)
            return data ? data.cards : []

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const setPage = createAction(
    "products/page",
    (payload) => ({
        payload,
    })
)
