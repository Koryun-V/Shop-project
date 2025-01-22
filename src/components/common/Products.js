import React, {useEffect, useState,} from 'react';
import Product from "../mini/Product";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/actions/home";
import ReactPaginate from "react-paginate";
import {setSelectId} from "../../store/actions/home";
import Select from "react-select";
import {categoriesRequest} from "../../store/actions/products";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.home.products);
  const categories = useSelector(state => state.productsReducer.categories)
  const selectId = useSelector(state => state.home.selectId)

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);



  const handleClick = (pageInfo) => {
    let currentPage = pageInfo.selected + 1

    setPage(currentPage)

  }
  const change = (id) => {
    dispatch(setSelectId(id.id))

  }

  useEffect(() => {
    dispatch(categoriesRequest({limit}))
  }, []);

  useEffect(() => {
    dispatch(getProducts({categoryId: selectId}))
  }, [selectId]);


  console.log(products)



  return (<div className="wrapper">
      <div className="section">
        <div className="select_container">
          <div className="select_box">

            <Select
              onChange={change}
              placeholder="All"
              options={categories.categories}
              classNamePrefix="react-select"
              getOptionValue={(o) => o.id}
              getOptionLabel={(o) => o.name}
              isSearchable={false}
            />

          </div>
        </div>
        <div className="products_container">
          <Product products={products} className="product-block" classNameImg="shares-img"/>
          <div className="react_pagination_div">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={10}
              pageRangeDisplayed={3}
              onPageChange={handleClick}
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
