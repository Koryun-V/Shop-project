import {createReducer} from "@reduxjs/toolkit";
import {getOrder, getReview, sendReview, setIsOpenReview, setReviews, setReviewStatus} from "../actions/order";

const initialState = {
    status: "",
    order: [],
    isOpenReview: false,
    statusReviewSend: "",
    statusReviewGet: "",
    reviews:{},
    reviewsAll:[],


}
export const order = createReducer(initialState, (builder) => {
    builder
        .addCase(getOrder.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getOrder.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.order = payload
        })
        .addCase(getOrder.rejected, (state) => {
            state.status = "error"
        })
        .addCase(sendReview.pending, (state) => {
            state.statusReviewSend = "pending"
        })
        .addCase(sendReview.fulfilled, (state, {payload}) => {
            state.statusReviewSend = "ok"
        })
        .addCase(sendReview.rejected, (state) => {
            state.statusReviewSend = "error"
        })
        .addCase(getReview.pending, (state) => {
            state.statusReviewGet = "pending"
        })
        .addCase(getReview.fulfilled, (state, {payload}) => {
            state.statusReviewGet = "ok"
            state.reviews = payload[0]
            state.reviewsAll = payload
        })
        .addCase(getReview.rejected, (state) => {
            state.statusReviewGet = "error"
        })






        .addCase(setIsOpenReview, (state, {payload}) => {
            state.isOpenReview = payload
        })
        .addCase(setReviews, (state, {payload}) => {
            state.reviews = payload
        })
        .addCase(setReviewStatus, (state, {payload}) => {
            state.statusReviewGet = payload
        })


});
