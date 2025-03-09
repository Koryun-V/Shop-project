import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOneProduct} from "../../store/actions/oneProduct";
import _ from "lodash";
import default_image from "../../assets/icon/default_image.png";
import {Carousel} from "react-responsive-carousel";
import {createCard, updateCard} from "../../store/actions/products";
import {Rating} from "react-simple-star-rating";


const OneProduct = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [submittedReview, setSubmittedReview] = useState("");
  const [submittedRating, setSubmittedRating] = useState(0);
  const dispatch = useDispatch();
  const productId = useSelector(state => state.home.productId);
  const oneProduct = useSelector(state => state.oneProduct.oneProduct);
  const name = oneProduct?.result?.product?.name;
  const id = oneProduct?.result?.product?.id;
  const price = oneProduct?.result?.product?.price
  const images = oneProduct?.result?.product?.images
  const description = oneProduct?.result?.product?.description;
  const size = oneProduct?.result?.product?.size
  const store = oneProduct?.result?.product?.store.name;
  const cardId = useSelector(state => state.products.cardId)
  const statusCard = useSelector(state => state.products.statusCard)

  const updateQuantity = (value) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  const onChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setQuantity(newValue === "" ? "" : Math.max(1, Number(newValue)));
    }
  };

  const addCard = () => {
    if (quantity === 0) return;

    if (statusCard === "ok" && cardId) {
      dispatch(updateCard({cardId, quantity}));
    } else {
      dispatch(createCard({productId, quantity}));
    }
  };


  const handleRating = (rate) => {
    setRating(rate);
  };

  const onChangeReview = (e) => {
    setReviewText(e.target.value);
  };

  const applyReview = () => {
    setSubmittedReview(reviewText);
    setSubmittedRating(rating);
    console.log("Submitted Review:", reviewText);
    console.log("Submitted Rating:", rating);
    console.log(productId)
  };



  useEffect(() => {
    dispatch(getOneProduct({id: productId}));
  }, [productId]);


  return (
    <div className="wrapper">
      <div className="product" key={id}>

        <div className="product__header">
          <Carousel showStatus={false} showThumbs={false}
                    transitionTime={2} infiniteLoop={true}
                    autoPlay={true}
                    interval={5000}
                    showArrows={false}
                    emulateTouch={true}

          >

            {_.isEmpty(images) ? <div style={{
                width: "100%",
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}>
                <img src={default_image} alt="default"
                     style={{width: "90%", height: 150, objectFit: "contain"}}/>
              </div> :
              images.map(item => (
                <div className="product__image__container" key={item.id}>
                  <img src={item.url} alt="item" className="product__image"/>
                </div>
              ))
            }
          </Carousel>
        </div>
        <hr/>
        <div className="product__header__span">
          <div className="product_info">
            <span className="product__name">{name}</span>
            <span className="product___price">{price}$</span>
          </div>
          <div className="product__quantity">
            <button onClick={addCard} className="product__button__cart">Add to cart</button>
            <button className="product__button" onClick={() => updateQuantity(1)}>+</button>
            <input className="product__value" type="text" value={quantity} onChange={onChange}/>
            <button className="product__button" onClick={() => updateQuantity(-1)}>-</button>
          </div>

          <div className="product_mini_desc">
            <span className="product__store_name">store:{store}</span>
            <span className="product__store_name">Delivery is carried out by the supplier's couriers or the  courier service. You can also pick up the goods yourself from the supplier</span>
          </div>


        </div>
      </div>


      <div className="product_reviews_container">
        <div className="rating_container">
          <Rating onClick={handleRating} />
          <input type="text" value={reviewText} onChange={onChangeReview} />
          <button onClick={applyReview} className="apply-button">Apply</button>

        </div>

      </div>
      {/*<div className="product__description">*/}
      {/*  <h3 className="product__description__h">Description</h3>*/}
      {/*  <p className="product__description__p">{description}</p>*/}
      {/*  <p className="product__description__p">Store - {store}</p>*/}
      {/*  <p className="product__description__p">Size - {size}</p>*/}

      {/*</div>*/}
      {/*<div className="product__description">*/}
      {/*  <h3 className="product__description__h">Similar products</h3>*/}
      {/*</div>*/}


    </div>
  );
};

export default OneProduct;
