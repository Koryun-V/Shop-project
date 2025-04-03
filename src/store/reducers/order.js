import {createReducer} from "@reduxjs/toolkit";
import {
    getOrder,
    getOrderReceived,
    getReview, getReviewList, orderConfirm, orderRetry,
    sendReview,
    setIsOpenReview,
    setReviews,
    setReviewStatus
} from "../actions/order";

const initialState = {
    status: "",
    statusReceived:"",
    order: [],
    orderReceived:[],
    isOpenReview: false,
    statusReviewSend: "",
    statusReviewGetList: "",
    reviews:{},
    reviewsAll:[],
    orderRetryStatus:"",
    orderConfirmStatus:"",
    url:"",
    totalOrder:""


}
export const order = createReducer(initialState, (builder) => {
    builder
        .addCase(getOrder.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getOrder.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.order = payload.data
            state.totalOrder = payload.total

        })
        .addCase(getOrder.rejected, (state) => {
            state.status = "error"
        })
        .addCase(getOrderReceived.pending, (state) => {
            state.statusReceived = "pending"
        })
        .addCase(getOrderReceived.fulfilled, (state, {payload}) => {
            state.statusReceived = "ok"
            state.orderReceived = payload
        })
        .addCase(getOrderReceived.rejected, (state) => {
            state.statusReceived = "error"
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
            state.reviews = payload
        })
        .addCase(getReview.rejected, (state) => {
            state.statusReviewGet = "error"
        })
        .addCase(getReviewList.pending, (state) => {
            state.statusReviewGetList = "pending"
        })
        .addCase(getReviewList.fulfilled, (state, {payload}) => {
            state.statusReviewGetList = "ok"
            state.reviewsAll = payload
        })
        .addCase(getReviewList.rejected, (state) => {
            state.statusReviewGetList = "error"
        })


        .addCase(orderRetry.pending, (state) => {
            state.orderRetryStatus = "pending"
        })
        .addCase(orderRetry.fulfilled, (state, {payload}) => {
            state.orderRetryStatus = "ok"
            state.url = payload
            console.log(state.url,"url")
        })
        .addCase(orderRetry.rejected, (state) => {
            state.orderRetryStatus = "error"
        })


        .addCase(orderConfirm.pending, (state) => {
            state.orderConfirmStatus = "pending"
        })
        .addCase(orderConfirm.fulfilled, (state, {payload}) => {
            state.orderConfirmStatus = "ok"
        })
        .addCase(orderConfirm.rejected, (state) => {
            state.orderConfirmStatus = "error"
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
