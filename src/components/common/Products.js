import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/actions/productsAction";
import {productReducer} from "../../store/reducers/productsReducer";


const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.productReducer.products)

    useEffect(() => {
        dispatch(getProducts())

    }, []);

    console.log(products)

    return (
        <div className="products_wrapper">
            <div className="products_container">
                {products.map(({id, brandName, description, name, price, productImage, storeId}) => (
                    <div className="every_product" key={id}>
                        <p>{brandName}</p>
                        <p>{description}</p>
                        <p>{price} Դ</p>

                    </div>

                    ))}
            </div>
            </div>
            );
            };

export default Products;