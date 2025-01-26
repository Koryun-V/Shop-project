import React, {useCallback, useEffect, useState} from 'react';
import Slider from "react-slick";
import img from "../../esim/1.jpg"
import img2 from "../../esim/2.jpg"
import img3 from "../../esim/3.jpg"
import background from "../../assets/image/home.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/actions/home";
import Product from "../mini/Product";
import homeBackground from "../../assets/image/b-2.jpg"


const Home = () => {


    const dispatch = useDispatch();
    const products = useSelector(state => state.home.products);
    const [isPlay, setIsPlay] = useState(false);


    useEffect(() => {
        dispatch(getProducts())
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
        autoplay: true,
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
            <div className="background">
                <img src={background} className="img-b"/>

                {/*<div className="container-slide">*/}
                {/*    <Slider {...settings}>*/}
                {/*        <div>*/}
                {/*            <img src={img}/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <img src={img2}/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <img src={img3}/>*/}
                {/*        </div>*/}
                {/*    </Slider>*/}
                {/*</div>*/}
            </div>

            <article className="article-home">
                <div className="title">Shares</div>
                <div className="article-block">
                    <Product products={products} quantity={4} className="product-shares" classNameImg="shares-img"/>
                </div>
            </article>
            <article className="article-home">
                <div className="title">Popular categories</div>
                <div className="article-block"></div>
            </article>

            <article className="article-home">
                <div className="title">Popular products</div>
                <div className="article-block">
                    <Product products={products} className="product-block" classNameImg="product-img"/>
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
                    <img className="img" src={homeBackground}/>
                </div>
            </article>

        </section>

    );
};

export default Home;
