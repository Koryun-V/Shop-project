import React, {useEffect, useRef, useState} from 'react';
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
  const dispatch = useDispatch();
  const products = useSelector(state => state.home.products);
  const categories = useSelector(state => state.products.categories);
  const selectId = useSelector(state => state.home.selectId);
  const {name} = useParams();
  const total = useSelector(state => state.home.total);
  const [limit, setLimit] = useState(12);
  const pageCount = Math.ceil(total / limit);
  const page = useSelector(state => state.products.page);
  const minPrice = useSelector(state => state.products.minPrice);
  const maxPrice = useSelector(state => state.products.maxPrice);

  const [selectValue, setSelectValue] = useState({id: "", name: "All", });

  useEffect(() => {
    dispatch(categoriesRequest({limit}));
  }, [dispatch, limit]);


  const getAllProducts = () => {
    dispatch(getProducts({categoryId: selectId, page, limit, minPrice, maxPrice}));
  }


  useEffect(() => {
    getAllProducts()
  }, [page, limit]);


  const clearAllOptions = () => {
    dispatch(setMinPrice(0))
    dispatch(setMaxPrice(2000))
    setSelectValue("All")
    dispatch(setSelectId(""))
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
              // defaultValue={categories[0]}
              value={selectValue}

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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
