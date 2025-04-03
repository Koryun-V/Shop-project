import React, {useEffect, useState} from 'react';
import Product from "../mini/Product";
import {useDispatch, useSelector} from "react-redux";
import {
  getAllProducts,
  setSearchValue,
  getStores,
  setStoreId,
} from "../../store/actions/home";
import ReactPaginate from "react-paginate";
import {categoriesRequest, setMaxPrice, setMinPrice, setPage} from "../../store/actions/products";
import {useParams} from "react-router-dom";
import Slider from "react-slider";
import {toast} from "react-toastify";


const Products = () => {
  const [limit, setLimit] = useState(12);
  const clampMin = (value) => Math.min(Math.max(value, 0), 1700);
  const clampMax = (value) => Math.min(Math.max(value, 0), 2000);
  const [categoryIds, setCategoryIds] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {name} = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.home.productsList);
  const categories = useSelector(state => state.products.categories);
  const total = useSelector(state => state.home.total);
  const page = useSelector(state => state.home.page);
  const pageCount = Math.ceil(total / limit);
  const minPrice = useSelector(state => state.home.minPrice);
  const maxPrice = useSelector(state => state.home.maxPrice);
  const searchValue = useSelector(state => state.home.searchValue);
  const categoryId = useSelector(state => state.home.categoryId);
  const storeId = useSelector(state => state.home.storeId);
  const userId = useSelector(state => state.home.userId);
  const status = useSelector(state => state.products.statusCard);
  const statusProducts = useSelector(state => state.home.status);

  useEffect(() => {
    dispatch(categoriesRequest({limit}));
  }, [dispatch, limit]);


  useEffect(() => {
    dispatch(getStores({page: 1, limit: 10}))

  }, []);


  useEffect(() => {
    getProductsFunc()

  }, [page, userId]);

  const getProductsFunc = () => {
    const searchParams = {
      page,
      limit,
      minPrice,
      maxPrice,
      s: searchValue.trim(),
      storeId,

    };

    if (userId) {
      searchParams.userId = userId;
    }
    if (categoryIds) {
      searchParams.categoryIds = categoryIds;
    }
    dispatch(getAllProducts(searchParams));
  }


  const clearAllOptions = () => {
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(2000));
    dispatch(setPage(1));
    dispatch(setSearchValue(""));
    dispatch(setStoreId(""))
    setCategoryIds("")
    toast.info("all fields have been cleaned, please press APPLY!")
  };


  const handleClick = (pageInfo) => {
    dispatch(setPage(pageInfo.selected + 1));
  };

  const handleSliderChange = (value) => {
    dispatch(setMinPrice(value[0]));
    dispatch(setMaxPrice(value[1]));
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

  const clickCategoryId = (id) => {
    setCategoryIds((prev) => {
      let idsArray = prev ? prev.split(",").map(Number) : []; // Convert string to array

      if (idsArray.includes(id)) {
        idsArray = idsArray.filter((categoryId) => categoryId !== id); // Remove if already selected
      } else {
        idsArray.push(id); // Add if not selected
      }

      return idsArray.length > 0 ? idsArray.join(", ") : ""; // Convert array back to string
    });
  };


  console.log(categoryIds, "categoryIds")


  return (
    <div className="new-big-container">
      <div className="new-container">
        <div className="filter-container">
          <div className="filter">
            <div className="stores_container">
              {categories
                .filter((category, index) => index !== 0)
                .map((category, index) => (
                  <div key={category.id} className="category-item" onClick={() => clickCategoryId(category.id)}
                       style={{
                         border: categoryIds.includes(category.id) ? "2px solid limegreen" : "2px solid #ddd",
                         borderRadius: "5px"
                       }}

                  >
                    {category.categoryImage?.length > 0 && (
                      <img
                        src={category.categoryImage[0].path}
                        alt={category.name}
                        className="category-image"
                      />
                    )}
                  </div>
                ))}
            </div>
            <form action="#" className="price-container">
              <span style={{marginTop: "10px", marginBottom: "15px"}}>Price</span>
              <div>
                <input type="text" className="price-input" value={Number(minPrice)} onChange={handleMinPriceChange}/>
                <input type="text" className="price-input" value={Number(maxPrice)} onChange={handleMaxPriceChange}/>
              </div>
              <Slider
                className="slider-container"
                onChange={handleSliderChange}
                value={[minPrice, maxPrice]}
                min={0}
                max={2000}
                minDistance={300}
                thumbClassName="slider-thumb"

              />
            </form>

            <div className="buttons-container">
              <button onClick={() => getProductsFunc()} className="agree-button">Apply</button>
              <button onClick={clearAllOptions} className="clear-button">Clear All</button>
            </div>
          </div>
        </div>
        <div className="products_container">

            <Product
              statusProducts={statusProducts}
              classNameActive="product-active"
              products={products}
              quantity={12}
              className="product-block"
              classNameImg="product-img"
            />


          <div className="react_pagination_div">
            {total >= 12 && pageCount > 1 && (
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


