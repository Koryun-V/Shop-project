import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOneProduct} from "../../store/actions/oneProduct";


const OneProduct = () => {
  const dispatch = useDispatch();
  const productId = useSelector(state => state.home.productId);
  const oneProduct = useSelector(state => state.oneProduct.oneProduct);
  const [quantity, setQuantity] = useState(0);
  const name = oneProduct?.result?.product?.name;
  const id = oneProduct?.result?.product?.id;
  const price = oneProduct?.result?.product?.price

  const updateQuantity = (value) => {
    setQuantity((prev) => (prev + value < 0 ? prev : prev + value));
  };

  useEffect(() => {
    dispatch(getOneProduct({id: productId}));
  }, [productId]);


  console.log(oneProduct)


  return (
    <div>
      <div className="product_info">
        <span>{id}</span>
        <span>{name}</span>
        <span>{price}$</span>
      </div>


      <div className="counter-block">
        <button onClick={() => updateQuantity(1)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => updateQuantity(-1)}>-</button>
      </div>
    </div>
  );
};

export default OneProduct;