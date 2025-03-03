import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../store/actions/order";

const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    useEffect(() => {
        dispatch(getOrder())
    }, []);
    let x = new Date("2025-02-25T17:16:35.000Z")
    console.log(order)
    return (
        <div className="section">
            <div className="container-order">
                {order.order.map((item, index) => {
                    const date = new Date(item.createdAt);
                    const day = date.getDate();
                    const month = date.toLocaleString('en-us',{ month: 'long' });

                    // const month = item.createdAt.getMonth();
                    return (
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
                            </div>
                            <div className="order-status-block">
                                <strong>Status</strong>
                                <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Order;
