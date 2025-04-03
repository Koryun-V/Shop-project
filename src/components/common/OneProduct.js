import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOneProduct} from "../../store/actions/oneProduct";
import _ from "lodash";
import default_image from "../../assets/icon/default_image.png";
import {createCard, updateCard} from "../../store/actions/products";
import {Rating} from "react-simple-star-rating";
import {getReview} from "../../store/actions/order";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faCheck, faStar, faUser} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";
import img from "../../esim/1.jpg";
import Slider from "react-slick";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const OneProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [delayedImages, setDelayedImages] = useState(null);
  const dispatch = useDispatch();
  // const productId = useSelector(state => state.home.productId);
  const oneProductInfo = useSelector(state => state.oneProduct.oneProduct);
  const name = oneProductInfo?.result?.product?.name;
  const id = oneProductInfo?.result?.product?.id;
  const price = oneProductInfo?.result?.product?.price
  const images = oneProductInfo?.result?.product?.images
  const description = oneProductInfo?.result?.product?.description;
  const size = oneProductInfo?.result?.product?.size
  const store = oneProductInfo?.result?.product?.store.name;
  const isInCart = oneProductInfo?.result?.product?.isInCart
  const params = useParams()
  const cardId = isInCart?.cartId
  const userId = useSelector(state => state.login.user?.id);
  const {productId} = params
  const quantityNumber = oneProductInfo?.result?.product?.quantity;
  const reviews = useSelector(state => state.order.reviewsAll)
  const [index, setIndex] = useState([100])

  const [more, setMore] = useState(false);

  useEffect(() => {
    dispatch(getReview({productId}))
  }, []);
  const updateQuantity = (value) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  const onChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setQuantity(newValue === "" ? "" : Math.max(1, Number(newValue)));
    }

  };


  const quantityBlur = () => {
    if (quantity > quantityNumber) {
      setQuantity(quantityNumber)
    }
    if (quantity < 1) {
      setQuantity(1);
    }
  }


  // console.log(oneProductInfo, "oneProductInfo");

  // console.log(isInCart, "isInCart")
  // console.log(cardId, "cardId")

  const addCard = () => {
    if (quantity === 0) return;
    if (cardId) {
      dispatch(updateCard({cardId, add: quantity}));
    } else {
      dispatch(createCard({productId, quantity}));
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedImages(images?.length ? images : null);
    }, 850);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [images]);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (userId) {
        dispatch(getOneProduct({id: productId, userId}));
      }

    } else {
      dispatch(getOneProduct({id: productId,}));
    }

  }, [productId, userId]);


  useEffect(() => {
    dispatch(getOneProduct({id: productId}));
  }, [productId]);

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
    prevArrow: <SamplePrevArrow/>,
    nextArrow: <SampleNextArrow/>,
    useTransform: true,
  };


  console.log(oneProductInfo, "oneProductInfo");
  return (
    <div className="new-big-container">
      <div className="new-container">
        <div className="section">
          <div className="product" key={id}>

            <div className="product__header">
              {delayedImages?.length > 1 ? (
                <Slider {...settings}>
                  {delayedImages.map((item) => (
                    <div className="product__image__container" key={item.url}>
                      <img src={item.url} alt="item" className="product__image"/>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="product__image__container">
                  <img src={delayedImages?.[0]?.url || default_image} alt="product" className="product__image"/>
                </div>
              )}
            </div>
            <hr/>
            <div className="product__header__span">
              {delayedImages ? (
                <>

                  <div className="product_info-container"
                       style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "150px"}}>
                    <span className="product__name">{name}</span>
                    <div className="new_store">
                      <div className="new_store-img">
                        <img src={oneProductInfo?.result?.product?.store?.logo[0]?.logo} alt="img"/>
                      </div>
                    </div>
                  </div>


                  <div className="product_pers_store_container">
                    {oneProductInfo?.result?.product?.discount && (
                      <div style={{display: "flex", flexWrap: "wrap", gap: "15px"}}>
                        <span className="product__store_name"> Discount - </span>
                        <div className="persentage_info">
                          <span>- {oneProductInfo.result.product.discount.discountPercentage}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="product-price_info">
                    {oneProductInfo?.result?.product?.discount ? (
                      <>
                        <div style={{marginBottom: "40px"}}>
      <span>
        <span
          className="product__store_name">Price -</span>{quantity * oneProductInfo.result.product.discount.discountPrice}$
      </span>
                        </div>
                        <div style={{marginBottom: "40px"}}>
                        <span
                          style={{
                            color: "#a5a5a5",
                            fontSize: "25px",
                            fontWeight: "bold",
                            textDecorationLine: "line-through",
                          }}
                        >
        {quantity * oneProductInfo?.result?.product?.price}$
      </span>
                        </div>
                      </>
                    ) : (
                      <span className="product__store_name">
      <span className="product__store_name">Price -</span>{quantity * oneProductInfo?.result?.product?.price}$
    </span>
                    )}
                  </div>

                  <div className="product__quantity">
                    <button
                      onClick={() => addCard()}
                      className="product__button__cart">Add to cart
                    </button>
                    <button disabled={quantity <= 1} className="product__button" onClick={() => updateQuantity(-1)}>-
                    </button>
                    <input className="product__value" type="text" onBlur={quantityBlur} value={Number(quantity)}
                           onChange={onChange}/>
                    <button disabled={quantity >= quantityNumber} className="product__button"
                            onClick={() => updateQuantity(1)}>+
                    </button>

                  </div>
                  <div className="product_mini_desc">
                    <span className="product__store_name_desc">Delivery is carried out by the supplier's couriers or the  courier service. You can also pick up the goods yourself from the supplier</span>
                  </div>


                </>
              ) : (
                <Skeleton height={500}/>
              )}

            </div>

          </div>
          <div className="product__description">
            <div className="container">
              <h3 className="product__description__h">Description</h3>
              <p className="product__description__p">{description}</p>
              <p className="product__description__p">Store - {store}</p>
              <p className="product__description__p">Size - {size}</p>
            </div>
          </div>
          <div className="product__description">
            <h3 className="product__description__h">Similar products</h3>
          </div>
          <div className="reviews">
            <div className="container">

              {reviews.length ? reviews.slice(0, !more ? 3 : reviews.length).map((review, i) => {
                const date = new Date(review.createdAt);
                const hours = date.getHours()
                const minutes = date.getMinutes()
                const day = date.getDate();
                const month = date.toLocaleString('en-us', {month: 'long'});
                return (
                  <div className="review__item">

                    <div className="review__header">

                      <div className="review__user_block">
                        <div className="review__avatar">
                          {review.user.avatar[0] ?
                            <img src={review.user.avatar[0].path} alt="user"/>
                            :

                            <FontAwesomeIcon icon={faUser} className="review__icon"/>
                          }
                        </div>
                        <div className="review__user">
                          <strong>
                            {review.user.lastName.charAt(0).toUpperCase() +
                              review.user.lastName.slice(1)} {review.user.firstName.charAt(0).toUpperCase() + review.user.lastName.slice(1)}
                          </strong>
                          <span><FontAwesomeIcon icon={faCheck} style={{
                            color: "limegreen"
                          }}/> Bought out</span>
                        </div>
                      </div>

                      <div className="review__star-time">
                        <div className="review__star">
                          {Array.from({length: 5}).map((_, i) => (
                            <FontAwesomeIcon
                              style={{
                                fontSize: 20
                              }}
                              icon={faStar}
                              className={i + 1 <= review.rating ?
                                "star-active icon"
                                : "star-disable icon"}/>
                          ))}
                        </div>
                        <div className="review__time">
                          <span>{day} {month}, {hours} : {minutes < 10 ? `0${minutes}` : minutes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="review-info">
                                    <span>
                                        {review.review}
                                    </span>
                    </div>

                    <div className="message">

                      <div>
                        <strong>
                          Seller's response
                        </strong>
                      </div>

                      <div className="message__info">
                                        <span className={index.includes(i) ? "message__text-more" : "message__text"}>
                                            {review.review}
                                                         </span>
                        {!index.includes(i) && (
                          <span className="message__more"
                                onClick={() => setIndex(prevState => _.uniq([...prevState, i]))}>
                                                   more
                                          </span>
                        )}
                      </div>
                    </div>


                  </div>


                )
              }) : null}

              {!more ? <div className="more__reviews" onClick={() => setMore(true)}>
                <div className="line"></div>
                <span>More</span>
                <div className="line"></div>

              </div> : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
