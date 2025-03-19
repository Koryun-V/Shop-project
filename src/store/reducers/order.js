import {createReducer} from "@reduxjs/toolkit";
import {getOrder, sendReview, setIsOpenReview} from "../actions/order";

const initialState = {
    status: "",
    order: [],
    isOpenReview: false,
    statusReview: "",

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
            state.statusReview = "pending"
        })
        .addCase(sendReview.fulfilled, (state, {payload}) => {
            state.statusReview = "ok"
        })
        .addCase(sendReview.rejected, (state) => {
            state.statusReview = "error"
        })

        .addCase(setIsOpenReview, (state, {payload}) => {
            state.isOpenReview = payload
        })


});
