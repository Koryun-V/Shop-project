import React, {useState} from 'react';
import Button from "./Button";
import {getReview, setIsOpenReview} from "../../store/actions/order";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePen} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import ModalReview from "../common/Modal/ModalReview";

const OrderUniversal = ({order, status}) => {
    const dispatch = useDispatch();

    const reviewOpen = useSelector(state => state.order.isOpenReview);
    const [activeItem, setActiveItem] = useState("");
    const [product, setProduct] = useState({
        productId: "",
        productImg: "",
        productName: "",
    });

    return (
        <>
            {order.map((item, index) => {
                const date = new Date(item.createdAt);
                const day = date.getDate();
                const month = date.toLocaleString('en-us', {month: 'long'});
                return (

                    <>
                        {item.status === status || status === "" ?
                            <div key={index}
                                 className={index === activeItem ? "order-item-active loading-gradient-order" : "order-item"}>
                                <div className="order-img">
                                    <img src={item.product.productImage[0].path} alt=""/>
                                </div>

                                <div className="order-info">
                                    <span>{item.product.name}</span>
                                    <strong>{item.amount.split(".")[0]} $</strong>
                                    <span>{item.quantity} pcs.</span>


                                </div>
                                <div className="order-status">
                                    <div className="order-status-block">
                                        <strong>Order from {day} {month} </strong>
                                        <div className="review">

                                            {item.status === "received" ? <Button
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
                                                : null}
                                        </div>
                                    </div>
                                    <div className="order-status-block">
                                        <strong>Status</strong>
                                        <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                                    </div>

                                </div>
                            </div>
                            : null}
                    </>
                )
            })}
            <ModalReview
                product={product}
                open={reviewOpen} onClose={() => {
                setActiveItem("")
                dispatch(setIsOpenReview(false))
            }}/>
        </>
    );
};

export default OrderUniversal;
