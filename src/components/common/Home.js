import React, {useCallback, useEffect, useState} from 'react';
import Slider from "react-slick";
import img from "../../esim/1.jpg"
import img2 from "../../esim/2.jpg"
import img3 from "../../esim/3.jpg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "./Arrow";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/actions/home";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [indexImg, setIndexImg] = useState(0);
    const [imgLength, setImgLength] = useState(0);
    const [test, setTest] = useState(0);


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

    useEffect(() => {
        if (isPlay && imgLength > 1) {
            const time = setTimeout(() => {
                changeImage()
            }, 700)
            return ()=> clearTimeout(time)
        }
    });
    const changeImage = () => {
        setIndexImg(indexImg === imgLength - 1 ? 0 : indexImg + 1)
    }


    return (
        <section className="section">
            <div className="container-slide">
                <Slider {...settings}>
                    <div>
                        <img src={img}/>
                    </div>
                    <div>
                        <img src={img2}/>
                    </div>
                    <div>
                        <img src={img3}/>
                    </div>
                </Slider>
            </div>

            <article className="article-home">
                <div className="title">Shares</div>
                <div className="article-block">
                    {products.slice(4,8).map((product, index) => (
                        <div className="product-block">
                            <>
                                <div className="product-img"
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
                                >
                                    <img src={
                                        product.productImage.length > 1 && index === test ?
                                            product.productImage[indexImg].path
                                            :
                                            product.productImage[0].path
                                    } alt="img"/>
                                </div>
                                <div className="product-info"></div>
                            </>
                        </div>
                    ))}
                </div>
            </article>

            <article className="article-home">
                <div className="title">Popular categories</div>
                <div className="article-block"></div>
            </article>

            <article className="article-home">
                <div className="title">Popular products</div>
                <div className="article-block"></div>
            </article>

            <article className="article-home">
                <div className="title">Popular brands</div>
                <div className="article-block"></div>
            </article>

        </section>

    );
};

export default Home;
