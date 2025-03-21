import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrder, getReview, sendReview, setIsOpenReview, setReviews} from "../../store/actions/order";
import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePen} from "@fortawesome/free-solid-svg-icons";

import ModalReview from "./Modal/ModalReview";


const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    const reviewOpen = useSelector(state => state.order.isOpenReview);
    const [activeItem,setActiveItem] = useState("");
    const [product, setProduct] = useState({
        productId: "",
        productImg: "",
        productName: "",
    });


    useEffect(() => {
        dispatch(getOrder())
    }, []);


    return (
        <>
            <div className="section">
                <div className="container-order">
                    {order.order.map((item, index) => {
                        const date = new Date(item.createdAt);
                        const day = date.getDate();
                        const month = date.toLocaleString('en-us', {month: 'long'});
                        return (
                            <>
                                <div key={index} className={index === activeItem ? "order-item-active loading-gradient-order" : "order-item" } >
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
                                            <div className="review">

                                                <Button
                                                    onClick={() => {
                                                        setActiveItem(index)
                                                        dispatch(getReview({productId: item.product.id}))
                                                        dispatch(setIsOpenReview(true))
                                                        setProduct({
                                                            productId: item.product.id,
                                                            productImg: item.product.productImage[0].path,
                                                            productName: item.product.name,
                                                        })
                                                    }}
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
                product={product}
                open={reviewOpen} onClose={() => {
                    setActiveItem("")
                dispatch(setIsOpenReview(false))
            }}/>
        </>
    );
};

export default Order;
