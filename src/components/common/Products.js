import React, {useEffect, useState} from 'react';
import Product from "../mini/Product";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/actions/home";
import ReactPaginate from "react-paginate";
import {setSelectId} from "../../store/actions/home";
import Select from "react-select";
import {categoriesRequest, setMaxPrice, setMinPrice, setPage} from "../../store/actions/products";
import {useParams} from "react-router-dom";
import Slider from "react-slider";

const Products = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValue, setSelectValue] = useState({id: "", name: "All",});
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


  useEffect(() => {
    dispatch(categoriesRequest({limit}));
  }, [dispatch, limit]);


  const getAllProducts = () => {
    if (isSubmitted) {

      dispatch(getProducts({categoryId: selectId, page: 1, limit, minPrice, maxPrice, s: searchValue ? searchValue : " "}));
    } else {
      dispatch(getProducts({categoryId: selectId, page, limit, minPrice, maxPrice,s: searchValue ? searchValue : " "}));
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [page, limit, searchValue]);
  console.log(searchValue)

  const clearAllOptions = () => {
    dispatch(setMinPrice(0))
    dispatch(setMaxPrice(2000))
    setSelectValue("All")
    dispatch(setSelectId(""))
    dispatch(setPage(1))
  }


  const handleClick = (pageInfo) => {
    let currentPage = pageInfo.selected + 1;
    dispatch(setPage(currentPage));
  };

  const handleSliderChange = (value) => {

    dispatch(setMinPrice(value[0]));
    dispatch(setMaxPrice(value[1]));

  };


  const change = (id) => {
    dispatch(setSelectId(id.id));
    setSelectValue(name)
    setIsSubmitted(true)

  };

  return (
    <div className="wrapper">
      <div className="section">
        <div className="select_container">
          <form action="#" className="price-container">
            <span style={{marginTop: "10px", marginBottom: "15px"}}>Price</span>
            <div>
              <input
                type="text"
                className="price-input"
                value={minPrice}
                onChange={(e) => handleSliderChange([+e.target.value, maxPrice])}
              />
              <input
                type="text"
                className="price-input"
                value={maxPrice}
                onChange={(e) => handleSliderChange([minPrice, +e.target.value])}
              />
            </div>

            <Slider
              className="price-slider"
              onChange={handleSliderChange}
              value={[minPrice, maxPrice]}
              min={0}
              max={2000}
            />
          </form>

          <div className="buttons-container">
            <button onClick={() => getAllProducts()} className="agree-button">
              Apply
            </button>

            <button onClick={() => clearAllOptions()} className="agree-button">
              Clear All
            </button>
          </div>


          <div className="select_box">
            <Select
              onChange={change}
              placeholder={selectId ? name : "All"}
              options={categories}
              classNamePrefix="react-select"
              getOptionValue={(o) => o.id}
              getOptionLabel={(o) => o.name}
              isSearchable={false}
              value={selectValue}
              styles={{
                option: (base, { isFocused }) => ({
                  ...base,
                  cursor: "pointer",
                  backgroundColor: isFocused ? "limegreen" : "white",
                  color: isFocused ? "white" : "black",
                }),

                control: (base) => ({
                  ...base,
                  cursor: "pointer",
                }),
              }}
            />


          </div>
        </div>
        <div className="products_container">
          <Product products={products} className="product-block" classNameImg="product-img"/>
          <div className="react_pagination_div">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
