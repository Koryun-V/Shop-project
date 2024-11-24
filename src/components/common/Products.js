import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/actions/productsAction";
import {productReducer} from "../../store/reducers/productsReducer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import _ from 'lodash';
import default_image from "../../assets/icon/default_image.png"


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
                {products.map(({id, brandName, description, name, price, productImage, storeId, store}) => (
                    <div className="every_product" key={id}>
                        <Carousel showArrows={true} emulateTouch={true} showStatus={false} showIndicators={false}
                                  showThumbs={false} stopOnHover={true} transitionTime={1000} infiniteLoop={true}
                                  autoPlay={true} interval={10000}>
                            {_.isEmpty(productImage) ? <div style={{
                                    width: "100%",
                                    height: 150,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 10
                                }}>
                                    <img src={default_image} alt="default"
                                         style={{width: "90%", height: 150, objectFit: "contain"}}/>
                                </div> :

                                productImage.map(item => (
                                    <div className="product_image_container" key={item.id}>

                                        <img src={item.path} alt="item" className="product_image"/>
                                    </div>
                                ))
                            }
                        </Carousel>
                        <p className="product_desc">{brandName} of store {store.name}: {description}</p>
                        <p className="product_price">{price} Դ</p>

                        <button className="basket_button"><p className="basket_desc">basket</p></button>

                    </div>

                ))}
            </div>
        </div>
    );
};

export default Products;