import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOneProduct} from "../../store/actions/oneProduct";
import {createCard, updateCard} from "../../store/actions/products";


const OneProduct = () => {
  const dispatch = useDispatch();
  const productId = useSelector(state => state.home.productId);
  const oneProduct = useSelector(state => state.oneProduct.oneProduct);
  const [quantity, setQuantity] = useState(0);
  const name = oneProduct?.result?.product?.name;
  const id = oneProduct?.result?.product?.id;
  const price = oneProduct?.result?.product?.price
  const cardId = useSelector(state => state.products.cardId)
  const statusCard = useSelector(state => state.products.statusCard)
  const cardsList  = useSelector(state => state.products.cardsList)

  const updateQuantity = (value) => {
    setQuantity((prev) => (prev + value < 1 ? prev : prev + value));
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


  console.log(cardId)
  console.log(cardsList)


  return (
    <div>
      <div className="product_info">
        <span>{id}</span>
        <span>{name}</span>
        <span>{price}$</span>
      </div>


      <div className="counter-block">
        <button className= "incriment_button" onClick={() => updateQuantity(1)}>+</button>
        <span>{quantity}</span>
        <button className= "incriment_button" onClick={() => updateQuantity(-1)}>-</button>
      </div>
      <button className= "addToCard_button" onClick={addCard}>Add to cart</button>

    </div>
  );
};

export default OneProduct;