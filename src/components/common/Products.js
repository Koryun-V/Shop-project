import React, {useEffect, useState} from 'react';
import Product from "../mini/Product";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts, setSelectId, setSearchValue, getStores, setStoreId} from "../../store/actions/home";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {categoriesRequest, setMaxPrice, setMinPrice, setPage} from "../../store/actions/products";
import {useParams} from "react-router-dom";
import Slider from "react-slider";
import domus from "../../assets/image/domus.png"

const Products = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectValue, setSelectValue] = useState({id: "", name: "All"});
    const dispatch = useDispatch();
    const products = useSelector(state => state.home.productsList);
    const categories = useSelector(state => state.products.categories);
    const selectId = useSelector(state => state.home.selectId);
    const {name} = useParams();
    const total = useSelector(state => state.home.total);
    const [limit, setLimit] = useState(12);
    const pageCount = Math.ceil(total / limit);
    const page = useSelector(state => state.home.page);
    const minPrice = useSelector(state => state.home.minPrice);
    const maxPrice = useSelector(state => state.home.maxPrice);
    const searchValue = useSelector(state => state.home.searchValue);
    const storesList = useSelector(state => state.home.storesList);
    const storeId = useSelector(state => state.home.storeId);
    const clampMin = (value) => Math.min(Math.max(value, 0), 1700);
    const clampMax = (value) => Math.min(Math.max(value, 0), 2000);
    const id = useSelector(state => state.home.userId);
    const status = useSelector(state => state.products.statusCard);

    useEffect(() => {
        dispatch(categoriesRequest({limit}));
    }, [dispatch, limit]);


    useEffect(() => {
        dispatch(getStores({page: 1, limit: 10}))

    }, []);


    useEffect(() => {
        getProductsFunc()
    }, [page, limit, storeId, id, status]);

    const getProductsFunc = () => {
        dispatch(getAllProducts({categoryId: selectId, page, limit, minPrice, maxPrice, s: " ", storeId, id}));
    }

    const clearAllOptions = () => {
        dispatch(setMinPrice(0));
        dispatch(setMaxPrice(2000));
        setSelectValue("All");
        dispatch(setSelectId(""));
        dispatch(setPage(1));
        dispatch(setSearchValue(" "));
        dispatch(setStoreId(""))
    };


    const handleClick = (pageInfo) => {
        dispatch(setPage(pageInfo.selected + 1));
    };

    const handleSliderChange = (value) => {
        dispatch(setMinPrice(value[0]));
        dispatch(setMaxPrice(value[1]));
    };

    const handleCategoryChange = (id) => {
        dispatch(setSelectId(id.id));
        setSelectValue(name);
        setIsSubmitted(true);
    };


    const handleMinPriceChange = (e) => {
        let newMin = clampMin(+e.target.value);
        if (newMin > maxPrice - 300) {
            newMin = maxPrice - 300;  // Ensure min is not greater than max - 300
        }
        dispatch(setMinPrice(newMin));
        handleSliderChange([newMin, maxPrice]);
    };

    const handleMaxPriceChange = (e) => {
        let newMax = clampMax(+e.target.value);
        if (newMax > 2000) {
            newMax = 2000;
        }
        dispatch(setMaxPrice(newMax));
    };


    return (
        <div className="wrapper">
            <div className="section">
                <div className="select_container">
                    <div className="filter">

                        <div className="stores_container">
                            {storesList.map((item) => (

                                <div onClick={() => dispatch(setStoreId(item.id))} key={item.id}
                                     className="stores_item">
                                    <img className="stores_item_img"
                                         src={item.storeLogo.length > 0 ? item.storeLogo[0].path : domus}/>
                                </div>

                            ))}
                        </div>
                        <form action="#" className="price-container">
                            <span style={{marginTop: "10px", marginBottom: "15px"}}>Price</span>
                            <div>
                                <input
                                    type="text"
                                    className="price-input"
                                    value={Number(minPrice)}
                                    onChange={handleMinPriceChange}
                                    min={0}
                                    max={1700}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    className="price-input"
                                    value={Number(maxPrice)}
                                    onChange={handleMaxPriceChange}
                                    min={0}
                                    max={2000}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                            <Slider
                                className="slider-container"
                                onChange={handleSliderChange}
                                value={[minPrice, maxPrice]}
                                thumbClassName="slider-thumb"
                                trackClassName="slider-track"
                                min={0}
                                max={2000}
                                minDistance={300}

                            />
                        </form>

                        <div className="select_box">
                            <Select
                                onChange={handleCategoryChange}
                                placeholder={selectId ? name : "All"}
                                options={categories}
                                classNamePrefix="react-select"
                                getOptionValue={(o) => o.id}
                                getOptionLabel={(o) => o.name}
                                isSearchable={false}
                                value={selectValue}
                                styles={{
                                    option: (base, {isFocused}) => ({
                                        ...base,
                                        cursor: "pointer",
                                        backgroundColor: isFocused ? "limegreen" : "white",
                                        color: isFocused ? "white" : "black",
                                        "&:active": {background: "#84e984", color: "white"}
                                    }),
                                    control: (base, {isFocused}) => ({
                                        ...base,
                                        cursor: "pointer",
                                        border: isFocused ? "1px solid limegreen" : "1px solid #cccccc",
                                        boxShadow: isFocused ? "0px 0px 6px limegreen" : "none",
                                        '&:hover': {border: '1px solid limegreen', boxShadow: '0px 0px 6px limegreen'}
                                    })
                                }}
                            />
                        </div>
                        <div className="buttons-container">
                            <button onClick={() => dispatch(getAllProducts({
                                categoryId: selectId,
                                page: 1,
                                limit,
                                minPrice,
                                maxPrice,
                                s: searchValue
                            }))} className="agree-button">Apply
                            </button>
                            <button onClick={() => clearAllOptions()} className="clear-button">Clear All</button>
                        </div>
                    </div>

                </div>
                <div className="products_container">
                    <Product func={getProductsFunc} classNameActive="product-active" products={products} quantity={12}
                             className="product-block"
                             classNameImg="product-img"/>
                    <div className="react_pagination_div">
                        {pageCount > 1 && (
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={pageCount ? ">" : ""}
                                pageCount={pageCount}
                                pageRangeDisplayed={3}
                                onPageChange={handleClick}
                                pageLinkClassName={"page-link"}
                                containerClassName={"pagination"}
                                pageClassName={"page-item"}
                                activeClassName={"page-item--active"}
                                previousClassName={"page-item--previous"}
                                nextClassName={"page-item--next"}
                                forcePage={page - 1}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;



