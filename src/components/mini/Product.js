import React, {useEffect, useState} from 'react';
import img from "../../esim/1.jpg";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { createCard, getCards} from "../../store/actions/products";
import {setProductId} from "../../store/actions/home";
import {useDispatch, useSelector} from "react-redux";

const Product = ({products, className, classNameImg}) => {
    const [indexImg, setIndexImg] = useState(0);
    const [imgLength, setImgLength] = useState(0);
    const [test, setTest] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
    const dispatch = useDispatch();
    const productId = useSelector(state => state.home.productId);
    const status = useSelector(state => state.products.statusCard);
    const cards = useSelector(state => state.products.cardsList)
    const [indexProduct, setIndexProduct] = useState("")
    const page = useSelector(state => state.products.page)
    const navigate = useNavigate()
    const total = useSelector(state=>state.home.total)

    useEffect(() => {
        if (isPlay && imgLength > 1) {
            const time = setTimeout(() => {
                changeImage()
            }, 700)
            return () => clearTimeout(time)
        }

    });

    useEffect(() => {
        //total
        dispatch(getCards({page, limit: total}))
    }, [page, status]);


    console.log(cards)


    const changeImage = () => {
        setIndexImg(indexImg === imgLength - 1 ? 0 : indexImg + 1)
    }

    const sendProduct = (id, index) => {
        dispatch(createCard({productId: id, quantity: 1}))
        setIndexProduct(index)
    }

    const goToProduct = (id) => {
        dispatch(setProductId(id))
        navigate("/one-product")
    }


    // console.log(cards,"iiiii")
    return (
        <>
            {products.map((product, index) => {
                    const isCard = cards ? cards.find(id => id === product.id) : false;
                    return (
                        <div className={className}>
                            <>


                                {/*<Link to="/category" className="product-link"*/}
                                {/*      onMouseEnter={() => {*/}
                                {/*          setIsPlay(true)*/}
                                {/*          setImgLength(product.productImage.length)*/}
                                {/*          setTest(index)*/}
                                {/*      }}*/}
                                {/*      onMouseLeave={() => {*/}
                                {/*          setIsPlay(false)*/}
                                {/*          setImgLength(0)*/}
                                {/*          setIndexImg(0)*/}
                                {/*      }}*/}
                                {/*></Link>*/}
                                <div className={classNameImg}> {product.productImage.length ?
                                    <img src={
                                        product.productImage.length > 1 && index === test ?
                                            product.productImage[indexImg].path
                                            :
                                            product.productImage[0].path
                                    } alt="img"/> : null}
                                </div>

                                <div className="product-active">
                                    <div className="product-info"  onClick={() => goToProduct(product.id)}>
                                        <div className="product-price"><span>{product.price} $</span></div>
                                        <div className="product-name"><span>{product.name}</span></div>
                                        <div className="product-description"><span>{product.description}</span></div>
                                    </div>

                                    <div className="product-button">
                                        <Button isProduct={true} isCard={isCard} index={index} indexProduct={indexProduct}
                                                status={status} onClick={() => {
                                            sendProduct(product.id, index)
                                        }}
                                                icon={<FontAwesomeIcon style={{marginRight: 10}} icon={faCartShopping}/>}
                                                text="Add to cart"
                                                className={isCard ? "disabled" : "active-button"}
                                        >
                                        </Button>
                                    </div>
                                </div>

                            </>
                        </div>
                    )
                }

                // <div>{product.id}</div>
            )}
        </>
    );
};

export default Product;
