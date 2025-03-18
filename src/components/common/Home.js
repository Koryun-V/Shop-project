import React, {useCallback, useEffect, useState} from 'react';
import Slider from "react-slick";

import background from "../../assets/image/home.jpg"
import background2 from "../../assets/image/home-2.jpg"


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {faAngleDown, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {getPopularProducts, getSharesProducts} from "../../store/actions/home";
import Product from "../mini/Product";
import about from "../../assets/image/about.jpg"
import {Link} from "react-router-dom";


const Home = () => {


    const dispatch = useDispatch();

    const products = useSelector(state => state.home.popularProducts);
    const productsShares = useSelector(state => state.home.productsShares);

    const [isPlay, setIsPlay] = useState(false);


    useEffect(() => {
        dispatch(getPopularProducts())
        dispatch(getSharesProducts())

    }, []);

    console.log(products)

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
                    <Link to="/shares">All shares   <FontAwesomeIcon icon={faAngleRight} className="user-arrow"

                    /></Link>
                </div>

                <div className="article-block">
                    <Product classNameActive="product-active-shares" products={productsShares} quantity={4} className="product-shares" classNameImg="shares-img"/>
                </div>
            </article>
            <article className="article-home">
                <div className="title">Popular categories</div>
                <div className="article-block"></div>
            </article>

            <article className="article-home">
                <div className="title">
                    <h3>Popular products</h3>
                    <Link to="/#">All products <FontAwesomeIcon icon={faAngleRight} className="user-arrow"

                    /></Link>
                </div>
                <div className="article-block">
                    <Product classNameActive="product-active" products={products} quantity={12} className="product-block"
                             classNameImg="product-img"/>
                </div>
            </article>

            {/*<article className="article-home">*/}
            {/*    <div className="title">Popular brands</div>*/}
            {/*    <div className="article-block"></div>*/}
            {/*</article>*/}
            <article className="article-home-bg">
                <div className="article-block-bg">
                </div>
            </article>
            <article className="article-home">
                <div className="article-block-img">
                    <div className="about-home">
                        <h2>About the company</h2>
                        <p>At StroykaStor you can always buy all the necessary goods for home and garden renovation.
                            Want to renovate your apartment? Are you building a country house? Use construction and
                            finishing materials from our catalog.
                        </p>
                        <p>
                            Fast delivery of construction goods at low prices will make your shopping more enjoyable.
                            Renovation can be cheap if you do it with us. We always have more than 30,000 construction
                            goods in stock for you at low prices every day.
                            StroykaStor is a wide range of goods for home and renovation at a low price; Possibility to
                            order construction and finishing materials for home and garden.</p>
                    </div>
                    <img className="img" src={about}/>
                </div>
            </article>

        </section>

    );
};

export default Home;
