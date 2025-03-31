import React, {useEffect} from 'react';
import Product from "../mini/Product";
import {useDispatch, useSelector} from "react-redux";
import {getSharesProducts} from "../../store/actions/home";

const Shares = () => {
    const dispatch = useDispatch();
    const productsShares = useSelector(state => state.home.productsShares);
    const id = useSelector(state => state.home.userId);
    const status = useSelector(state => state.products.statusCard);

    useEffect(() => {
        dispatch(getSharesProducts({id}))
    }, [id,status]);


    return (
        <div className="section">
            <div className="article-home">
                <div className="article-block">
                    <Product products={productsShares} classNameActive="product-active"  quantity={12} className="product-block" classNameImg="product-img"/>
                </div>

            </div>
        </div>
    );
};

export default Shares;
