import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOneProduct, getPopularProduct} from "../../store/actions/oneProduct";
import _ from "lodash";
import default_image from "../../assets/icon/default_image.png";
import {Carousel} from "react-responsive-carousel";
import {createCard, updateCard} from "../../store/actions/products";
import Product from "../mini/Product";


const OneProduct = () => {
  const dispatch = useDispatch();
  const productId = useSelector(state => state.home.productId);
  const oneProduct = useSelector(state => state.oneProduct.oneProduct);
  const [quantity, setQuantity] = useState(1);
  const name = oneProduct?.result?.product?.name;
  const id = oneProduct?.result?.product?.id;
  const price = oneProduct?.result?.product?.price
  const images = oneProduct?.result?.product?.images
  const description = oneProduct?.result?.product?.description;
  const size = oneProduct?.result?.product?.size
  const store = oneProduct?.result?.product?.store.name;

  const cardId = useSelector(state => state.products.cardId)
  const statusCard = useSelector(state => state.products.statusCard)
  const popularProducts = useSelector(state => state.oneProduct.popularProducts)

  const updateQuantity = (value) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  const onChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setQuantity(newValue === "" ? "" : Math.max(1, Number(newValue)));
    }
  };


  useEffect(() => {
    dispatch(getOneProduct({id: productId}));
  }, [productId]);


  const addCard = () => {
    if (quantity === 0) return;

    if (statusCard === "ok" && cardId) {
      dispatch(updateCard({ cardId, quantity }));
    } else {
      dispatch(createCard({productId, quantity}));
    }
  };


useEffect(() => {
  dispatch(getPopularProduct())
}, [productId]);

  console.log(popularProducts)


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

        <div className="product__header__span">
          <div className="product_info">
            <span className="product__name">{name}</span>
            <span className="product___price">{price}$</span>
          </div>
          <div className="product__quantity">
            <button onClick={addCard} className="product__button__cart">Add to cart</button>
            <button className="product__button" onClick={() => updateQuantity(1)}>+</button>
            <input className="product__price" type= "text" value={quantity} onChange={onChange}/>
            <button className="product__button" onClick={() => updateQuantity(-1)}>-</button>
          </div>

        </div>
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


      {/*<div className="pop_product_container">*/}
      {/*  <Product products={popularProducts} className="product-block" classNameImg="product-img"/>*/}
      {/*</div>*/}


    </div>
  );
};

export default OneProduct;
