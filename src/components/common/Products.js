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
import Button from "../mini/Button";
import UseQuery from "../../utills/hooks/useQuery";
import useQuery from "../../utills/hooks/useQuery";


const Products = () => {
  const {query, setQuery} = useQuery();
  const [isPageSubm, setIsPageSubm] = useState(false);
  const [limit, setLimit] = useState(Number(query.limit) || 12);
  const clampMin = (value) => Math.min(Math.max(value, 0), 1700);
  const clampMax = (value) => Math.min(Math.max(value, 0), 2000);
  const [categoryIds, setCategoryIds] = useState(query.categoryIds || " ");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {name} = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.home.productsList);
  const categories = useSelector(state => state.products.categories);
  const total = useSelector(state => state.home.total);
  const page = useSelector(state => state.home.page) || Number(query.page) || 1;
  const pageCount = Math.ceil(total / limit);
  const minPrice = useSelector(state => state.home.minPrice) || Number(query.minPrice) || 0;
  const maxPrice = useSelector(state => state.home.maxPrice) || Number(query.maxPrice) || 2000;
  const searchValue = useSelector(state => state.home.searchValue) || query.s || "";
  const categoryId = useSelector(state => state.home.categoryId);
  const storeId = useSelector(state => state.home.storeId) || query.storeId || "";
  const storeList = useSelector(state => state.home.storesList)
  const userId = useSelector(state => state.home.userId) || query.userId || "";
  const status = useSelector(state => state.products.statusCard);
  const statusProducts = useSelector(state => state.home.status);


  useEffect(() => {

    if (query.page && !isPageSubm) {
      dispatch(setPage(Number(query.page)))
    }
    if (query.minPrice) {
      dispatch(setMinPrice(Number(query.minPrice)))

    }
    if (query.maxPrice) {
      dispatch(setMaxPrice(Number(query.maxPrice)))

    }
    if (query.s) {
      dispatch(setSearchValue(query.s))

    }

    if (query.storeId) {
      dispatch(setStoreId(query.storeId))

    }
    if (query.categoryIds) {
      setCategoryIds(query.categoryIds || " ")
    }
  }, []);


  console.log(query, "query")


  const getProductsFunc = () => {
    const searchParams = {
      page,
      limit,
      minPrice,
      maxPrice,
      s: searchValue.trim(),
      storeId,
      categoryIds,
    };

    if (userId) {
      searchParams.userId = userId;
    }

    // dispatch(setPage(1));

    setQuery(searchParams);


    dispatch(getAllProducts(searchParams));
  }

  useEffect(() => {
    getProductsFunc();
  }, [page]);


  useEffect(() => {
    dispatch(categoriesRequest({limit}));
  }, [dispatch, limit]);


  useEffect(() => {
    dispatch(getStores({page: 1, limit: 10}))
  }, []);


  const clearAllOptions = () => {
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(2000));
    dispatch(setPage(1));
    dispatch(setSearchValue(""));
    dispatch(setStoreId(""));
    setCategoryIds(" ");

    setQuery({});


    toast.info("All fields have been cleaned, if it didn't work please press APPLY");
  };


  // const getProductsFunc = () => {
  //   const searchParams = {
  //     page,
  //     limit,
  //     minPrice,
  //     maxPrice,
  //     s: searchValue.trim(),
  //     storeId,
  //   };
  //
  //   if (userId) {
  //     searchParams.userId = userId;
  //   }
  //   if (categoryIds) {
  //     searchParams.categoryIds = categoryIds;
  //   }
  //   dispatch(getAllProducts(searchParams));
  // }


  // const clearAllOptions = () => {
  //   dispatch(setMinPrice(0));
  //   dispatch(setMaxPrice(2000));
  //   dispatch(setPage(1));
  //   dispatch(setSearchValue(""));
  //   dispatch(setStoreId(""))
  //   setCategoryIds("")
  //   toast.info("all fields have been cleaned, if didn't work please press APPLY")
  // };


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

  const chooseStore = (id) => {
    if (storeId === id) {
      dispatch(setStoreId("")); // Unselect if already selected
    } else {
      dispatch(setStoreId(id)); // Select new store
    }
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

  const applyFunc = () => {
    setIsPageSubm(true);
    getProductsFunc();
  }




  return (
    <div className="new-big-container">
      <div className="new-container">
        <div className="filter-container">
          <div className="filter">
            <p className="info_span">Categories</p>
            <div className="stores_container">
              {categories
                .filter((category, index) => index !== 0)
                .map((category, index) => (
                  <div
                    key={category.id}
                    className={`category-item ${categoryIds.includes(category.id) ? "selected" : ""}`}
                    onClick={() => clickCategoryId(category.id)}
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

            <span className="info_span">Stores</span>
            <div className="stores_container">
              {storeList.map((store, index) => (
                <div className={`category-item ${storeId === store.id ? "selected" : ""}`}
                     key={store.id}
                     onClick={() => chooseStore(store.id)}>
                  <img
                    src={store?.storeLogo?.[0]?.path}
                    alt={store?.name}
                    className="category-image"
                  />
                </div>
              ))}
            </div>


            <form action="#" className="price-container">
              <span className="info_span">Price</span>
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
              <div className="agree-button">
                <Button
                  text="Apply"
                  type={"button"}
                  onClick={() => applyFunc()}
                  className={"active-button"}
                >
                  Apply
                </Button>
              </div>
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


