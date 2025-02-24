import {createReducer} from "@reduxjs/toolkit";
import {
    categoriesRequest,
    createCard,
    getCards,
    setMaxPrice,
    setMinPrice,
    setPage,
    updateCard
} from "../actions/products";


const initialState = {
    status: "",
    categories: [],
    statusCard: "",
    cardsList: [],
    page: "1",
    cardId: "",
    updateCardStatus: "",
    minPrice: 0,
    maxPrice: 2000,

}


export const products = createReducer(initialState, (builder) => {
    builder

        .addCase(categoriesRequest.pending, (state) => {
            state.status = "pending"
        })
        .addCase(categoriesRequest.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.categories = [{id: "", name: "All"}, ...payload.categories,]

        })
        .addCase(categoriesRequest.rejected, (state) => {
            state.status = "error"
        })
        .addCase(createCard.pending, (state) => {
            state.statusCard = "pending"
        })

        .addCase(createCard.fulfilled, (state, {payload}) => {
            state.statusCard = "ok"
            state.cardId = payload.cards.id

        })
        .addCase(createCard.rejected, (state) => {
            state.statusCard = "error"
        })

        .addCase(updateCard.pending, (state) => {
            state.updateCardStatus = "pending"
        })
        .addCase(updateCard.fulfilled, (state, {payload}) => {
            state.updateCardStatus = "ok"
        })

        .addCase(updateCard.rejected, (state) => {
            state.updateCardStatus = "error"
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

        .addCase(setMinPrice, (state, {payload}) => {

            state.minPrice = payload
        })

        .addCase(setMaxPrice, (state, {payload}) => {

            state.maxPrice = payload
        })

});
