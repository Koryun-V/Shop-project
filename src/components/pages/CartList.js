import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Error from "./Error";
import Button from "../mini/Button";
import {
  deleteAllCartRequest,
  fetchCards,
  loadTransformedArray,
  makePayment,
} from "../../store/actions/card";
import CartItem from "../common/CartItem";
import Loader from "../common/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faCube, faTruck} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import CartModal from "../common/CartModal";
import {ReactComponent as CheckIcon} from "../../assets/icon/check-solid.svg";
import {useNavigate} from "react-router-dom";

const CartList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cardsList = useSelector((state) => state.card.cardData);
  const message = useSelector((state) => state.card.message);
  const products = useSelector((state) => state.card.products);
  const confirmationUrl = useSelector((state) => state.card.confirmationUrl);
  const transformedArray = useSelector((state) => state.card.transformedArray);

  const firstLoading = useRef(true);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isClearModalOpen, setClearModalOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(JSON.parse(localStorage.getItem('selectedProducts')) || {});
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);

  const [checkedAll, setCheckedAll] = useState(_.every(selectedProducts, value => value === true) );

  const {cards, maxPageCount, currentPage} = cardsList;

  useEffect(() => {
    let isMounted = true;

    const fetchAllCards = async (page = 1) => {
      if (!isMounted) return;

      setLoading(true);

      const data = await dispatch(fetchCards({page}));

      if (!isMounted) return;

      const {currentPage, maxPageCount} = data?.payload || {};

      if (!isMounted) return;

      if (currentPage < maxPageCount) {
        await fetchAllCards(page + 1);
      } else {
        // Stop loading if all pages are fetched
        setLoading(false);
      }
    };

    if (firstLoading.current) {
      fetchAllCards();
      firstLoading.current = false;
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onClickClear = () => {
    setClearModalOpen(true);
  };
  const onClearConfirm = () => {
    dispatch(deleteAllCartRequest());
    !cards.length && setClearModalOpen(false);
  };

  const onClearCancel = () => {
    setClearModalOpen(false);
  };


  useEffect(() => {
    if (!!cards.length && totalCardPrice === totalProductPrice) {
      dispatch(loadTransformedArray());
    }
  }, [cardsList, checkedAll]);


  const calculateTotalQuantity = (cards) => {
    return cards.reduce((quantity, card) => quantity + card.quantity, 0);
  };

  useEffect(() => {
    const calculateTotalPrice = (items) => {
      return items.reduce((total, item) => {

        const price = _.isEmpty(item.product.discount)
          ? item.product.price
          : item.product.discount.discountPrice;

        return total + price * item.quantity;
      }, 0);
    };

    setTotalCardPrice(calculateTotalPrice(cards));
    setTotalProductPrice(calculateTotalPrice(products));
  }, [cards, products]);



  const handleSelectAll = () => {
    const newCheckedAll = !checkedAll;
    setCheckedAll(newCheckedAll);
    const updatedSelectedProducts = cards.reduce((acc, card) => {
      acc[card.id] = newCheckedAll;
      return acc;
    }, {});
    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
    dispatch(loadTransformedArray());
  };

  const onOrder = async () => {
    setOrderLoading(true);

    try {
      if (!!transformedArray.length) {
        await dispatch(makePayment(transformedArray));
      } else {
        setShow(true);
      }

    } catch (error) {
      console.error("Error making payment:", error);
    }
    setOrderLoading(false);
  };

  useEffect(() => {
    if (confirmationUrl) {
      window.location.href = confirmationUrl;
    }
  }, [confirmationUrl]);


  return (
      <div className="card-list">
        {loading ? (
          <Loader/>
        ) : _.isEmpty(cards) ? (
          <Error
            statusCode="There is nothing in the cart"
            message="Browse the catalog and choose from millions of products with free shipping.
            The best place to start choosing is the home page"
          />
        ) : (
          <>

            <div className="card-list__container">
              <div className="total">
                <div className="total__container">

                  <p className="total-price">
                    <span className="total-header">Total:</span>
                    <span className="total-price_desc">{calculateTotalQuantity(cards)} goods</span>
                  </p>

                  <p className="total-price">
                    Total Price:
                    <span className="total-price_desc">${totalCardPrice.toFixed(2)}</span>
                  </p>

                  <div className="total__container_desc">
                    <div onClick={handleSelectAll} className="total__container_desc">
                      <div
                        className={`custom__checkbox__checkmark ${totalCardPrice === totalProductPrice ? 'active' : ''}`}>
                        {(totalCardPrice === totalProductPrice)
                          && <CheckIcon className="custom__checkbox__icon"/>
                        }
                      </div>

                      <div className="total-price">
                        Select All
                        {totalCardPrice === totalProductPrice &&
                          <span className="total-price_desc all">Selected all</span>}
                      </div>

                    </div>

                  </div>


                </div>

                <div className="total__desc">
                  <p className="total-price">Total Price:
                    <span className="total-price_desc">{totalProductPrice.toFixed(2)}$</span>
                  </p>

                  <p className="total-price">Total Quantity:
                    <span className="total-price_desc">{calculateTotalQuantity(products)} pcs</span>
                  </p>

                   <p className="total-price">Discount:

                    <span className="total-price_desc discount">{products.reduce((total, card) => total + card.product.price * card.quantity, 0) - totalProductPrice.toFixed(2)}$</span>
                  </p>


                </div>

                <div className="total__group">
                  <Button
                    className="active-button total"
                    onClick={onOrder}
                    loading={orderLoading}
                  >
                    Place an order {totalProductPrice ? totalProductPrice.toFixed(2) : ""}
                  </Button>

                </div>

                <div className="info">
                  <FontAwesomeIcon icon={faCircleExclamation} className="info__icon"/>
                  <p className="info__desc">You can only order from one supplier</p>
                </div>

                <div className="info">
                  <FontAwesomeIcon icon={faTruck} className="info__icon"/>
                  <p className="info__desc">
                    Delivery is carried out by the supplier's couriers or the Do courier service. You can also
                    pick up the goods yourself from the supplier
                  </p>
                </div>

                <div className="info">
                  <FontAwesomeIcon icon={faCube} className="info__icon"/>
                  <p className="info__desc">The exact delivery amount will be determined after order confirmation</p>
                </div>

                <div className="total__group">
                  <Button
                    onClick={onClickClear}
                    className="clear-button total"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>

            <div className="card__wrapper">
              {cards.map((card) => (
                <CartItem
                  card={card}
                  key={card.id}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  setCheckedAll={setCheckedAll}
                  loading={loading}
                />
              ))}

              <CartModal
                isOpen={show}
                onClose={() => setShow(false)}
                desc={"To place an order, select a product"}
              />

              <CartModal
                isOpen={isClearModalOpen}
                onClose={onClearCancel}
                onConfirm={onClearConfirm}
                desc={"Are you sure you want to clear the cart?"}
                buttonChild={"Yes"}
              />
            </div>
          </>
        )}
      </div>

  );
};

export default CartList;
