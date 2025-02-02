import {createReducer} from "@reduxjs/toolkit";
import {categoriesRequest, createCard, getCards, setPage} from "../actions/products";


const initialState = {
    status: "",
    categories: [],
    statusCard: "",
    cardsList: [],
    page: "1",
}


export const products = createReducer(initialState, (builder) => {
    builder

        .addCase(categoriesRequest.pending, (state) => {
            state.status = "pending"
        })
        .addCase(categoriesRequest.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.categories = payload
        })
        .addCase(categoriesRequest.rejected, (state) => {
            state.status = "error"
        })
        .addCase(createCard.pending, (state) => {
            state.statusCard = "pending"
        })

        .addCase(createCard.fulfilled, (state, {payload}) => {
            state.statusCard = "ok"

        })
        .addCase(createCard.rejected, (state) => {
            state.statusCard = "error"
        })

        .addCase(getCards.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getCards.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.cardsList = payload.length ? payload.map(({product}) => product.id) : []


        })

        .addCase(getCards.rejected, (state) => {
            state.statusCard = "error"
        })

        .addCase(setPage, (state, {payload}) => {
            state.page = payload
        })

});
