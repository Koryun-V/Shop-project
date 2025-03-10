import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCard,
  loadTransformedArray,
  updateCard
} from "../../store/actions/card";
import { ReactComponent as TrashIcon } from "../../assets/icon/trash-solid.svg";
import Button from "../mini/Button";
import CustomCheckbox from "./CostumCheckBox";


const CartItem = ({ card,selectedProducts, setSelectedProducts,setCheckedAll, loading}) => {

  const dispatch = useDispatch();
  const { deleting } = useSelector((state) => state.card);
  const [localQuantity, setLocalQuantity] = useState(card.quantity);


  const handleQuantityChange = async (cardId, quantity, type) => {
    const newQuantity = type === 'increment' ? quantity + 1 : quantity - 1;
    setLocalQuantity(newQuantity);

    await dispatch(updateCard({ cardId, quantity: newQuantity }));

    dispatch(loadTransformedArray());
  };

  const handleProductDelete = async (cardId) => {
    dispatch(deleteCard(cardId));

    const savedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};
    delete savedSelectedProducts[cardId];
    localStorage.setItem('selectedProducts', JSON.stringify(savedSelectedProducts));

    dispatch(loadTransformedArray());
  };

  const handleInputChange = ({ target: { value } }) => {

    if (/^\d*$/.test(value )) {
      setLocalQuantity(value  === "" ? "" : Math.max(1, Number(value) ));
      value  && dispatch(updateCard({ cardId: card.id, quantity:  Number(value) }));
    }
  };

  const updateSelectedProducts = (productId, isSelected) => {
    setCheckedAll(false)
    const updatedSelectedProducts = { ...selectedProducts, [productId]: isSelected };
    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
    dispatch(loadTransformedArray())
  };

  return (
    <div key={card.id} className="card">

      <CustomCheckbox
        key={card.id}
        value={card.id}
        checked={selectedProducts[card.id] || false}
        onChange={({target: {checked}}) => updateSelectedProducts(card.id, checked)}
      />

      <div className="card_image_block">
        <img key={card.id} src={card?.product?.productImage[0]?.path} alt="Product Image" className="card_image" />
      </div>

      <div className="p">
        <div className="card-prod">
          <p className="card-desc">Name: {card.product.name}</p>
          <p className="card-price">${card.product.price * localQuantity}</p>

          <div className="quantity">
            <Button
              className="decrement"
              onClick={() => handleQuantityChange(card.id, localQuantity, 'decrement')}
              disabled={localQuantity <= 1}
            >
              -
            </Button>

            <input
              type="text"
              value={Number(localQuantity)}
              onChange={handleInputChange}
              className="quantity-input"
            />

            <Button
              className="decrement"
              onClick={() => handleQuantityChange(card.id, localQuantity, 'increment')}
            >
              +
            </Button>
          </div>
        </div>

        <div className="card-prod">
          <p className="card-desc">Product code: {`${card.product.id}-0047`}</p>
          <div

          >
            <button
              className="delete"
              onClick={() => handleProductDelete(card.id)}
              loading={ (deleting.includes(card.id))}
            >
              <TrashIcon className="trash_con"/>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
