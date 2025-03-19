import React, {useCallback, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {ReactComponent as Close} from "../../../assets/icon/close-x.svg"
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../mini/Button";
import {sendReview} from "../../../store/actions/order";


function ModalReview({open, onClose, productId}) {
    const dispatch = useDispatch();


    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [isStar, setIsStar] = useState(false);


    const onChange = (event) => {
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

            scrollModal()

        }
    }, [open]);

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
                        <div className="review-block">
                            <textarea onChange={onChange} value={review}></textarea>
                            <div className="star" onMouseLeave={() => !isStar ? setRating("") : null}>
                                {Array.from({length: 5}).map((_, i) => (
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
                                    onClick={() => dispatch(sendReview({productId, review, rating}))}
                                    text="Send" className="active-button"/>

                            </div>
                        </div>


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
