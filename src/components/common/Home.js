import React, {useCallback, useEffect, useState} from 'react';
import Slider from "react-slick";

import background from "../../assets/image/home.jpg"
import background2 from "../../assets/image/home-2.jpg"


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faCheck,
    faMessage,
    faStar,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {getPopularProducts, getRandomReviews, getSharesProducts} from "../../store/actions/home";
import Product from "../mini/Product";
import about from "../../assets/image/about.jpg"
import {Link} from "react-router-dom";
import {getCategory} from "../../store/actions/category";


const Home = () => {


    const dispatch = useDispatch();

    const products = useSelector(state => state.home.popularProducts);
    const reviews = useSelector(state => state.home.reviews)

    const productsShares = useSelector(state => state.home.productsShares);
    const id = useSelector(state => state.home.userId);
    const status = useSelector(state => state.products.statusCard);
    const statusShares = useSelector(state => state.home.statusShares);
    const statusPopular = useSelector(state => state.home.statusPopular);
    const category = useSelector(state => state.category);

    const [isPlay, setIsPlay] = useState(false);


    useEffect(() => {
        dispatch(getPopularProducts({id}))
        dispatch(getSharesProducts({id}))
    }, [id, status]);


    useEffect(() => {
        dispatch(getRandomReviews())
        dispatch(getCategory())
    }, []);

    console.log(category, "sssssssss")


    function SamplePrevArrow(props) {
        const {onClick} = props;
        return (
            <div
                className="arrow prev"
                onClick={onClick}
            ><FontAwesomeIcon icon={faAngleLeft} className="arrow-icon icon-prev"/></div>
        );
    }

    function SampleNextArrow(props) {
        const {onClick} = props;
        return (
            <div
                className="arrow next"
                onClick={onClick}
            ><FontAwesomeIcon icon={faAngleRight} className="arrow-icon icon-next"/></div>
        );
    }

    console.log(reviews, "r")

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        // cssEase: "linear"
        useTransform: false,
        prevArrow: <SamplePrevArrow/>,
        nextArrow: <SampleNextArrow/>,
    };


    return (
        <section className="section">
            {/*<div className="background">*/}
            <div className="container-slide">
                <Slider {...settings}>
                    <div>
                        <div className="text-slide">
                            <h2>Special offers</h2>
                            <p>on construction materials and goods for repair</p>
                        </div>
                        <img src={background} className="img-b"/>
                    </div>
                    <div>
                        <div className="text-slide">
                            <h2>Special offers</h2>
                            <p>on construction materials and goods for repair</p>
                        </div>
                        <img src={background2} className="img-b"/>
                    </div>
                    <div>
                        <img src={background} className="img-b"/>
                    </div>
                </Slider>
                {/*</div>*/}
            </div>

            <article className="article-home">
                <div className="title">
                    <h3>Shares</h3>
                    <Link to="/shares">All shares <FontAwesomeIcon icon={faAngleRight} className="user-arrow"

                    /></Link>
                </div>

                <div className="article-block">
                    <Product statusProducts={statusShares} classNameActive="product-active-shares"
                             products={productsShares} quantity={4}
                             className="product-shares" classNameImg="shares-img"/>
                </div>
            </article>
            <article className="article-home">
                <div className="title"><h3>Categories</h3></div>
                <div className="article-block category-container">
                    {category.data.length ? category.data.map((category) => (
                            <div className="category">
                                <div className="category_img">
                                    <img src={category.categoryImage[0].path} alt="category"/>
                                </div>
                                <div className="category_title">
                                    <span>{category.name}</span>
                                </div>
                            </div>
                        )) :

                        Array.from({length: 10}).map((_, i) => (
                                <div className="category loading-gradient-category" style={{
                                    border:"1px solid transparent"
                                }}>
                                </div>


                        ))}
                </div>
            </article>

            <article className="article-home">
                <div className="title">
                    <h3>Popular products</h3>
                    <Link to="/products">All products <FontAwesomeIcon icon={faAngleRight} className="user-arrow"
                    /></Link>
                </div>
                <div className="article-block">
                    <Product statusProducts={statusPopular} classNameActive="product-active" products={products}
                             quantity={12}
                             className="product-block"
                             classNameImg="product-img"/>
                </div>
            </article>

            {/*<article className="article-home">*/}
            {/*    <div className="title">Popular brands</div>*/}
            {/*    <div className="article-block"></div>*/}
            {/*</article>*/}

            <article className="article-home-bg">
                <div className="article-block-bg">
                    <div className="review-title">
                        <h3>Reviews</h3>
                    </div>

                    {reviews.length ? reviews.slice(0, 4).map((item) => {
                            console.log(reviews, "rrrr")
                            const date = new Date(item.createdAt);
                            const year = date.getFullYear();
                            const day = date.getDate();
                            const month = date.toLocaleString('en-us', {month: 'long'});

                            return (
                                <div className="random__review">
                                    <Link to={`one-product/${item.product.id}`} className="product-link"></Link>

                                    <div className="review_container">
                                        <div className="random__product">


                                            <div className="piramid">


                                            </div>
                                            <div className="stars-deg">
                                                {Array.from({length: 5}).map((_, i) => (
                                                    <FontAwesomeIcon
                                                        style={{
                                                            fontSize: 20
                                                        }}
                                                        icon={faStar}
                                                        className={i + 1 <= item.rating ?
                                                            "star-active icon"
                                                            : "star-disable icon"}/>
                                                ))}</div>
                                            <div className="product__info">
                                                <div className="random__product__img">
                                                    <img src={item.product.productImage[0].path}/>
                                                </div>
                                                <div className="random__product__name">
                                                    <strong>{item.product.name}</strong>
                                                    <span>
                                                        <FontAwesomeIcon icon={faCheck} style={{color: "limegreen"}}/> Bought out
                                                         </span>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="random__user">
                                            <div className="user-img-block">
                                                <div className="random__user__img" style={{
                                                    background: "#d1d1d1",

                                                }}>
                                                    {item.user.avatar[0] ? (
                                                        <img src={item.user.avatar[0].path} alt="user"/>
                                                    ) : (
                                                        <FontAwesomeIcon icon={faUser} className="random__review__icon"/>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="random__user__name">
                                                <strong>
                                                    {item.user.lastName.charAt(0).toUpperCase() + item.user.lastName.slice(1)}{" "}
                                                    {item.user.firstName.charAt(0).toUpperCase() + item.user.lastName.slice(1)}
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="review__info">
                                            <span>{item.review}</span>
                                        </div>
                                    </div>
                                    <div className="time__random">
                                        <span>{day} {month} {year} y.</span>
                                        <FontAwesomeIcon icon={faMessage} className="message-icon"/>

                                    </div>

                                </div>
                            );
                        })
                        :

                        Array.from({length: 4}).map((ш => (
                            <div className="random__review">
                                <div className="review_container">
                                    <div className="random__product" style={{
                                        height: 228
                                    }}>

                                        <div className="random__product__img loading-gradient-r" style={{
                                            width: 150,
                                        }}>
                                        </div>
                                        <div className="random__product__name loading-gradient-r" style={{
                                            marginLeft: 5
                                        }}>
                                        </div>
                                    </div>
                                    <div className="random__user ">
                                        <div className="user-img-block loading-gradient-r ">
                                            <div className="random__user__img ">
                                            </div>
                                        </div>
                                        <div className="random__user__name loading-gradient-r">
                                        </div>
                                    </div>

                                </div>
                                <div style={{
                                    padding: 15,
                                    width: "100%",
                                    height: "100%",
                                }}>
                                    <div className="loading-gradient-r " style={{
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                    </div>
                                </div>
                                <div style={{
                                    width: "100%",
                                    padding: 15,
                                }}>
                                    <div className="time__random loading-gradient-r">
                                    </div>
                                </div>
                            </div>

                        )))}
                </div>


            </article>

            <article className="article-home">
                <div className="article-block-img">
                    <div className="about-home">
                        <h2>About the company</h2>
                        <p>At StroykaStor you can always buy all the necessary goods for home and
                            garden renovation.
                            Want to renovate your apartment? Are you building a country house? Use
                            construction and
                            finishing materials from our catalog.
                        </p>
                        <p>
                            Fast delivery of construction goods at low prices will make your
                            shopping more enjoyable.
                            Renovation can be cheap if you do it with us. We always have more than
                            30,000 construction
                            goods in stock for you at low prices every day.
                            StroykaStor is a wide range of goods for home and renovation at a low
                            price; Possibility to
                            order construction and finishing materials for home and garden.</p>
                    </div>
                    <img className="img" src={about}/>
                </div>
            </article>

        </section>

    )
        ;
};

export default Home;
