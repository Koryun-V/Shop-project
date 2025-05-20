import React, {useEffect, useRef, useState} from "react";
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import ModalLogin from "./Modal/ModalLogin";

import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faAngleDown,
    faCartShopping,
    faCube, faEnvelope, faLocationDot, faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenLogin} from "../../store/actions/login";
import visa from "../../assets/icon/Visa.svg"
import group5 from "../../assets/icon/Group_5.svg"
import group6 from "../../assets/icon/Group_6.svg"
import sim from "../../assets/icon/sim.svg"
import logo from "../../assets/icon/logo.png"

import {
    getAllProducts,
    setSearchValue,
    getAllNames,
    setNameData,
    setUserId,
    getStores,
    clearProductNames
} from "../../store/actions/home";

import Notifications from "./Notifications";
import Profile from "./Profile";
import {fetchCards} from "../../store/actions/card";
import {getOrder} from "../../store/actions/order";
import {clearRedirectPath} from "../../store/slices/authRedirect";

const token = localStorage.getItem("token");

function Layout() {
    const [limit, setLimit] = useState(12);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [haveNames, setHaveNames] = useState(false)
    const searchRef = useRef(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const user = useSelector(state => state.login.user)
    const isOpenLogin = useSelector(state => state.login.isOpenLogin)
    const searchValue = useSelector(state => state.home.searchValue);
    const page = useSelector(state => state.home.page);
    const minPrice = useSelector(state => state.home.minPrice);
    const maxPrice = useSelector(state => state.home.maxPrice);
    const storeId = useSelector(state => state.home.storeId);
    const productsNames = useSelector(state => state.home.productsNames);
    const userId = useSelector(state => state.login.user?.id);
    const stores = useSelector(state => state.home.storesList)
    const totalCard = useSelector(state => state.card.totalCards);
    const statusCard = useSelector(state => state.card.statusGet);
    const statusOrder = useSelector(state => state.order.status);
    const totalOrder = useSelector(state => state.order.totalOrder);
    const orderConfirmStatus = useSelector(state => state.order.orderConfirmStatus)
    const {pathname} = useLocation()
    const statusDelete = useSelector(state => state.card.status);
    const redirectPath = useSelector(state => state.authRedirect.path);
    const [moreAnim, setMoreAnim] = useState("nav-more")
    const {id} = useParams()
    useEffect(() => {
        if (statusDelete !== "pending") dispatch(fetchCards({page: 1}))
    }, [statusDelete]);

    useEffect(() => {
        if (token) dispatch(getOrder({limit: 100}))
    }, [orderConfirmStatus]);


    useEffect(() => {
        dispatch(getStores())
    }, []);

    useEffect(() => {
        if (token && redirectPath) {
            navigate(redirectPath);
            dispatch(clearRedirectPath());
        }
    }, [token, redirectPath]);

    useEffect(() => {
        if (redirectPath && !token) {
            dispatch(setIsOpenLogin(true))
        }
    }, [redirectPath, token]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])


    useEffect(() => {
        if (user) {
            dispatch(setUserId(user.id))
        }
    }, [user]);

    useEffect(() => {
        dispatch(clearProductNames());
        dispatch(getAllNames({page, limit, s: searchValue || ""}));
    }, [searchValue]);

    useEffect(() => {
        setHaveNames(Array.isArray(productsNames) && productsNames.length > 0);
    }, [productsNames]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();

        const trimmedSearch = searchValue.trim();

        if (!trimmedSearch) {
            // Don't do anything if search is empty
            return;
        }

        setIsSearchOpen(false);
        navigate("/products");

        const searchParams = {
            page,
            limit,
            minPrice,
            maxPrice,
            s: trimmedSearch,
        };

        if (userId) {
            searchParams.userId = userId;
        }
        if (storeId){
            searchParams.storeId = storeId;
        }
        dispatch(getAllProducts(searchParams));
    };


    const chooseName = (item) => {
        dispatch(setNameData(item))
        navigate(`one-product/${item.id}`)
        dispatch(setSearchValue(""))
    }
    const storeGet = async (id) => {
        navigate(`/store/${id}`);
        setMoreAnim("nav-more disabled");
        setTimeout(() => {
            setMoreAnim("nav-more");
        }, 300); // 300 мс, например, для завершения CSS-анимации
    }



    return (
        <>
            <div className="wrapper">
                <header className="header">
                    <div className="nav-header">
                        <div className="container-header">
                            <div className="header-block">
                                <Link to="/" className="logo-block">
                                    <div className="logo">
                                        <img src={logo}/>
                                    </div>
                                </Link>

                                <div className="store-add">
                                    {stores.map((item) => (
                                        Number(id) === item.id
                                            ?
                                            <div className="store-item">
                                                <FontAwesomeIcon icon={faArrowRight} className="icon"/>
                                                <div className="store-logo">
                                                    <img src={item.storeLogo[0].path} alt="logo"/>
                                                </div>
                                            </div>
                                            : null
                                    ))}
                                </div>

                                <nav className="nav">
                                    <ul className="nav-list">

                                        <li className="nav-item">Store
                                            <FontAwesomeIcon icon={faAngleDown} className="store-arrow"/>
                                            <ul className={moreAnim}>
                                                {stores.map((item) => (
                                                    Number(id) !== item.id && moreAnim === "nav-more" ?
                                                        <li className="store-list" key={item.id}
                                                            onClick={() => storeGet(item.id)}>
                                                            <div className="store-logo">
                                                                <img src={item.storeLogo[0].path} alt="logo"/>
                                                            </div>
                                                            {/*<div className="store-name">*/}
                                                            {/*    <span>{item.name}</span>*/}
                                                            {/*</div>*/}
                                                        </li>
                                                        : null
                                                ))}


                                            </ul>
                                        </li>

                                        <Link
                                            className={location.pathname === "/products" ? "nav-item-active" : "nav-item"}
                                            to="/products">
                                            <li>Products</li>
                                        </Link>
                                        <Link
                                            className={location.pathname === "/contacts" ? "nav-item-active" : "nav-item"}
                                            to="/contacts">
                                            <li>Contact</li>
                                        </Link>
                                    </ul>
                                </nav>


                                <div ref={searchRef} className="search-box">
                                    <div className="search-row">
                                        <form style={{
                                            height: 45,
                                        }}
                                              onSubmit={handleSearch}
                                        >
                                            <input
                                                onFocus={() => setIsSearchOpen(true)}
                                                className="new-search-input"
                                                type="text"
                                                placeholder="Search"
                                                autoComplete="off"
                                                value={searchValue}
                                                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                                            />
                                            <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass}
                                                             className="glass"/>
                                        </form>
                                    </div>

                                    {!!searchValue.length && haveNames && isSearchOpen && (
                                        <div className="result-box">
                                            <div className="search-ul">
                                                {productsNames.map((item) => (
                                                    <div className="search-li" key={item.id}
                                                         onClick={() => chooseName(item)}>
                                                        {item.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>


                                <div className="user-block">
                                    {!token ?
                                        <>
                                            <div className="sign-block">
                                                <Button text="LOGIN" className="active-button"
                                                        onClick={() => dispatch(setIsOpenLogin(true))}></Button>
                                            </div>
                                            <div className="sign-block"
                                            >
                                                <Button text="REGISTER" className="register-button"
                                                        onClick={() => navigate("/register")}></Button>
                                            </div>

                                        </>
                                        :
                                        <>
                                            <Notifications/>

                                            <Link to="/basket">
                                                <div className="cart">
                                                    {totalCard !== 0 && statusCard !== "error" ?
                                                        <div className="count">
                                                            <strong>{totalCard}</strong>
                                                        </div>
                                                        : null}
                                                    <FontAwesomeIcon icon={faCartShopping}
                                                                     className={window.location.pathname === "/basket" ? "cart-icon-active" : "cart-icon"}/>

                                                </div>
                                            </Link>
                                            <Link to="/orders">
                                                <div className="cart">
                                                    {totalOrder !== 0 && statusOrder !== "error" ?
                                                        <div className="count">
                                                            <strong>{totalOrder}</strong>
                                                        </div>
                                                        : null}
                                                    <FontAwesomeIcon icon={faCube}
                                                                     className={window.location.pathname === "/order" ? "cart-icon-active" : "cart-icon"}/>
                                                </div>
                                            </Link>
                                            <Profile/>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </header>

                <main className="main">
                    <Outlet/>
                </main>

                <footer className="footer">
                    <div className="footer-block-c">

                        <div className="footer-container">
                            <div className="footer-blocks">
                                <div className="footer-block">
                                    <div className="footer-shop-info">
                                        <h3>Multify Market</h3>
                                    </div>
                                    <div className="footer-shop-info">
                                        <Link target="_blank"
                                              to="https://mail.google.com/mail/u/0/#search/multifymarket%40gmail.com?compose=new">
                                            <FontAwesomeIcon icon={faEnvelope} className="footer-icon"/>Multifymarket@gmail.com</Link>
                                    </div>
                                    <div className="footer-shop-info">
                                        <Link target="_blank"
                                              to="https://www.google.am/maps/place/Techno-Educational+Academy/@40.7855952,43.843743,17z/data=!3m1!4b1!4m6!3m5!1s0x4041fbedb78169af:0x9688d481af79919a!8m2!3d40.7855952!4d43.843743!16s%2Fg%2F11df81lppw?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D">
                                            <FontAwesomeIcon icon={faLocationDot} className="footer-icon"/>
                                            4 Tsulukidze St, Gyumri</Link>
                                    </div>
                                </div>


                                {token ?
                                    <div className="footer-block">
                                        <div className="footer-link"><Link to="/user">Profile</Link></div>
                                        <div className="footer-link"><Link to="/orders">Order</Link></div>
                                        <div className="footer-link"><Link to="/basket">Basket</Link></div>
                                    </div>
                                    :
                                    <div className="footer-block">
                                        <div className="footer-link"><span className="login-f"
                                                                           onClick={() => dispatch(setIsOpenLogin(true))}>Login</span>
                                        </div>
                                        <div className="footer-link"><Link to="/register">Register</Link></div>
                                    </div>
                                }
                                <div className="footer-block">
                                    <div className="footer-link"><Link to="/shares">Share</Link></div>
                                    <div className="footer-link"><Link>Contact</Link></div>
                                </div>
                                <div className="footer-block">
                                    <div className="footer-link"><Link>Become a seller</Link></div>

                                </div>
                            </div>
                            <hr/>

                            <div className="footer-end">
                                <div className="footer-end-block">
                                    <span>&copy; STORY</span>
                                </div>
                                <div className="footer-end-block">
                                    <img src={visa} className="footer-cart"/>
                                    <img src={group5} className="footer-cart"/>
                                    <img src={group6} className="footer-cart"/>
                                    <img src={sim} className="footer-cart"/>
                                </div>
                                <div className="footer-end-block">
                                    <span>Made in Techno-Educational Academy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <ModalLogin
                open={isOpenLogin} onClose={() => {
                dispatch(setIsOpenLogin(false))
            }}/>
        </>

    );
}

export default Layout;
