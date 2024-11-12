import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/actions/productsAction";



const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())

    }, []);





    return (
        <div>
            Products

        </div>
    );
};

export default Products;