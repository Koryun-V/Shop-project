import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getOrder,
    getOrderReceived,

} from "../../store/actions/order";


import OrderUniversal from "../mini/OrderUniversal";


const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    const orderReceived = useSelector(state => state.order.orderReceived);
    const statusConfirm = useSelector(state => state.order.orderConfirmStatus)
    const url = useSelector(state => state.order.url);

    const total = useSelector(state => state.order.totalOrder)

    const [orderStatus, setOrderStatus] = useState("");


    useEffect(() => {
        dispatch(getOrder({limit:total}))
        dispatch(getOrderReceived())
    }, [statusConfirm]);

    useEffect(() => {
        if(url){
            window.location.href = url;
            console.log(url,"a")
        }
    }, [url]);



    return (
        <>

            <div className="section">
                <div className="container-order">
                    <div className="order__filter">
                        <div className="order__items">
                            <div className="order__filter__item" onClick={() => setOrderStatus("")}>
                                <span className={orderStatus === "" ? "active_all" : "disabled__filter"}>All</span>
                            </div>
                            <div className="order__filter__item" onClick={() => setOrderStatus("received")}>
                                <span
                                    className={orderStatus === "received" ? "active_received" : "disabled__filter"}>Received</span>
                            </div>
                            <div className="order__filter__item" onClick={() => setOrderStatus("paid")}>
                                <span className={orderStatus === "paid" ? "active_paid" : "disabled__filter"}>Paid</span>
                            </div>
                            <div className="order__filter__item"  onClick={() => setOrderStatus("failed")}>
                                <span className={orderStatus === "failed" ? "active_failed" : "disabled__filter"}>Failed</span>
                            </div>

                            <div className="line-active" style={{
                                left: orderStatus === "received" ? "calc(100% / 4)"
                                    : orderStatus === "paid"
                                        ? "calc(100% / 2)" : orderStatus === "failed" ? "calc(100% - 200px)" : 0,
                                background: orderStatus === "received" ? "limegreen" : orderStatus === "paid" ? "#7b00ff" : orderStatus === "failed" ? "red" : "#d1d1d1",
                            }}>
                            </div>
                        </div>
                    </div>

                    <OrderUniversal status={orderStatus}
                                    order={orderStatus === "" ? orderReceived.concat(order.order) : orderStatus === "received" ? orderReceived : order.order}/>
                </div>
            </div>


        </>
    );
};

export default Order;
