import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrder, sendReview, setIsOpenReview} from "../../store/actions/order";
import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePen} from "@fortawesome/free-solid-svg-icons";

import ModalReview from "./Modal/ModalReview";






const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    const reviewOpen = useSelector(state => state.order.isOpenReview);
    const [productId,setProductId] = useState("");

    console.log(reviewOpen, "set")

    useEffect(() => {
        dispatch(getOrder())
    }, []);

    let x = new Date("2025-02-25T17:16:35.000Z")
    console.log(order)
    return (
        <>
            <div className="section">
                <div className="container-order">
                    {order.order.map((item, index) => {
                        const date = new Date(item.createdAt);
                        const day = date.getDate();
                        const month = date.toLocaleString('en-us', {month: 'long'});

                        // const month = item.createdAt.getMonth();
                        return (
                            <>
                                <div key={index} className="order-item">
                                    <div className="order-img">
                                        <img src={item.product.productImage[0].path} alt=""/>
                                    </div>

                                    <div className="order-info">
                                        <span>{item.product.name}</span>
                                        <strong>{item.amount} $</strong>
                                        <span>{item.quantity} pcs.</span>


                                    </div>
                                    <div className="order-status">
                                        <div className="order-status-block">
                                            <strong>Order from {day} {month} </strong>
                                            <div className="review"  onClick={() => {
                                                dispatch(setIsOpenReview(true))
                                                setProductId(item.product.id)

                                            }}>
                                                <Button

                                                        className="active-button" text="Write a review"
                                                        icon={<FontAwesomeIcon icon={faSquarePen}
                                                                               style={{
                                                                                   marginLeft: 10,
                                                                                   fontSize: 20
                                                                               }}/>}/>
                                            </div>
                                        </div>
                                        <div className="order-status-block">
                                            <strong>Status</strong>
                                            <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                                        </div>

                                    </div>
                                </div>

                            </>
                        )
                    })}
                </div>
            </div>

            <ModalReview
                productId={productId}
                open={reviewOpen} onClose={() => {
                dispatch(setIsOpenReview(false))
            }}/>
        </>
    );
};

export default Order;
