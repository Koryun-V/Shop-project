import React, {useCallback, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";

import {ReactComponent as Close} from "../../../assets/icon/close-x.svg"
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../mini/Button";
import {getReview, sendReview, setReviews, setReviewStatus} from "../../../store/actions/order";


function ModalReview({open, onClose}) {
    const dispatch = useDispatch();
    const statusSend = useSelector(state => state.order.statusReviewSend)

    const [isReview, setIsReview] = useState(false);

    const reviews = useSelector(state => state.order.reviews)
    const status = useSelector(state => state.order.statusReviewGet)
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [isStar, setIsStar] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        if (reviews.review) {
            setIsReview(true);
        } else {
            setIsReview(false)
        }
    }, [status, statusSend]);

    useEffect(() => {
        if (statusSend === "ok") {
            dispatch(setReviews({}))
            dispatch(getReview({reviewId: id}))
        }
    }, [statusSend]);


    const onChange = (event) => {
        if (event.target.value.length > 300) return false
        setReview(event.target.value);
    }


    const scrollModal = () => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('width');
        document.body.ontouchmove = () => true;
        window.removeEventListener("keydown", handleEsc)
    }


    const handleEsc = useCallback((event) => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, []);


    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    document.body.style.width = ` ${document.body.getBoundingClientRect().width}px`
                    document.body.style.overflowY = 'hidden';
                    document.body.ontouchmove = () => false;
                    window.addEventListener('keydown', handleEsc);

                } catch (err) {
                    console.log(err)
                }
            })()
        } else {
            setId("")
            setReview("")
            setRating("")
            setIsStar(false)
            dispatch(setReviews({}))
            dispatch(setReviewStatus(""))
            scrollModal()
        }
    }, [open]);


    const send = (productId, review, rating) => {
        setId(productId)
        dispatch(sendReview({
            productId,
            review,
            rating
        }))

    }
    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div onClick={onClose} className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>Review</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block">
                    <div className="container-modal">
                        {status !== "pending"
                            ?
                            <div className="review-block">
                                <div className="product-review">
                                    <div className="img-review">
                                        <img src={reviews.product.productImage[0].path} alt="product"/>
                                    </div>
                                    <div className="title-review">
                                        <strong>{reviews.product.productName}</strong>
                                        {isReview ?
                                            <span className="loading-gradient-review">The product has been rated</span>
                                            :
                                            <span className="loading-gradient-endDate">Rate the product</span>
                                        }
                                    </div>
                                </div>
                                <div className="user-review">
                                    <div className="img-user">
                                        <img src={reviews.user.avatar} alt="user"/>
                                    </div>
                                    <div className="title-user">
                                        <strong>{reviews.user.lastName.charAt(0).toUpperCase() + reviews.user.lastName.slice(1)} {reviews.user.firstName.charAt(0).toUpperCase() + reviews.user.lastName.slice(1)}</strong>
                                    </div>
                                </div>

                                <textarea
                                    placeholder={isReview ? reviews.review : "Describe your impressions (optional)"}
                                    onChange={onChange} value={review} maxLength="300" disabled={isReview}>
                                </textarea>


                                <div className="max ">
                                    <span>{isReview ? reviews.review.length : review.length}/300</span>
                                </div>

                                <div className="star" onMouseLeave={() => !isStar ? setRating("") : null} style={{
                                    cursor: isReview ? "default" : "pointer"
                                }}>
                                    {Array.from({length: 5}).map((_, i) => (
                                        isReview ?

                                            <FontAwesomeIcon

                                                icon={faStar}
                                                className={i + 1 <= reviews.rating ?
                                                    "star-active icon"
                                                    : "star-disable icon"}/>
                                            :

                                            <FontAwesomeIcon

                                                onClick={() => {
                                                    setRating(i + 1)
                                                    setIsStar(true)
                                                }}
                                                icon={faStar} onMouseEnter={() => !isStar ? setRating(i + 1) : null
                                            }
                                                className={i + 1 <= rating ?
                                                    "star-active icon"
                                                    : "star-disable icon"}/>

                                    ))}
                                </div>
                                <div className="send-block">
                                    <Button
                                        status={statusSend}
                                        disabled={isReview}
                                        onClick={() => send(reviews.product.productId, review, rating)}
                                        text="Send" className={isReview ? "disabled" : "active-button"}/>

                                </div>
                            </div>

                            :
                            <div className="review-block">
                                <div className="product-review">
                                    <div className="img-review loading-gradient-r">
                                    </div>
                                    <div className="title-review">
                                        <strong className="loading-gradient-r" style={{
                                            height: 24,
                                        }}></strong>
                                        <span className="loading-gradient-r" style={{
                                            height: 34
                                        }}></span>
                                    </div>
                                </div>

                                <div className="user-review">
                                    <div className="img-user loading-gradient-r" style={{
                                        borderRadius: 5,
                                    }}>
                                    </div>
                                    <div className="title-user">
                                        <strong className="loading-gradient-r" style={{
                                            height: 70,
                                        }}></strong>
                                    </div>
                                </div>
                                <textarea value="" placeholder="" className="loading-gradient-r" disabled style={{
                                    border: "2px solid transparent"}}>
                            </textarea>
                                <div className="max loading-gradient-r">
                                    <span className="loading-gradient-r"></span>
                                </div>

                                <div className="star loading-gradient-r" style={{
                                    height: 50,
                                }}>

                                </div>
                                <div className="send-block loading-gradient-r" style={{
                                    background: "limegreen"
                                }}>
                                </div>
                            </div>
                        }
                    </div>


                </div>
            </div>
        </div>,
        document.body
    )
        ;
}

ModalReview.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalReview;
