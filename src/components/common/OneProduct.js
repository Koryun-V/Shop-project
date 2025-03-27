import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOneProduct} from "../../store/actions/oneProduct";
import _ from "lodash";
import default_image from "../../assets/icon/default_image.png";
import {Carousel} from "react-responsive-carousel";
import {createCard, updateCard} from "../../store/actions/products";
import {useParams} from "react-router-dom";



const OneProduct = () => {
  const [quantity, setQuantity] = useState(1);
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
    if (quantity < 1){
      setQuantity(1);
    }
  }



  console.log(oneProductInfo, "oneProductInfo");

  // console.log(isInCart, "isInCart")
  // console.log(cardId, "cardId")

  const addCard = () => {
    dispatch()
    if (quantity === 0) return;
    if (cardId) {
      dispatch(updateCard({cardId, add: quantity}));
    } else  {
      dispatch(createCard({productId, quantity}));
    }
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (userId){
        dispatch(getOneProduct({id: productId, userId}));
      }

    }else {
      dispatch(getOneProduct({id: productId,}));
    }

  }, [productId, userId]);


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
                    className={"product__image"}
          >

            {_.isEmpty(images) ? <div style={{
                width: "100%",
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,

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
            <div className="persentage_info">
              <span>- {oneProductInfo?.result?.product?.discount?.discountPercentage} %</span>
            </div>
            <div className="product-price_info">
              {oneProductInfo?.result?.product?.discount ?
                <span>  {quantity *oneProductInfo?.result?.product?.discount.discountPrice}$</span> : null}
              <span style={{
                color: oneProductInfo?.result?.product?.discount ? "#a5a5a5" : "black",
                fontSize: oneProductInfo?.result?.product?.discount ? "20px" : "25px",
                textDecorationLine:oneProductInfo?.result?.product?.discount ? "line-through" : "none",
              }}>  {quantity * oneProductInfo?.result?.product?.price}$</span>
            </div>
          </div>
          <div className="product__quantity">
            <button
              onClick={() => addCard()}
              className="product__button__cart">Add to cart
            </button>
            <button disabled={quantity <= 1} className="product__button" onClick={() => updateQuantity(-1)}>-</button>
            <input className="product__value" type="text" onBlur={quantityBlur} value={Number(quantity)} onChange={onChange}/>
            <button disabled={quantity >= quantityNumber} className="product__button" onClick={() => updateQuantity(1)}>+</button>
          </div>

          <div className="product_mini_desc">
            <span className="product__store_name">store:{store}</span>
            <span className="product__store_name">Delivery is carried out by the supplier's couriers or the  courier service. You can also pick up the goods yourself from the supplier</span>
          </div>


        </div>
      </div>


      <div className="product_reviews_container">
      </div>
      <div className="product__description">
        <h3 className="product__description__h">Description</h3>
        <p className="product__description__p">{description}</p>
        <p className="product__description__p">Store - {store}</p>
        <p className="product__description__p">Size - {size}</p>

      </div>
      <div className="product__description">
        <h3 className="product__description__h">Similar products</h3>
      </div>


    </div>
  );
};

export default OneProduct;
