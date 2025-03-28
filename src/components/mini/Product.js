import React, {useEffect, useState} from 'react';
import img from "../../esim/1.jpg";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faCheck} from "@fortawesome/free-solid-svg-icons";
import {createCard, getCards} from "../../store/actions/products";
import {setProduct, setProductId} from "../../store/actions/home";
import {useDispatch, useSelector} from "react-redux";

const Product = ({products, className, classNameImg, quantity, classNameActive, classNameLoading, func}) => {
    const [indexImg, setIndexImg] = useState(0);
    const [imgLength, setImgLength] = useState(0);
    const [test, setTest] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
    const dispatch = useDispatch();
    const productId = useSelector(state => state.home.productId);
    const status = useSelector(state => state.products.statusCard);
    const statusProducts =useSelector(state => state.home.status);
    const cards = useSelector(state => state.products.cardsList)
    const [indexProduct, setIndexProduct] = useState("")
    const page = useSelector(state => state.products.page)
    const navigate = useNavigate()
    const total = useSelector(state => state.home.total)
    const [statusEnd, setStatusEnd] = useState("");


    useEffect(() => {
        if(statusProducts ==="pending" || status === "pending"){
            setStatusEnd("pending");
        }
        else{
            setStatusEnd("");
        }
    }, [statusProducts,status]);

    useEffect(() => {
        if (isPlay && imgLength > 1) {
            const time = setTimeout(() => {
                changeImage()
            }, 700)
            return () => clearTimeout(time)
        }

    });
    const goToProduct = (product, id) => {
        dispatch(setProduct(product))
        navigate(`/one-product/${id}`)
    }

    // useEffect(() => {
    //     //total
    //     dispatch(getCards({page:1, limit: total || 100}))
    // }, [ status]);


    const changeImage = () => {
        setIndexImg(indexImg === imgLength - 1 ? 0 : indexImg + 1)
    }

    const sendProduct = (id, index) => {
        dispatch(createCard({productId: id, quantity: 1}))
        setIndexProduct(index)
    }

    console.log(func, "a")

    return (
        <>
            {
                products.length  ?
                    products.slice(0, quantity ? quantity : products.length).map((product, index) => {
                            const isCard = cards ? cards.find(id => id === product.id) : false;
                            const date = product.discount ? new Date(product.discount.endDate) : null;
                            const day = product.discount ? date.getDate() : null;
                            const month = product.discount ? date.toLocaleString('en-us', {month: 'long'}) : null;
                            console.log(products, "ssssssssssss")
                            return (
                                <div className={className}>
                                    <>
                                        <div className="product-link" onClick={() => goToProduct(product, product.id)}
                                             onMouseEnter={() => {
                                                 setIsPlay(true)
                                                 setImgLength(product.productImage.length)
                                                 setTest(index)
                                             }}
                                             onMouseLeave={() => {
                                                 setIsPlay(false)
                                                 setImgLength(0)
                                                 setIndexImg(0)
                                             }}
                                        ></div>

                                        {product.discount ?
                                            <div className="percentage">
                                                <span>- {product.discount.discountPercentage.split(".")[0]} %</span>
                                            </div>
                                            : null}

                                        <div className={classNameImg}>
                                            {product.productImage.length ?
                                                <img src={
                                                    product.productImage.length > 1 && index === test ?
                                                        product.productImage[indexImg].path
                                                        :
                                                        product.productImage[0].path
                                                } alt="img"/> : null}
                                        </div>

                                        <div className={classNameActive}>
                                            <div className="product-info">
                                                <div className="product-price">
                                                    <div className="price-block">
                                                        {product.discount ?
                                                            <span>{product.discount.discountPrice.split(".")[0]} $</span> : null}
                                                        <span style={{
                                                            color: product.discount ? "#a5a5a5" : "black",
                                                            fontSize: product.discount ? "20px" : "25px",
                                                            textDecorationLine: product.discount ? "line-through" : "none",
                                                        }}>{product.price.split(".")[0]} $</span>
                                                    </div>
                                                    {product.discount ? <strong
                                                        className="loading-gradient-endDate">Until {day} {month}</strong> : null}
                                                </div>
                                                <div className="product-name"><span>{product.name}</span></div>
                                                <div className="product-description"><span>{product.description}</span>
                                                    <div className="product-store">
                                                        <div className="store-img">
                                                            {/*<img src={product.store.storeLogo[0].path} alt="img"/>*/}
                                                        </div>
                                                        <div className="stars">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="product-button">
                                                <Button isProduct={true} isCard={isCard} index={index}
                                                         indexProduct={indexProduct}
                                                         status={statusEnd} onClick={() => {
                                                    sendProduct(product.id, index)
                                                }}
                                                         icon={<FontAwesomeIcon style={{marginLeft: 20, fontSize: 20}}
                                                                                icon={product.isInCart  ? faCheck : faCartShopping}/>}
                                                         text={product.isInCart ? "In cart" : "Add to cart"}
                                                         className={product.isInCart  ? "disabled-cart" : "active-button"}
                                                >
                                                </Button>
                                            </div>
                                        </div>

                                    </>
                                </div>
                            )
                        }

                        // <div>{product.id}</div>
                    ) :
                    Array.from({length: quantity}).map(() => (

                        <div className={className} style={{border: "1px solid transparent"}}>
                            {classNameImg === "shares-img" ?
                                <div className="percentage loading-gradient-p" style={{
                                    width: 68,
                                    height: 40,
                                    background: "red",
                                }}>
                                    <span></span>
                                </div>
                                : null}
                            {classNameImg === "product-img" ?


                                <div className="loading-img-p">
                                    <div className={`${classNameImg} loading-gradient-p`}
                                         style={{border: "1px solid transparent"}}>
                                    </div>

                                </div>

                                :
                                <div className="loading-img-s">
                                    <div className={`${classNameImg} loading-gradient-p`}
                                         style={{border: "1px solid transparent"}}>
                                    </div>

                                </div>


                            }


                            <div className={classNameActive}>
                                <div className="product-info ">
                                    <div className="loading-span">
                                        <div className="product-price loading-gradient-p"
                                             style={{
                                                 height: 20,
                                             }}><span></span>
                                        </div>
                                    </div>
                                    <div className="loading-span">
                                        <div className="product-name loading-gradient-p"
                                             style={{
                                                 height: 20,
                                             }}><span></span></div>
                                    </div>
                                    <div className="loading-span">
                                        <div className="product-description loading-gradient-p" style={{
                                            height: 50,
                                        }}><span></span></div>
                                    </div>
                                </div>
                                <div className="product-button loading-gradient-p"
                                     style={{
                                         height: 45,
                                         background: "limegreen"
                                     }}>
                                </div>
                            </div>
                        </div>
                    ))}
        </>)


};

export default Product;
