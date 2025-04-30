// import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {getCategory} from "../../store/actions/category";
// import {setSelectId} from "../../store/actions/home";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {Carousel} from 'react-responsive-carousel';
// import _ from 'lodash';
// import default_image from "../../assets/icon/default_image.png"
// import {Link} from "react-router-dom";
//
// const Category = () => {
//   const dispatch = useDispatch();
//
//   const category = useSelector(state => state.category.data)
//
//   useEffect(() => {
//     dispatch(getCategory())
//   }, []);
//
//   return (
//     <div className="section">
//       <div className="category__wrapper">
//         <div className="category__container">
//           {category.map(({id, name, categoryImage}) => (
//             <Link className="every__category" key={id} to={`/products/${name}`}
//                   onClick={() => dispatch(setSelectId(id))
//                   }>
//               <Carousel showArrows={true} emulateTouch={true} showStatus={false} showIndicators={false}
//                         showThumbs={false} stopOnHover={true} transitionTime={6} infiniteLoop={true}
//                         autoPlay={true}
//                         interval={5000}>
//                 {_.isEmpty(categoryImage) ? <div style={{
//                     width: "100%",
//                     height: 150,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: 10
//                   }}>
//                     <img src={default_image} alt="default"
//                          style={{width: "90%", height: 150, objectFit: "contain"}}/>
//                   </div> :
//
//                   categoryImage.map(item => (
//                     <div className="category__image__container" key={item.id}>
//                       <img src={item.path} alt="item" className="category__image"/>
//                     </div>
//                   ))
//                 }
//               </Carousel>
//               <p className="category__desc">{name}</p>
//             </Link>
//
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Category;
